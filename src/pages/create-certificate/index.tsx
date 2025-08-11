/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import { CloseCircleOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Upload, UploadFile } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { storage } from '../../configs/firebase';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useMessage } from '../../context/context-hooks';
import {
  CertificateType,
  CreateCertificateInput,
  useCreateCertificateMutation,
  useGetCertificateDetailsLazyQuery,
  useUpdateCertificateMutation,
} from '../../graphql/@generated/graphql';
import useGetUserCourses from '../../hooks/useGetUserCources';
import { useStudents } from '../../hooks/useGetUsers';
import { getImageDetailsFromUrl, normFile, showErrorMessage } from '../../utils/utils';

function CreateCertificate() {
  const [form] = Form.useForm<CreateCertificateInput>();

  const { data: users, loading: userLoading } = useStudents();

  const { data: courses, loading: coursesLoading } = useGetUserCourses();

  const { id } = useParams<{
    id?: string;
  }>();

  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [createCertificate, { loading: createCertificateLoading }] = useCreateCertificateMutation({
    refetchQueries: [queryKeys.GetCertificates],
  });
  const [updateCertificate, { loading: upadatingCertificate }] = useUpdateCertificateMutation({
    refetchQueries: [queryKeys.GetCertificates, queryKeys.GetCertificateDetails],
  });

  const [getCertificateDetails, { data: certificate }] = useGetCertificateDetailsLazyQuery({
    variables: {
      certificateId: +id!,
    },
    onCompleted: (data) => {
      const { certificate: cert } = data!;

      const imageDetails = getImageDetailsFromUrl(cert?.imageUrl!);
      const sealDetails = getImageDetailsFromUrl(cert?.sealUrl!);

      form.setFieldsValue({
        userId: `${cert?.userId}` as any,
        coursesId: `${cert?.coursesId}` as any,
        name: cert?.name,
        batchNumber: cert?.batchNumber,
        sealTitle: cert?.sealTitle,
        imageUrl: [
          {
            uid: imageDetails.url,
            name: imageDetails.fileName,
            status: 'done',
            url: imageDetails.url,
          },
        ] as any,
        sealUrl: [
          {
            uid: sealDetails.url,
            name: sealDetails.fileName,
            status: 'done',
            url: sealDetails.url,
          },
        ] as any,
        CertificateSignatures: cert?.CertificateSignatures?.map((sig) => {
          const img = getImageDetailsFromUrl(sig?.signatureUrl!);
          return {
            ...sig,
            signatureUrl: [
              {
                uid: sig?.signatureUrl!,
                name: img.fileName,
                status: 'done',
                url: sig?.signatureUrl,
              },
            ] as any,
          };
        }),
      });
    },
  });

  const message = useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: CreateCertificateInput) => {
    try {
      setLoading(true);
      const image = (values as any).imageUrl[0]?.originFileObj;
      const seal = (values as any).sealUrl[0]?.originFileObj;
      const signatures = (values as any).CertificateSignatures?.map((signature: any) => {
        return {
          ...signature,
          signature: signature?.signatureUrl[0]?.originFileObj,
        };
      });

      if (image) {
        // Upload to Firestore
        const imagesRef = ref(storage, `user_images/${image.name}`);
        await uploadBytes(imagesRef, image);
        values.imageUrl = await getDownloadURL(imagesRef);
      } else {
        values.imageUrl = certificate?.certificate?.imageUrl as any;
      }

      if (seal) {
        // Upload to Firestore
        const sealRef = ref(storage, `user_images/${seal.name}`);
        await uploadBytes(sealRef, seal);
        values.sealUrl = await getDownloadURL(sealRef);
      } else {
        values.sealUrl = certificate?.certificate?.sealUrl as any;
      }

      if (signatures) {
        const signatureFiles = await Promise.all(
          signatures.map(async (signature: any) => {
            const siImage = signature.signatureUrl as UploadFile<any>[];
            const signatureImage = siImage[0]?.originFileObj;
            if (isEditMode) {
              if (!signatureImage) {
                return signature.signatureUrl[0].url;
              }
            }

            const signatureRef = ref(storage, `user_images/${signatureImage!.name}`);
            await uploadBytes(signatureRef, signatureImage!);
            return getDownloadURL(signatureRef);
          })
        );

        values.CertificateSignatures = signatureFiles.map((signatureUrl, index) => {
          const data = {
            ...signatures[index],
            signatureUrl,
          };

          delete data.signature;
          return data;
        });
      }

      setLoading(false);

      if (!id) {
        createCertificate({
          variables: {
            createCertificateInput: {
              ...values,
              userId: +values.userId!,
              coursesId: +values.coursesId!,
              certificateType: CertificateType.Pass,
            },
          },
          onCompleted: () => {
            form.resetFields();
            message.success('Certificate created successfully');
            navigate(`/${route.certificates}`);
          },
        });
      } else {
        updateCertificate({
          onCompleted: () => {
            form.resetFields();
            message.success('Certificate updated successfully');
            navigate(`/${route.certificates}`);
          },
          variables: {
            updateCertificateInput: {
              id: id!,
              userId: +values.userId!,
              batchNumber: values.batchNumber,
              certificateType: certificate?.certificate?.certificateType,
              imageUrl: values.imageUrl,
              sealTitle: values.sealTitle,
              name: values.name,
              sealUrl: values.sealUrl,
              CertificateSignatures: values.CertificateSignatures!.map((s) => {
                const sig = s!;
                return {
                  id: (sig as any).id,
                  name: sig.name,
                  designation: sig.designation,
                  signatureUrl: sig.signatureUrl,
                };
              }),
            },
          },
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCertificateDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (userLoading || coursesLoading) {
    return <Loading />;
  }

  return (
    <div className="certificate-create">
      <div className="p-6">
        <Form onFinish={onFinish} form={form} layout="vertical" className="form-design">
          <div className="mb-3 text-left text-lg font-semibold">
            {id ? 'Edit Certificate' : 'Create Certificate'}
          </div>
          <div className=" grid max-w-4xl grid-cols-1 md:grid-cols-2 md:gap-x-10">
            <div className="col-span-1 text-left">
              <Form.Item
                rules={[{ required: true, message: 'Please input your Employee!' }]}
                name="userId"
                label="Employee"
              >
                <Select placeholder="Employee">
                  {users?.users?.data?.map((user) => (
                    <Select.Option key={user?.id} value={user?.id}>
                      {user?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="coursesId"
                label="Course Name"
                rules={[{ required: true, message: 'Please input your Course Name!' }]}
              >
                <Select placeholder="Course Name">
                  {courses?.courses?.data?.map((course) => (
                    <Select.Option key={course?.id} value={course?.id}>
                      {course?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="mb-3 flex flex-row items-center">
                <Avatar
                  size={{ xs: 75, sm: 75, md: 75, lg: 75, xl: 75, xxl: 75 }}
                  icon={<UserOutlined />}
                />
                <div className="pl-4 text-left">
                  <Form.Item
                    rules={[{ required: !isEditMode, message: 'Please add your logo!' }]}
                    name="imageUrl"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      beforeUpload={() => false}
                      multiple={false}
                      maxCount={1}
                      listType="text"
                      className="upload-list-inline"
                    >
                      <Button
                        shape="round"
                        className="!w-36 !border !border-primary-500 !bg-transparent !text-primary-500"
                        icon={<UploadOutlined />}
                      >
                        Upload Logo
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your Title!' }]}
                label="Title"
              >
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item
                rules={[{ required: true, message: 'Please input your Certificate Batch No!' }]}
                name="batchNumber"
                label="Certificate Batch No:"
              >
                <Input placeholder="Certificate Batch No" />
              </Form.Item>

              <div className="mb-3 text-left text-lg font-semibold">Add Signature</div>

              <div className="mb-3 ">
                <Form.List name="CertificateSignatures">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div className="mb-3 flex flex-col" key={key}>
                          <div className="flex justify-end">
                            <CloseCircleOutlined
                              className="text-red-500"
                              onClick={() => {
                                remove(name);
                              }}
                            />
                          </div>
                          <Form.Item {...restField} hidden name={[name, 'id']}>
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label="Name"
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Missing name' }]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>

                          <Form.Item
                            label="Designation"
                            {...restField}
                            name={[name, 'designation']}
                            rules={[{ required: true, message: 'Missing Designation' }]}
                          >
                            <Input placeholder="Designation" />
                          </Form.Item>
                          <div className="flex flex-row items-center">
                            <Avatar
                              size={{ xs: 75, sm: 75, md: 75, lg: 75, xl: 75, xxl: 75 }}
                              icon={<UserOutlined />}
                            />
                            <div className="pl-4  text-left">
                              <Form.Item
                                name={[name, 'signatureUrl']}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                  { required: !isEditMode, message: 'Please add your signature!' },
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
                                  <Button
                                    shape="round"
                                    className="mt-2 !w-36 text-lg"
                                    type="primary"
                                    ghost
                                  >
                                    Choose Signature
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add Signature
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="mb-3 text-left text-lg font-semibold">Add Seal</div>

              <div className="mb-3 ">
                <Form.Item
                  name="sealTitle"
                  rules={[{ required: true, message: 'Please input your Seal Title!' }]}
                  label="Seal Title"
                >
                  <Input placeholder="Seal Title" />
                </Form.Item>

                <div className="flex flex-row items-center">
                  <Avatar
                    size={{ xs: 75, sm: 75, md: 75, lg: 75, xl: 75, xxl: 75 }}
                    icon={<UserOutlined />}
                  />
                  <div className="pl-4 text-left">
                    <Form.Item
                      rules={[{ required: !isEditMode, message: 'Please add your seal!' }]}
                      name="sealUrl"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        multiple={false}
                        maxCount={1}
                        showUploadList={{
                          removeIcon: false,
                        }}
                        beforeUpload={() => false}
                      >
                        <Button shape="round" className="mt-2 !w-32 text-lg" type="primary" ghost>
                          Choose Seal
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="my-10">
                <Button
                  loading={createCertificateLoading || loading || upadatingCertificate}
                  htmlType="submit"
                  shape="round"
                  className="mr-3  text-lg"
                  type="primary"
                >
                  Publish
                </Button>
                {/* <Button 
                shape="round" className=" text-lg" type="primary" ghost>
                  Cancel
                </Button> */}
              </div>
            </div>

            {/* <div className="col-span-1 text-left">
              <div className="certificate-card solid-emerald-100 card-pass relative p-5">
                <p className="text-lg font-bold text-black">Pass Certificate</p>
                <p className="mt-16 text-xs">Template 01</p>
                <CheckCircleOutlined className="check-outline" />
              </div>

              <div className="mt-5">
                <div className="text-lg font-semibold">Content preview</div>
                <p className="text-lg">
                  This is to certify that [Employee Name] has successfully completed the [Course
                  Name] course offered by [Institution/Organization Name]
                </p>
              </div>
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateCertificate;
