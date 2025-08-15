import { Button, Card, DatePicker, Form, Input, Modal, Select, Switch, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import ScheduleCalendar from '../../components/course-schedule/schedule-calendar';
import { GET_STUDENTS_BY_DESIGNATION } from '../../graphql/queries/designation-students';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  CourseMedian,
  CreateCourseScheduleInput,
  EmployeeStatus,
  UserBase,
  useCreateCourseScheduleMutation,
  useGetCourseDetailsWithLevelIdQuery,
  useGetCourseLevelExamsQuery,
  useGetCourseLevelNotAttendedUserLazyQuery,
  useGetCourseScheduleDetailsLazyQuery,
  useGetStudentsExpiredInCourseLazyQuery,
  useUpdateCourseScheduleMutation,
  useGetDesignationsQuery
} from '../../graphql/@generated/graphql';
import { useStudents } from '../../hooks/useGetUsers';
import { showErrorMessage } from '../../utils/utils';

function CreateSchedule() {
  const [form] = Form.useForm<CreateCourseScheduleInput>();
  const [selectedDesignationIds, setSelectedDesignationIds] = useState<number[]>([]);

  const { levelId, scheduleId } = useParams<{ levelId: string; scheduleId: string }>();
  const [level, setLevel] = useState<string | null>(levelId || null);

  const { data: courseLevel, loading: courseLevelLoading } = useGetCourseDetailsWithLevelIdQuery({
    variables: {
      courseLevelId: Number(level),
    },
    skip: !level,
    onError: () => {
      // TODO: handle error
    },
  });

  useEffect(() => {
    console.log('selectedDesignationIds', selectedDesignationIds, level);
  }, [selectedDesignationIds]);

  const maxStudents = courseLevel?.courseLevel?.course?.maxStudentsAllowed;

  const selectUsers = (users: UserBase[]) => {
    if (users.length === 0) {
      Modal.warn({
        title: 'No users found',
        content: 'No users found for the selected criteria',
        centered: true,
        okButtonProps: {
          danger: true,
        },
      });
      return;
    }

    const numberStudents = users.length;

    const students = users.map((user) => user!.id as any);

    if (!maxStudents || (maxStudents && numberStudents <= maxStudents)) {
      form.setFieldsValue({
        students,
      });
    }

    if (maxStudents && numberStudents > maxStudents!) {
      Modal.confirm({
        title: 'Confirm Selection',
        content: `There are ${numberStudents}  students who have not attended. The maximum students for this course is ${maxStudents} and hence only ${maxStudents} can be selected.`,

        onOk: () => {
          form.setFieldsValue({
            students: students.slice(0, maxStudents),
          });
        },
        centered: true,
        okButtonProps: {
          danger: true,
        },
      });
    }
  };

  const [getNotAttended, getNotAttendedOptions] = useGetCourseLevelNotAttendedUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      selectUsers(data.courseLevelNotAttendedUser! as UserBase[]);
    },
  });

  const [getExpiredUsers, getExpiredUsersOptions] = useGetStudentsExpiredInCourseLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      selectUsers(data.getStudentsExpiredInCourse! as UserBase[]);
    },
  });

  const idEdit = Boolean(scheduleId);

  const { data: examsResponse, loading: examLoading } = useGetCourseLevelExamsQuery({
    skip: !level,
    variables: {
      courseLevelId: Number(level),
    },
  });

  const showTimePicker = useMemo(() => {
    if (courseLevel?.courseLevel?.course?.median === CourseMedian.Online) {
      return false;
    }
    return true;
  }, [courseLevel]);

  const { data: users, loading: userLoading } = useStudents();

  const { data: designations, loading: designationLoading, refetch: refetchDesignations } = useGetDesignationsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  // Query to get students by designation
  const [getStudentsByDesignation] = useLazyQuery(
    GET_STUDENTS_BY_DESIGNATION,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        if (data?.getStudentsByDesignation) {
          const students = data.getStudentsByDesignation as UserBase[];

          console.log('students', students);
          selectUsers(students);
        }
      },
      onError: (error) => {
        console.error('Error fetching students by designation:', error);
        showErrorMessage(error);
      },
    }
  );

  const navigate = useNavigate();

  const handleCancel = (id: string) => {
    navigate(`/${route.coursesDetails(id!)}`, {
      replace: true,
    });
  };

  const [createCourseScheduleMutation, { loading: createCourseScheduleLoading }] =
    useCreateCourseScheduleMutation({
      onError: showErrorMessage,
      onCompleted: () => handleCancel(`${levelId}`),
      refetchQueries: [queryKeys.GetCourseLevelDetails],
    });

  const [updateCourseScheduleMutation, { loading: updateCourseScheduleLoading }] =
    useUpdateCourseScheduleMutation({
      onCompleted: (data) => handleCancel(`${data.updateCourseSchedule.courseLevelId}`),
      onError: showErrorMessage,
      refetchQueries: [queryKeys.GetCourseLevelDetails, queryKeys.GetCourseScheduleDetails],
    });

  const [
    getCourseScheduleDetails,
    { loading: courseScheduleDetailsLoading, data: scheduleDetails },
  ] = useGetCourseScheduleDetailsLazyQuery({
    variables: {
      courseScheduleId: Number(scheduleId),
    },
    onCompleted(data) {
      const schedule = data.courseSchedule!;
      setLevel(`${schedule.courseLevelId}`);
      const designationValues = (schedule as any).designationIds.map(String);
      form.setFieldsValue({
        name: schedule.name,
        days: [],
        endDate: dayjs(schedule.endDate),
        startDate: dayjs(schedule.startDate),
        endTime: showTimePicker ? dayjs(schedule.endTime) : null,
        startTime: showTimePicker ? dayjs(schedule.startTime) : null,
        students: schedule.students!.map((student) => student!.userId as any),
        examId: (schedule.examId ? `${schedule.examId}` : null) as any,
        isLocked: schedule.isLocked,
        designationIds: designationValues || [],
      });
    },
  });

  const onFinish = (values: CreateCourseScheduleInput) => {
    const designationIds = values.designationIds?.map(Number) || [];
    if (!idEdit) {
      createCourseScheduleMutation({
        variables: {
          createCourseScheduleInput: {
            name: values.name,
            levelId: `${levelId}`,
            days: [],
            endDate: values.endDate.toISOString(),
            startDate: values.startDate.toISOString(),
            endTime: showTimePicker ? values.endTime.toISOString() : null,
            startTime: showTimePicker ? values.startTime.toISOString() : null,
            students: values.students,
            examId: Number(values.examId),
            isLocked: values.isLocked,
            designationIds: designationIds,
          },
        },
      });
    } else {
      updateCourseScheduleMutation({
        variables: {
          updateCourseScheduleInput: {
            name: values.name,
            days: [],
            endDate: values.endDate.toISOString(),
            startDate: values.startDate.toISOString(),
            endTime: showTimePicker ? values.endTime.toISOString() : null,
            startTime: showTimePicker ? values.startTime.toISOString() : null,
            students: values.students,
            id: Number(scheduleId),
            examId: Number(values.examId),
            isLocked: values.isLocked,
            designationIds: designationIds,
          },
        },
      });
    }
  };

  const inactiveStudentsInSchedule = useMemo(() => {
    if (!scheduleDetails) {
      return [];
    }
    const inActiveStudents = users?.users?.data?.filter(
      (user) => user?.status !== EmployeeStatus.Active
    );

    const scheduleStudents = scheduleDetails.courseSchedule?.students?.map(
      (student) => student?.userId!
    );

    return inActiveStudents?.filter((student) => scheduleStudents?.includes(student?.id!));
  }, [users, scheduleDetails]);

  useEffect(() => {
    if (idEdit) {
      getCourseScheduleDetails();
      refetchDesignations();
    }
  }, [idEdit, getCourseScheduleDetails]);

  if (userLoading || courseScheduleDetailsLoading || courseLevelLoading || examLoading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="p-6">
      <div className="grid grid-cols-5 gap-3">
        <Card
          className="col-span-2 rounded-lg shadow-sm"
          title={idEdit ? 'Edit Schedule' : 'Create Schedule'}
        >
          <Form
            initialValues={{
              // days: ['1', '2', '3', '4', '5'],
              isLocked: false,
            }}
            size="large"
            onFinish={onFinish}
            form={form}
            layout="vertical"
            className="text-left"
          >
            <Form.Item
              rules={[{ required: true, message: 'Please input a name!' }]}
              label="Name"
              name="name"
            >
              <Input className="!rounded-full" />
            </Form.Item>
            {courseLevel?.courseLevel?.course?.examRequired && (
              <Form.Item
                rules={[{ required: true, message: 'Please input a name!' }]}
                label="Exam"
                name="examId"
              >
                <Select className="rounded-select !rounded-full text-left">
                  {examsResponse?.courseLevel?.exams.map((exam) => (
                    <Select.Option key={exam?.id} value={exam?.id}>
                      {exam?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <div className="grid grid-cols-2 gap-x-5">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid date',
                  },
                ]}
                name="startDate"
                label="Start Date"
              >
                <DatePicker
                  disabledDate={(current) => {
                    return current && current < dayjs().subtract(1, 'year').startOf('day');
                  }}
                  className="!rounded-full"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid date',
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.isBefore(form.getFieldValue('startDate'))) {
                        return Promise.reject(new Error('End date must be after start date'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                label="End Date"
              >
                <DatePicker className="!rounded-full" style={{ width: '100%' }} />
              </Form.Item>
              {showTimePicker && (
                <>
                  <Form.Item
                    rules={[{ required: true, message: 'Please input a start time' }]}
                    name="startTime"
                    label="Start Time"
                  >
                    <TimePicker
                      className="w-full !rounded-full"
                      minuteStep={15}
                      hourStep={1}
                      showSecond={false}
                      use12Hours
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: 'Please input a end time' },
                      {
                        validator: (_, value) => {
                          if (value && value.isBefore(form.getFieldValue('startTime'))) {
                            return Promise.reject(new Error('End time must be after start time'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    name="endTime"
                    label="End Time"
                  >
                    <TimePicker
                      className="w-full !rounded-full"
                      minuteStep={15}
                      hourStep={1}
                      showSecond={false}
                      use12Hours
                    />
                  </Form.Item>
                </>
              )}
            </div>
            {/* <div className="text-left">
            <Form.Item
              rules={[{ required: true, message: 'Please select at least one day' }]}
              label="Days"
              name="days"
              hidden
            >
              <Checkbox.Group>
                <Checkbox value="0">Sunday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="1">Monday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="2">Tuesday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="3">Wednesday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="4">Thursday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="5">Friday &nbsp;&nbsp;&nbsp;</Checkbox>
                <Checkbox value="6">Saturday &nbsp;&nbsp;&nbsp;</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div> */}
            <Form.Item
              rules={[{ required: false, message: 'Please select at least one designation!' }]}
              name="designationIds"
              label={
                <div className="flex items-center">
                  <span>Designation</span>
                </div>
              }
            >
              <Select
                className="rounded-select !rounded-full"
                mode="multiple"
                placeholder="Select designations"
                optionFilterProp="label"
                showSearch
                loading={designationLoading}
                onChange={(selectedIds) => {
                  const previousDesignationIds = selectedDesignationIds;
                  const isAddingDesignations = selectedIds.length > previousDesignationIds.length;
                  
                  setSelectedDesignationIds(selectedIds.map(Number));
                  
                  // If designations are selected, fetch students by designation
                  if (selectedIds && selectedIds.length > 0 && level) {
                    // Only show confirmation when adding designations (not when removing)
                    if (isAddingDesignations) {
                      // Check if there are already selected students
                      const currentStudents = form.getFieldValue('students')?.length > 0;
                      
                      if (currentStudents) {
                        Modal.confirm({
                          centered: true,
                          okButtonProps: {
                            danger: true,
                          },
                          title:
                            'Are you sure you want to replace the current values?',
                          onOk: () => {
                            getStudentsByDesignation({
                              variables: {
                                courseLevelId: Number(level),
                                designationIds: selectedIds.map(Number),
                              },
                            });
                          },
                          onCancel: () => {
                            // Remove the latest selected designation when cancel is clicked
                            const latestSelectedId = selectedIds[selectedIds.length - 1];
                            const filteredIds = selectedIds.filter((id: any) => id !== latestSelectedId);

                            form.setFieldsValue({
                              designationIds: filteredIds,
                            });
                            setSelectedDesignationIds(filteredIds.map(Number));
                          },
                        });
                      } else {
                        getStudentsByDesignation({
                          variables: {
                            courseLevelId: Number(level),
                            designationIds: selectedIds.map(Number),
                          },
                        });
                      }
                    } else {
                      // When removing designations, just fetch students for remaining designations
                      getStudentsByDesignation({
                        variables: {
                          courseLevelId: Number(level),
                          designationIds: selectedIds.map(Number),
                        },
                      });
                    }
                  } 
                  // else {
                  //   Modal.confirm({
                  //     centered: true,
                  //     okButtonProps: {
                  //       danger: true,
                  //     },
                  //     title:
                  //       'Are you sure you want to clear the selection?. If ',
                  //     onOk: () => {
                  //       form.setFieldsValue({
                  //         students: [],
                  //       });
                  //     },
                  //     onCancel: () => {
                  //       form.setFieldsValue({
                  //         designationIds: (previousDesignationIds as any).previousDesignationIds.map(String),
                  //       });
                  //       setSelectedDesignationIds(previousDesignationIds);
                  //     },
                  //   });
                  // }
                }
              }
                filterOption={(input, option) => {
                  return `${option?.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {designations?.designations?.data?.map((designation) => (
                  <Select.Option
                    key={designation?.id}
                    value={designation?.id}
                  >
                    {designation?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Please input your Employee!' }]}
              name="students"
              label={
                <div className="flex items-center">
                  <span>Students</span>
                  {maxStudents && (
                    <span className="ml-1 text-gray-400">
                      (Max: {maxStudents} Student{maxStudents > 1 ? 's' : ''})
                    </span>
                  )}
                </div>
              }
            >
              <Select
                maxCount={maxStudents || undefined}
                className="rounded-select !rounded-full"
                mode="multiple"
                placeholder="Students"
                loading={getNotAttendedOptions.loading || getExpiredUsersOptions.loading}
                // options={users?.users?.data?.map((d) => ({
                //   value: d!.id!,
                //   label: `${d!.name!} ${d?.idNumber}`,
                // }))}
                optionFilterProp="label"
                showSearch
                filterOption={(input, option) => {
                  return `${option?.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                <Select.OptGroup label="Active Students">
                  {users?.users?.data
                    ?.filter((user) => user?.status === EmployeeStatus.Active)
                    .map((user) => (
                      <Select.Option
                        disabled={user?.status !== EmployeeStatus.Active}
                        key={user?.id}
                        value={user?.id}
                      >
                        {`${user?.name} - ${user?.idNumber}`}
                      </Select.Option>
                    ))}
                </Select.OptGroup>
                {inactiveStudentsInSchedule && inactiveStudentsInSchedule.length > 0 && (
                  <Select.OptGroup label="Inactive Students">
                    {inactiveStudentsInSchedule?.map((user) => (
                      <Select.Option
                        disabled={user?.status !== EmployeeStatus.Active}
                        key={user?.id}
                        value={user?.id}
                      >
                        {`${user?.name} - ${user?.idNumber}`}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                )}
              </Select>
            </Form.Item>
            {levelId && (
              <Form.Item label="Quick Select">
                <Button.Group size="small">
                  <Button
                    loading={getNotAttendedOptions.loading}
                    onClick={() => {
                      if (form.getFieldValue('students')?.length > 0) {
                        Modal.confirm({
                          centered: true,
                          okButtonProps: {
                            danger: true,
                          },
                          title:
                            'Are you sure you want to select all not attended users? This will override the current selection',
                          onOk: () => {
                            getNotAttended({
                              variables: {
                                courseLevelId: Number(level),
                                designationIds: selectedDesignationIds,
                              },
                            });
                          },
                        });
                      } else {
                        getNotAttended({
                          variables: {
                            courseLevelId: Number(level),
                            designationIds: selectedDesignationIds,
                          },
                        });
                      }
                    }}
                  >
                    Not Attended
                  </Button>
                  <Button
                    size="small"
                    disabled={getNotAttendedOptions.loading}
                    onClick={() => {
                      if (form.getFieldValue('students')?.length > 0) {
                        Modal.confirm({
                          centered: true,
                          okButtonProps: {
                            danger: true,
                          },
                          title:
                            'Are you sure you want to select all expired users? This will override the current selection',
                          onOk: () => {
                            getExpiredUsers({
                              variables: {
                                courseLevelId: Number(level),
                                designationIds: selectedDesignationIds,
                              },
                            });
                          },
                        });
                      } else {
                        getExpiredUsers({
                          variables: {
                            courseLevelId: Number(level),
                            designationIds: selectedDesignationIds,
                          },
                        });
                      }
                    }}
                    loading={getExpiredUsersOptions.loading}
                  >
                    Expired Users
                  </Button>
                </Button.Group>
              </Form.Item>
            )}
            <Form.Item name="isLocked" label="Lock Schedule" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={createCourseScheduleLoading || updateCourseScheduleLoading}
                shape="round"
                type="primary"
                block
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div className="col-span-3">
          <Card title="Schedule Calendar">
            <ScheduleCalendar />
          </Card>
        </div>
      </div>
    </main>
  );
}

export default CreateSchedule;
