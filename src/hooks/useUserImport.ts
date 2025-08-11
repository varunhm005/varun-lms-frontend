import { message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { queryKeys } from '../constants/query-keys';
import {
  BulkUserInput,
  BulkUserStatus,
  useBulkInsertUserMutation,
} from '../graphql/@generated/graphql';

const userSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a text value',
    })
    .email('Invalid email format'),
  idNumber: z.string({
    required_error: 'ID Number is required',
    invalid_type_error: 'ID Number must be a text value',
  }),
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a text value',
  }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a text value',
    })
    .min(6, 'Password must be at least 6 characters long')
    .max(15, 'Password cannot exceed 15 characters'),
  role: z.enum(['Admin', 'Faculty', 'Students', 'LineManager'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid role. Must be one of: Admin, Faculty, Students, LineManager',
  }),
  lineManagerEmplyeeID: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  type: z
    .enum(['InHouse', 'OutSource'], {
      invalid_type_error: 'Invalid type. Must be either InHouse or OutSource',
    })
    .optional(),
  institution: z.string().optional(),
  phone: z.string().optional(),
});

export type UserImport = z.infer<typeof userSchema>;

const formatValidationError = (error: z.ZodError, rowNumber: number) => {
  const errorMessages = error.errors.map((err) => {
    const field = err.path[0];
    const fieldName = field
      .toString()
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

    // Special handling for specific error types
    if (err.message === 'Required') {
      return `${fieldName} is required`;
    }
    if (err.code === 'invalid_enum_value') {
      if (field === 'role') {
        return `Invalid role. Must be one of: Admin, Faculty, Students, LineManager`;
      }
      if (field === 'type') {
        return `Invalid type. Must be either InHouse or OutSource`;
      }
    }
    return `${fieldName}: ${err.message}`;
  });

  return `Row ${rowNumber}: ${errorMessages.join('; ')}`;
};

const SAMPLE_DATA = [
  {
    email: 'janedoe@example.com',
    idNumber: 'ID001',
    name: 'Jane Doe',
    password: 'password123',
    role: 'Faculty',
    lineManagerEmplyeeID: 'MGR001',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    type: 'InHouse',
    institution: 'Example University',
    phone: '+1234567890',
  },
];

