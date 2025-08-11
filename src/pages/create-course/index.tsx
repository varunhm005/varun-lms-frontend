import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { env } from '../../configs/env';
import { storage } from '../../configs/firebase';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  CourseCertificateType,
  CourseMedian,
  CourseStatus,
  CourseType,
  CreateCourseInput,
  ExamMedium,
  useCreateCourseMutation,
  useGetAssessmentSkillsQuery,
  useGetCourseCategoryQuery,
  useGetCourseDetailsLazyQuery,
  useUpdateCourseMutation,
} from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from '../../hooks/auth-hook';
import { useGetFaculties } from '../../hooks/useGetUsers';
import {
  getImageDetailsFromUrl,
  getOptionsFromEnum,
  normFile,
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/utils';

export default function CreateCourse() {
  const [form] = Form.useForm<CreateCourseInput>();
  const { id } = useParams<{
    id: string;
  }>();

  const isEditMode = !!id;

  const { data: users, loading: userLoading } = useGetFaculties();

  const [uploading, setUploading] = useState(false);

  const assessmentQuery = useGetAssessmentSkillsQuery({});

  const certificateType = Form.useWatch('certificateType', form);
  const examRequired = Form.useWatch('examRequired', form);

  const [getCourseDetails, { loading: courseLoading, data: course }] = useGetCourseDetailsLazyQuery(
    {
      variables: {
        courseId: +id!,
      },
      onCompleted(data) {
        const existing = data.course!;
        const imageDetails = getImageDetailsFromUrl(existing?.imageUrl! || '');

        form.setFieldsValue({
          name: existing.name,
          type: existing.type,
          median: existing.median,
          maxStudentsAllowed: existing.maxStudentsAllowed || null,
          // startDate: existing.startDate && (dayjs(existing.startDate) as unknown as string),
          // endDate: existing.endDate && (dayjs(existing.endDate) as unknown as string),
          price: existing.price,
          examRequired: existing.examRequired,
          mediumOfExam: existing.mediumOfExam,
          courseCategoryId: `${Number(existing.courseCategoryId)}` as any,
          courseStatus: CourseStatus.Completed,
          code: existing.code,
          Summary: existing.Summary,
          expireIn: existing.expireIn,
          instructorId: existing.instructorId ? existing.instructorId : undefined,
          imageUrl: existing?.imageUrl
            ? [
                {
                  uid: imageDetails.url,
                  name: imageDetails.fileName,
                  status: 'done',
                  url: imageDetails.url,
                },
              ]
            : (undefined as any),

          assessmentSkills:
            existing.courseAssessmentSkills?.map((skill) => skill!.assessmentSkillsId!) || [],
          certificateType: existing.certificateType,
          caaApprovalNo: existing.caaApprovalNo,
          functionName: existing.functionName,
        });
      },
    }
  );

  const role = useGetUserRoleName();

  const profile = useGetProfile();

  const isFaculty = role === 'Faculty';

  useEffect(() => {
    if (isEditMode) {
      getCourseDetails();
    } else if (role === 'Faculty') {
      form.setFieldsValue({
        instructorId: Number(profile?.id),
      });
    }

    if (!isEditMode) {
      form.setFieldsValue({
        certificateType: CourseCertificateType.Normal,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, role]);

  useEffect(() => {
    if (certificateType === CourseCertificateType.Normal) {
      form.setFieldsValue({
        caaApprovalNo: undefined,
        functionName: undefined,
      });
    }
  }, [certificateType, form]);
  useEffect(() => {
    if (!examRequired) {
      form.setFieldsValue({
        mediumOfExam: undefined,
      });
    }
  }, [examRequired, form]);

  const courseCatQuery = useGetCourseCategoryQuery({
    variables: {
      PagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  const navigate = useNavigate();

  const [createCourse, createCourserOptions] = useCreateCourseMutation({
    onError: showErrorMessage,
    onCompleted(data) {
      showSuccessMessage('Course created successfully');
      navigate(`/${route.courseLevels(data.createCourse!.id)}`, {
        replace: true,
      });
    },
    refetchQueries: [queryKeys.GetCoursesList, queryKeys.GetCourseLevels],
  });

  const [updateCourse, updateCourseDetails] = useUpdateCourseMutation({
    onError: showErrorMessage,
    onCompleted() {
      showSuccessMessage('Course updated successfully');
    },
    refetchQueries: [queryKeys.GetCoursesList, queryKeys.GetCourseLevels],
  });

  const onFinish = async (values: CreateCourseInput) => {
    setUploading(true);

    try {
      const input: any = values;
      const image = (values as any).imageUrl[0]?.originFileObj;

      if (image) {
        // Upload to Firestore
        const imagesRef = ref(storage, `user_images/${image.name}`);
        await uploadBytes(imagesRef, image);
        input.imageUrl = await getDownloadURL(imagesRef);
      } else {
        input.imageUrl = course?.course?.imageUrl as string;
      }

      input.companyId = env.companyId;
      input.courseCategoryId = Number(input.courseCategoryId);
      input.instructorId = Number(input.instructorId);
      input.courseStatus = CourseStatus.Completed;
      input.maxStudentsAllowed = values.maxStudentsAllowed || null;

      // if (input.startDate) {
      //   input.startDate = input.startDate.toISOString();
      // }

      // if (input.endDate) {
      //   input.endDate = input.endDate.toISOString();
      // }

      if (isEditMode) {
        delete input.examRequired;
        delete input.mediumOfExam;
        delete input.certificateType;
        updateCourse({
          variables: {
            updateCourseInput: {
              ...input,
              id: +id!,
            },
          },
        });
      } else {
        createCourse({
          variables: {
            createCourseInput: input,
          },
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setUploading(false);
    }
  };

  if (!courseCatQuery || courseLoading || userLoading || assessmentQuery.loading) {
    return <Loading />;
  }

  return (
    <div className="antd-image-200">
      <div className="p-6">
        <Form
          onFinish={onFinish}
          onReset={() => {
            navigate(`/${route.coursesDetails(id!)}`, {
              replace: true,
            });
          }}
          form={form}
          layout="vertical"
          className="form-design"
        >
          <div className="m-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 md:gap-x-10 ">
            <div className="col-span-1 text-left">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid name',
                  },
                ]}
                label="Course Name"
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please select a valid type',
                  },
                ]}
                label="Type"
                name="type"
              >
                <Select options={getOptionsFromEnum(CourseType)} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please select a valid mode',
                  },
                ]}
                label="Mode"
                name="median"
              >
                <Select
                  disabled={Boolean(course)}
                  options={[
                    { value: CourseMedian.Online, label: 'E Learning' },
                    { value: CourseMedian.Offline, label: 'Classroom' },
                    { value: CourseMedian.Recorded, label: CourseMedian.Recorded },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="courseCategoryId"
                rules={[
                  {
                    required: true,
                    message: 'Please select a valid category',
                  },
                ]}
                label="Course Category"
              >
                <Select
                  className="!rounded-full"
                  //   style={{ width: 120 }}
                  options={courseCatQuery.data?.courseCategories.data.map((cat) => ({
                    value: cat!.id,
                    label: cat!.name,
                  }))}
                />
              </Form.Item>

              {/* <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please select a valid status',
                  },
                ]}
                label="Status"
                name="courseStatus"
              >
                <Select
                  options={[
                    {
                      value: CourseStatus.Pending,
                      label: CourseStatus.Pending,
                    },
                    {
                      value: CourseStatus.Completed,
                      label: CourseStatus.Completed,
                    },
                  ]}
                />
              </Form.Item> */}

              <Form.Item
                name="examRequired"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid value',
                  },
                ]}
                label="Exam Required"
              >
                <Select
                  disabled={isEditMode}
                  options={[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ]}
                />
              </Form.Item>

              {examRequired && (
                <Form.Item
                  label="Medium Of Exam"
                  name="mediumOfExam"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a valid value',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: ExamMedium.Online,
                        label: 'E exam',
                      },
                      {
                        value: ExamMedium.Offline,
                        label: 'Classroom',
                      },
                    ]}
                    disabled={Boolean(course)}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="code"
                label="Course Code"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid value',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="Summary" label="Course Summery">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>

            <div className="col-span-1 text-left">
              <div className="mb-3 flex flex-row items-center">
                <div className="w-full pl-4 text-left">
                  <Form.Item name="assessmentSkills" label="Assessment Skills">
                    <Select mode="tags">
                      {assessmentQuery.data?.assessmentSkills.map((skill) => (
                        <Select.Option value={skill?.id!}>{skill?.name!}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Instructor is required',
                      },
                    ]}
                    name="instructorId"
                    label="Instructor"
                  >
                    <Select disabled={isFaculty} placeholder="Select Instructor">
                      {users?.users.data.map((user) => (
                        <Select.Option value={Number(user!.id)} key={user!.id}>
                          {user!.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Image"
                    name="imageUrl"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: 'Please select course image',
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
                      <Button shape="round" className="mt-2 !w-36" type="primary">
                        Choose Image
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>

              {/* <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid value',
                  },
                ]}
                name="startDate"
                label="Start Date"
              >
                <DatePicker className="!rounded-full" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid value',
                  },
                ]}
                label="End Date"
              >
                <DatePicker className="!rounded-full" style={{ width: '100%' }} />
              </Form.Item> */}
              <Form.Item name="expireIn" label="Expire in (Days)">
                <InputNumber className="!rounded-full" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid value',
                  },
                ]}
                name="price"
                label="Price"
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Certificate Type Required',
                  },
                ]}
                name="certificateType"
                label="Certificate Type"
              >
                <Select
                  disabled={Boolean(isEditMode)}
                  options={[
                    {
                      value: CourseCertificateType.Normal,
                      label: 'Non-DGR',
                    },
                    {
                      value: CourseCertificateType.Dgr,
                      label: 'DGR',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    type: 'number',
                    min: 1,
                    message: 'Value should be greater than 0',
                  },
                ]}
                name="maxStudentsAllowed"
                label="Maximum Students Per Schedule"
              >
                <InputNumber className="!w-full !rounded-full" />
              </Form.Item>

              <Form.Item
                hidden={certificateType === CourseCertificateType.Normal}
                name="caaApprovalNo"
                label="CAA Approval No"
              >
                <Input disabled={Boolean(isEditMode)} />
              </Form.Item>
              <Form.Item
                hidden={certificateType === CourseCertificateType.Normal}
                name="functionName"
                label="Function Name"
              >
                <Input disabled={Boolean(isEditMode)} />
              </Form.Item>
              <Button
                loading={createCourserOptions.loading || updateCourseDetails.loading || uploading}
                shape="round"
                htmlType="submit"
                className="mr-3 mt-2"
                type="primary"
              >
                Save
              </Button>

              <Button htmlType="reset" shape="round" className="mt-2" type="primary" ghost>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
