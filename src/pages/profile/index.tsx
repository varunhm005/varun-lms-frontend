import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, DatePicker, Form, Image, Input, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { env } from '../../configs/env';
import { storage } from '../../configs/firebase';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  UpdateUserInput,
  useCreateUserMutation,
  useGetDepartmentsQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUserRolesQuery,
} from '../../graphql/@generated/graphql';
import { useGetLineManagers } from '../../hooks/useGetUsers';
import { showErrorMessage, showSuccessMessage } from '../../utils/utils';

function Profile() {
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

  const { data: users } = useGetLineManagers();

  useCreateUserMutation({
    onCompleted(resp) {
      if (resp) {
        navigate(`/${route.users}`);
      }
    },
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetUsersOnly, queryKeys.GetUsers],
  });

  const [UpdateUserProfile] = useUpdateUserProfileMutation({
    onCompleted: () => {
      showSuccessMessage('Profile Updated successfully');
      // handleCancel();
    },
    onError: showErrorMessage,
  });

  const [image, setImage] = useState<File>();
  const [passportImage, setPassportImage] = useState<File>();
  const [idUrlImage, setIdUrlImage] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
    manager: string;
    company: string;
    imageUrl: string;
    department: string;
    qualification: string;
  };

  const beforeUpload = () => {
    return false;
  };

  const [form] = Form.useForm<FormInput>();

  const { data: profileData, loading: profileLoading } = useGetUserProfileQuery({
    onCompleted(response) {
      const pro = response.getUserProfile!;
      form.setFieldsValue({
        dateOfBirth: pro.dateOfBirth ? (dayjs(pro.dateOfBirth) as any) : null,
        email: pro.email,
        phone: pro.phone!,
        name: pro.name,
        qualification: pro.qualification!,
        roleId: pro.roleId ? `${pro.roleId}` : ('' as any),
        department: pro.departmentId ? `${pro.departmentId}` : '',
        manager: pro.managerId ? `${pro.managerId}` : ('' as any),
        idNumber: pro.idNumber!,
        image: pro.imageUrl!,
        imageUrl: pro.imageUrl!,
        passportUrl: pro.passportUrl!,
      });
    },
  });

  if (profileLoading) {
    return <Loading />;
  }
  const userId = profileData?.getUserProfile?.id;
  const onFinish = async (value: FormInput) => {
    const values = value;
    let imageUrl = profileData?.getUserProfile?.imageUrl;
    let idUrl = profileData?.getUserProfile?.idUrl;
    let passportUrl = profileData?.getUserProfile?.passportUrl;

    setUploading(true);

    try {
      if (image) {
        const imagesRef = ref(storage, `user_images/${image.name}`);
        await uploadBytes(imagesRef, image);
        imageUrl = await getDownloadURL(imagesRef);
      }

      if (passportImage) {
        const imagesRef = ref(storage, `user_images/${passportImage.name}`);
        await uploadBytes(imagesRef, passportImage);
        passportUrl = await getDownloadURL(imagesRef);
      }

      if (idUrlImage) {
        const imagesRef = ref(storage, `user_images/${idUrlImage.name}`);
        await uploadBytes(imagesRef, idUrlImage);
        idUrl = await getDownloadURL(imagesRef);
      }

      const input: UpdateUserInput = {
        id: String(userId),
        // email: values.email,
        // name: values.name,
        // idNumber: values.idNumber,
        // roleId: +values.roleId,
        phone: values.phone,
        passportUrl,
        idUrl,
        imageUrl,
        // passwordUrl: values.passwordUrl,
        // imageUrl: values.imageUrl,
        // lineManagerId: +values.manager,
        companyId: env.companyId,
        dateOfBirth: values.dateOfBirth,
        departmentId: +values.department,
        qualification: values.qualification,
        managerId: values.manager ? +values.manager : undefined,
      };

      UpdateUserProfile({
        variables: {
          updateUserInput: input,
        },
      });
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="m-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-2 mb-5">
            <div className="flex flex-row items-center">
              <Avatar
                size={{ xs: 100, sm: 100, md: 140, lg: 140, xl: 140, xxl: 140 }}
                icon={<UserOutlined />}
              />
              <div className="pl-4 text-left">
                <h5 className="ml-1">{profileData?.getUserProfile?.name}</h5>
                {!isEditMode ? (
                  <Button
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                    shape="round"
                    className="mt-2 text-lg"
                    type="primary"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                    shape="round"
                    className="mt-2 text-lg"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Form
          layout="vertical"
          className="form-design"
          initialValues={{ remember: true }}
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
                hidden={!isEditMode}
              >
                <Input disabled={!isEditMode || true} />
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
                <Input placeholder="Enter Email" disabled />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="Date Of Birth"
                name="dateOfBirth"
              >
                <DatePicker
                  disabled={!isEditMode || true}
                  style={{ width: '100%' }}
                  className="!rounded-full"
                />
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
                <Input disabled={!isEditMode} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
                label="Qualification"
                name="qualification"
              >
                <Select
                  disabled={!isEditMode}
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
                  disabled
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
                    required: false,
                  },
                ]}
                label="Department"
                name="department"
              >
                <Select
                  disabled
                  options={
                    departments?.departments.data.map((role) => ({
                      value: role!.id,
                      label: role!.name,
                    }))!
                  }
                />
              </Form.Item>
              <Form.Item rules={[]} label="Line Manager" name="manager">
                <Select
                  disabled
                  options={
                    users?.users.data.map((us) => ({
                      value: us!.id,
                      label: us!.name,
                    }))!
                  }
                />
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
                <Input disabled />
              </Form.Item>

              <Form.Item rules={[{}]} label="Attach ID" name="idUrl">
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
                  <Button disabled={!isEditMode || true} shape="round" icon={<UploadOutlined />}>
                    Choose File
                  </Button>
                </Upload>
                {!idUrlImage && isEditMode && (
                  <>
                    <Image
                      src={profileData?.getUserProfile?.idUrl!}
                      className="mt-2 flex !h-16 w-full border-2"
                    />
                    <br />
                  </>
                )}
              </Form.Item>

              <Form.Item rules={[{}]} label="Attach Image" name="image">
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
                  <Button disabled={!isEditMode} shape="round" icon={<UploadOutlined />}>
                    Choose File
                  </Button>
                </Upload>
                {!image && isEditMode && (
                  <>
                    <Image
                      src={profileData?.getUserProfile?.imageUrl!}
                      className="mt-2 flex !h-16 w-full border-2"
                    />
                    <br />
                  </>
                )}
              </Form.Item>

              <Form.Item rules={[{}]} label="Attach Passport" name="passportUrl">
                <Upload
                  name="passportUrl"
                  listType="picture"
                  beforeUpload={beforeUpload}
                  onChange={(info) => {
                    setPassportImage(info.file as any);
                  }}
                  accept="image/*"
                  maxCount={1}
                  multiple={false}
                  showUploadList={{
                    showRemoveIcon: false,
                  }}
                >
                  <Button disabled={!isEditMode || true} shape="round" icon={<UploadOutlined />}>
                    Choose File
                  </Button>
                </Upload>
                {!passportImage && isEditMode && (
                  <>
                    <Image
                      src={profileData?.getUserProfile?.passportUrl!}
                      className="mt-2 flex !h-16 w-full border-2"
                    />
                    <br />
                  </>
                )}
              </Form.Item>

              {isEditMode && (
                <>
                  <Button
                    loading={uploading}
                    shape="round"
                    className="mr-3 mt-2"
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                    shape="round"
                    className="mt-2"
                    type="primary"
                    ghost
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