export const useUserImport = () => {
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [previewData, setPreviewData] = useState<(UserImport & { rowNumber: number })[]>([]);
  const [isImported, setIsImported] = useState(false);

  const [bulkInsertUser] = useBulkInsertUserMutation({
    refetchQueries: [queryKeys.GetUsers],
  });

  const handleExcelUpload = async (file: RcFile) => {
    try {
      const fileData = await file.arrayBuffer();
      const workbook = XLSX.read(fileData);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        defval: '',
        header: [
          'email',
          'idNumber',
          'name',
          'password',
          'role',
          'lineManagerEmplyeeID',
          'department',
          'designation',
          'type',
          'institution',
          'phone',
        ],
      });

      const validatedUsers: (UserImport & { rowNumber: number })[] = [];
      const errors: string[] = [];

      jsonData.slice(1).forEach((row: any, index) => {
        try {
          const validatedUser = userSchema.parse(row);
          validatedUsers.push({ ...validatedUser, rowNumber: index + 2 }); // +2 because Excel rows start at 1 and we have header
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(formatValidationError(error, index + 2));
          }
        }
      });

      if (errors.length > 0) {
        return {
          errors,
          summary: `Found ${errors.length} error${
            errors.length > 1 ? 's' : ''
          } in the import file. Please fix these issues and try again.`,
        };
      }

      setPreviewData(validatedUsers);
      setImportModalVisible(true);
      return { success: true };
    } catch (error) {
      message.error('Error processing file');
      return { error: 'Error processing file' };
    }
  };

  const handleImport = async () => {
    try {
      setImportLoading(true);
      const response = await bulkInsertUser({
        variables: {
          bulkUserInput: previewData.map(
            (user) =>
              ({
                email: user.email,
                idNumber: user.idNumber,
                name: user.name,
                password: user.password,
                role: user.role as BulkUserInput['role'],
                lineManagerEmplyeeID: user.lineManagerEmplyeeID || null,
                department: user.department || null,
                designation: user.designation || null,
                type: user.type as BulkUserInput['type'],
                institution: user.institution || null,
                phone: user.phone || null,
              } satisfies BulkUserInput)
          ),
        },
      });

      if (response.data) {
        const updatedData = response.data.bulkInsertUser.map((result, index) => {
          const originalUser = previewData[index];
          return {
            ...originalUser,
            email: result.email || originalUser.email,
            idNumber: result.idNumber || originalUser.idNumber,
            name: result.name || originalUser.name,
            password: result.password || originalUser.password,
            role: result.role || originalUser.role,
            lineManagerEmplyeeID: result.lineManagerEmplyeeID || originalUser.lineManagerEmplyeeID,
            department: result.department || originalUser.department,
            designation: result.designation || originalUser.designation,
            type: result.type || originalUser.type,
            institution: result.institution || originalUser.institution,
            status: result.status || BulkUserStatus.Failed,
            errorMessage: result.errorMessage || null,
          };
        });

        setPreviewData(updatedData as (UserImport & { rowNumber: number })[]);
        setIsImported(true);

        const failedCount = updatedData.filter((u) => u.status === BulkUserStatus.Failed).length;
        const successCount = updatedData.length - failedCount;

        if (failedCount > 0) {
          message.warning(
            `Imported ${successCount} users successfully. ${failedCount} users failed. Check the table for details.`
          );
        } else {
          message.success(`Successfully imported ${successCount} users`);
        }
        return true;
      }
      return false;
    } catch (error) {
      message.error(`Error importing users: ${(error as Error).message}`);
      return false;
    } finally {
      setImportLoading(false);
    }
  };

  const handleDownloadSample = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(SAMPLE_DATA);

      // Rename headers
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            'EMAIL',
            'ID NUMBER',
            'NAME',
            'PASSWORD',
            'ROLE',
            'LINE MANAGER EMPLOYEE ID',
            'DEPARTMENT',
            'DESIGNATION',
            'TYPE',
            'INSTITUTION',
            'PHONE',
          ],
        ],
        { origin: 'A1' }
      );

      // Add header styling
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:K1');
      for (let col = range.s.c; col <= range.e.c; col += 1) {
        const address = XLSX.utils.encode_col(col).concat('1');
        if (ws[address]) {
          ws[address].s = { font: { bold: true } };
        }
      }

      // Set column widths
      ws['!cols'] = [
        { wch: 25 }, // EMAIL
        { wch: 15 }, // ID NUMBER
        { wch: 25 }, // NAME
        { wch: 15 }, // PASSWORD
        { wch: 15 }, // ROLE
        { wch: 20 }, // LINE MANAGER EMPLOYEE ID
        { wch: 20 }, // DEPARTMENT
        { wch: 20 }, // DESIGNATION
        { wch: 15 }, // TYPE
        { wch: 20 }, // INSTITUTION
        { wch: 15 }, // PHONE
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      XLSX.writeFile(wb, 'user-import-template.xlsx');
    } catch (error) {
      message.error('Error generating sample file');
    }
  };

  const handleExportData = () => {
    try {
      const exportData = previewData.map((user) => ({
        ...user,
        status: (user as any)?.status,
        errorMessage: (user as any)?.errorMessage,
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);

      // Rename headers
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            'EMAIL',
            'ID NUMBER',
            'NAME',
            'PASSWORD',
            'ROLE',
            'LINE MANAGER EMPLOYEE ID',
            'DEPARTMENT',
            'DESIGNATION',
            'TYPE',
            'INSTITUTION',
            'PHONE',
            'STATUS',
            'ERROR MESSAGE',
          ],
        ],
        {
          origin: 'A1',
        }
      );

      // Add header styling
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:M1');
      for (let col = range.s.c; col <= range.e.c; col += 1) {
        const address = XLSX.utils.encode_col(col).concat('1');
        if (ws[address]) {
          ws[address].s = { font: { bold: true } };
        }
      }

      // Set column widths
      ws['!cols'] = [
        { wch: 30 }, // EMAIL
        { wch: 15 }, // ID NUMBER
        { wch: 25 }, // NAME
        { wch: 15 }, // PASSWORD
        { wch: 15 }, // ROLE
        { wch: 20 }, // LINE MANAGER EMPLOYEE ID
        { wch: 20 }, // DEPARTMENT
        { wch: 20 }, // DESIGNATION
        { wch: 15 }, // TYPE
        { wch: 20 }, // INSTITUTION
        { wch: 15 }, // PHONE
        { wch: 15 }, // STATUS
        { wch: 30 }, // ERROR MESSAGE
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      XLSX.writeFile(wb, 'imported-users.xlsx');
      return true;
    } catch (error) {
      message.error('Error exporting data');
      return false;
    }
  };

  const resetImport = () => {
    setImportModalVisible(false);
    setPreviewData([]);
    setIsImported(false);
  };

  return {
    importModalVisible,
    setImportModalVisible,
    importLoading,
    previewData,
    isImported,
    handleExcelUpload,
    handleImport,
    handleDownloadSample,
    handleExportData,
    resetImport,
  };
};
