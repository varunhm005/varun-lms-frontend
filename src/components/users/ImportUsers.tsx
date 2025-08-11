import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Table, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { BulkUserStatus } from '../../graphql/@generated/graphql';
import { useUserImport } from '../../hooks/useUserImport';
import { formatEnums } from '../../utils/utils';

export function ImportUsers() {
  const [showInstructions, setShowInstructions] = useState(false);
  const {
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
  } = useUserImport();

  const handleFileUpload = async (file: RcFile) => {
    const result = await handleExcelUpload(file);
    if (result.errors) {
      Modal.error({
        title: 'Validation Errors',
        content: (
          <div>
            <p>The following errors were found:</p>
            <ul>
              {result.errors.map((errorMessage, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`error-${idx}-${errorMessage.slice(0, 10)}`}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        ),
      });
      return false;
    }
    setShowInstructions(false);
    return false; // Prevent default upload behavior
  };

  const closeImportModal = () => {
    resetImport();
    setImportModalVisible(false);
  };

  const closeInstructionsModal = () => {
    setShowInstructions(false);
  };

  return (
    <>
      <Button type="default" icon={<UploadOutlined />} onClick={() => setShowInstructions(true)}>
        Import Users
      </Button>

      <Modal
        title="Import Users Instructions"
        open={showInstructions}
        onCancel={closeInstructionsModal}
        maskClosable={false}
        footer={[
          <Button
            key="download"
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleDownloadSample}
            className="mr-4"
          >
            Download Template
          </Button>,
          <Upload
            key="upload"
            accept=".xlsx,.xls"
            showUploadList={false}
            beforeUpload={handleFileUpload}
          >
            <Button type="primary">Select File</Button>
          </Upload>,
        ]}
        width={600}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '16px' }}>Follow these steps to import users:</h4>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}>
              Download the Excel template using the button below
            </li>
            <li style={{ marginBottom: '12px' }}>
              Fill in the user details following these guidelines:
              <div
                style={{
                  background: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '4px',
                  marginTop: '8px',
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#ff4d4f' }}>Required Fields:</strong>
                  <ul style={{ marginTop: '8px', marginBottom: '0' }}>
                    <li>Email (must be valid format)</li>
                    <li>ID Number</li>
                    <li>Name</li>
                    <li>Password (6-15 characters)</li>
                    <li>Role (Admin/Faculty/Students/LineManager)</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#52c41a' }}>Optional Fields:</strong>
                  <ul style={{ marginTop: '8px', marginBottom: '0' }}>
                    <li>Line Manager Employee ID</li>
                    <li>Department</li>
                    <li>Designation</li>
                    <li>Type (InHouse/OutSource)</li>
                    <li>Institution</li>
                    <li>Phone (with country code)</li>
                  </ul>
                </div>
              </div>
            </li>
            <li style={{ marginBottom: '12px' }}>Save the Excel file after filling in the data</li>
            <li style={{ marginBottom: '12px' }}>
              Click &quot;Select File&quot; to upload your file
            </li>
            <li>Review the data in the preview table and click Import to complete the process</li>
          </ol>
        </div>
        <div
          style={{
            background: '#fffbe6',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ffe58f',
          }}
        >
          <strong>Note:</strong> Make sure all required fields are filled correctly to avoid import
          errors. The system will validate all entries and show error messages if any data is
          invalid.
        </div>
      </Modal>

      <Modal
        title={isImported ? 'Import Results' : 'Preview Import Data'}
        open={importModalVisible}
        onCancel={closeImportModal}
        maskClosable={false}
        footer={
          isImported
            ? [
                <Button
                  key="download"
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={handleExportData}
                >
                  Download Results
                </Button>,
                <Button key="close" onClick={closeImportModal}>
                  Close
                </Button>,
              ]
            : [
                <Button key="back" onClick={closeImportModal}>
                  Cancel
                </Button>,
                <Button key="import" type="primary" loading={importLoading} onClick={handleImport}>
                  Import
                </Button>,
              ]
        }
        width={1000}
      >
        <Table
          dataSource={previewData}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: 150,
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              width: 200,
            },
            {
              title: 'ID Number',
              dataIndex: 'idNumber',
              key: 'idNumber',
              width: 120,
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              width: 120,
              render: (value: string | null) => (value ? formatEnums(value) : '-'),
            },
            {
              title: 'Department',
              dataIndex: 'department',
              key: 'department',
              width: 150,
            },
            {
              title: 'Designation',
              dataIndex: 'designation',
              key: 'designation',
              width: 150,
            },
            {
              title: 'Line Manager',
              dataIndex: 'lineManagerEmplyeeID',
              key: 'lineManagerEmplyeeID',
              width: 150,
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
              width: 120,
              render: (value: string | null) => (value ? formatEnums(value) : '-'),
            },
            {
              title: 'Institution',
              dataIndex: 'institution',
              key: 'institution',
              width: 150,
            },
            ...(isImported
              ? [
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: 100,
                    render: (status: BulkUserStatus | null) => {
                      if (!status) return '-';
                      return (
                        <span
                          style={{
                            color: status === BulkUserStatus.Failed ? '#ff4d4f' : '#52c41a',
                          }}
                        >
                          {formatEnums(status)}
                        </span>
                      );
                    },
                  },
                  {
                    title: 'Error',
                    dataIndex: 'errorMessage',
                    key: 'errorMessage',
                    width: 250,
                    render: (text: string | null) => {
                      if (!text) return null;
                      return <div style={{ color: '#ff4d4f' }}>{text}</div>;
                    },
                  },
                ]
              : []),
          ]}
          size="small"
          pagination={false}
          scroll={{ y: 400, x: 'max-content' }}
          rowKey={(record) => `${record.email}-${record.idNumber}`}
          rowClassName={(record) =>
            'status' in record && record.status === BulkUserStatus.Failed ? 'table-row-error' : ''
          }
        />
      </Modal>
    </>
  );
}
