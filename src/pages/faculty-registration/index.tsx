import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Image, Input, Radio, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { env } from '../../configs/env';
import { storage } from '../../configs/firebase';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  CreateUserInput,
  EmployeeStatus,
  EmployeeType,
  useCreateUserMutation,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetUserDetailsLazyQuery,
  useUpdateUserProfileMutation,
  useUserRolesQuery,
} from '../../graphql/@generated/graphql';
import { useGetLineManagers } from '../../hooks/useGetUsers';
import {
  formatEnums,
  getImageDetailsFromUrl,
  normFile,
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/utils';

type FormInput = {
  email: string;
  password: string;
  name: string;
  idNumber: string;
  passportUrl: string;
  idUrl: string;
  passwordUrl: string;
  roleId: number;
  phone: string;
  image: string;
  dateOfBirth: string;
  manager: number;
  company: string;
  imageUrl: string;
  department: string;
  designationId: string;
  qualification: string;
  type: EmployeeType;
  institution: string;
  status: EmployeeStatus;
  signature: string;
};

function FacultyCreation() {
  const { userId } = useParams<{
    userId: string;
  }>();

  const isEditMode = !!userId;

  const [image, setImage] = useState<File>();
  const [idUrlImage, setIdUrlImage] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState(EmployeeType.InHouse);

  const [form] = Form.useForm<FormInput>();

  const navigate = useNavigate();

  const { data } = useUserRolesQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  const { data: departments } = useGetDepartmentsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });
  const { data: designation } = useGetDesignationsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  const { data: users } = useGetLineManagers();

  const [getUserDetails, { data: userDetails, loading: userLoading }] = useGetUserDetailsLazyQuery({
    onCompleted(response) {
      const formData = {
        name: response.user!.name,
        email: response.user!.email,
        idNumber: response.user!.idNumber,
        roleId: `${response.user!.roleId}` as any,
        dateOfBirth: response.user!.dateOfBirth && (dayjs(response.user!.dateOfBirth) as any),
        department: response.user!.departmentId ? `${response.user!.departmentId}` : null,
        designationId: response.user!.designationId ? `${response.user!.designationId}` : null,
        qualification: response.user!.qualification!,
        manager: response.user!.managerId,
        type: response.user!.type!,
        institution: response.user!.institution!,
        phone: response.user!.phone!,
        status: response.user!.status!,
        signature: response.user?.signature
          ? [
              {
                uid: response.user?.signature,
                name: getImageDetailsFromUrl(response.user?.signature).fileName,
                status: 'done',
                url: response.user?.signature,
              },
            ]
          : (undefined as any),
      };
      form.setFieldsValue(formData as any);
      setType(response.user!.type! as any);
    },
    variables: {
      userId: Number(userId),
    },
  });

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const [createUserMutation, { loading: creatingUser }] = useCreateUserMutation({
    onCompleted(resp) {
      if (resp) {
        navigate(`/${route.users}`);
      }
    },
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetUsersOnly, queryKeys.GetUsers, queryKeys.GetUserDetails],
  });

  const beforeUpload = () => {
    return false;
  };

  const [updateUser, { loading: updatingUser }] = useUpdateUserProfileMutation({
    onCompleted: () => {
      showSuccessMessage('User Updated successfully');
      navigate(`/${route.users}`);
    },
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetUsersOnly, queryKeys.GetUsers, queryKeys.GetUserDetails],
  });

  const onFinish = async (value: FormInput) => {
    const values = value;
    let imageUrl = userDetails ? userDetails!.user!.imageUrl! : '';
    let idUrl = userDetails ? userDetails!.user!.idUrl! : '';

    setUploading(true);

    try {
      if (image) {
        const imagesRef = ref(storage, `user_images/${image.name}`);
        await uploadBytes(imagesRef, image);
        imageUrl = await getDownloadURL(imagesRef);
      }

      if (idUrlImage) {
        const imagesRef = ref(storage, `user_images/${idUrlImage.name}`);
        await uploadBytes(imagesRef, idUrlImage);
        idUrl = await getDownloadURL(imagesRef);
      }

      let sign = userDetails ? userDetails!.user!.signature! : '';

      const signatureImage =
        (values as any)?.signature && (values as any).signature[0]?.originFileObj;

      if (signatureImage) {
        // Upload to Firestore
        const imagesRef = ref(storage, `user_images/${signatureImage.name}`);
        await uploadBytes(imagesRef, signatureImage);
        sign = await getDownloadURL(imagesRef);
      }

      const input: CreateUserInput = {
        email: values.email,
        name: values.name,
        password: values.password,
        idNumber: values.idNumber,
        roleId: +values.roleId,
        phone: values.phone,
        idUrl: idUrl ?? '',
        imageUrl: imageUrl ?? '',
        // passwordUrl: values.passwordUrl,
        // imageUrl: values.imageUrl,
        // lineManagerId: +values.manager,
        companyId: env.companyId,
        dateOfBirth: values.dateOfBirth,
        departmentId: +values.department,
        designationId: +values.designationId,
        qualification: values.qualification,
        managerId: values.manager && (+values.manager as any),
        institution: value.type === EmployeeType.OutSource ? values.institution : null,
        type: value.type,
        signature: sign,
      };

      if (!userId) {
        createUserMutation({
          variables: {
            createUserInput: input,
          },
        });
      } else {
        updateUser({
          variables: {
            updateUserInput: {
              id: userId!,
              name: values.name,
              roleId: +values.roleId,
              phone: values.phone,
              idUrl: idUrl ?? '',
              imageUrl: imageUrl ?? '',
              companyId: env.companyId,
              dateOfBirth: values.dateOfBirth,
              departmentId: +values.department,
              designationId: +values.designationId,
              qualification: values.qualification,
              managerId: values.manager && (+values.manager as any),
              idNumber: values.idNumber,
              status: values.status,
              signature: sign,
              email: value.email,
            },
          },
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setUploading(false);
    }
  };

  if (userLoading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <div className="p-6">
        <Form
          layout="vertical"
          className="form-design"
          initialValues={{ type: EmployeeType.InHouse }}
          form={form}
          onFinish={onFinish}
        >
          <div className="m-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 md:gap-x-10">
            <div className="col-span-1 text-left">
              <Form.Item
                label="Name"
                name="name"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter a valid Email',
                  },
                ]}
              >
                <Input disabled={isEditMode} placeholder="Enter Email" />
              </Form.Item>

              {!userId && (
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label="Password"
                  name="password"
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>
              )}

              <Form.Item rules={[]} label="Date Of Birth" name="dateOfBirth" hidden>
                <DatePicker style={{ width: '100%' }} className="!rounded-full" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="Phone"
                name="phone"
              >
                <Input />
              </Form.Item>

              <Form.Item hidden rules={[]} label="Qualification" name="qualification">
                <Select
                  options={[
                    { value: 'Bachelor Degree', label: 'Bachelor Degree' },
                    {
                      value: 'Master Degree',
                      label: 'Master Degree',
                    },
                    {
                      value: 'Engineering Degree',
                      label: 'Engineering Degree',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Roles"
                name="roleId"
              >
                <Select
                  options={
                    data?.userRoles.data.map((role) => ({
                      value: role!.id,
                      label: role!.name,
                    }))!
                  }
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Department"
                name="department"
              >
                <Select
                  options={
                    departments?.departments.data.map((role) => ({
                      value: role!.id,
                      label: role!.name,
                    }))!
                  }
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Designation"
                name="designationId"
              >
                <Select
                  options={
                    designation?.designations.data.map((role) => ({
                      value: role!.id,
                      label: role!.name,
                    }))!
                  }
                />
              </Form.Item>
              <Form.Item rules={[]} label="Line Manager" name="manager">
                <Select
                  options={
                    users?.users.data.map((us) => ({
                      value: us!.id,
                      label: us!.name,
                    }))!
                  }
                />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select>
                  {Object.values(EmployeeStatus).map((key) => (
                    <Select.Option value={key} key={key}>
                      {formatEnums(key)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-1 text-left">
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Staff Number"
                name="idNumber"
              >
                <Input disabled={isEditMode} />
              </Form.Item>

              <Form.Item rules={[]} label="Attach ID" name="idUrl">
                <Upload
                  name="idNumber"
                  listType="picture"
                  beforeUpload={beforeUpload}
                  onChange={(info) => {
                    setIdUrlImage(info.file as any);
                  }}
                  accept="idNumber/*"
                  maxCount={1}
                  multiple={false}
                  showUploadList={{
                    showRemoveIcon: false,
                  }}
                >
                  <Button shape="round" icon={<UploadOutlined />}>
                    Choose File
                  </Button>
                </Upload>
                {!idUrlImage && isEditMode && (
                  <>
                    <Image
                      src={userDetails?.user?.idUrl!}
                      className="mt-2 flex !h-16 w-full border-2"
                    />
                    <br />
                  </>
                )}
              </Form.Item>

              <Form.Item rules={[]} label="Attach Image" name="image">
                <Upload
                  name="image"
                  listType="picture"
                  beforeUpload={beforeUpload}
                  onChange={(info) => {
                    setImage(info.file as any);
                  }}
                  accept="image/*"
                  maxCount={1}
                  multiple={false}
                  showUploadList={{
                    showRemoveIcon: false,
                  }}
                >
                  <Button shape="round" icon={<UploadOutlined />}>
                    Choose File
                  </Button>
                </Upload>
                {!image && isEditMode && (
                  <>
                    <Image
                      src={userDetails?.user?.imageUrl!}
                      className="mt-2 flex !h-16 w-full border-2"
                    />
                    <br />
                  </>
                )}
              </Form.Item>
              <Form.Item
                label="Signature"
                name="signature"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: false,
                    message: 'Please select signature image',
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  maxCount={1}
                  showUploadList={{
                    removeIcon: false,
                  }}
                  beforeUpload={() => false}
                >
                  <Button shape="round" icon={<UploadOutlined />}>
                    Choose Image
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Type of Employee"
                name="type"
              >
                <Radio.Group
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <Radio value={EmployeeType.InHouse}>In house</Radio>
                  <Radio value={EmployeeType.OutSource}>Outsource</Radio>
                </Radio.Group>
              </Form.Item>

              {type === EmployeeType.OutSource && (
                <Form.Item name="institution" label="Institution">
                  <Input />
                </Form.Item>
              )}

              <Button
                loading={creatingUser || uploading || updatingUser}
                shape="round"
                className="mr-3 mt-2"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>

              <Button shape="round" className="mt-2" type="primary" ghost>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FacultyCreation;
