import { Button, Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { queryKeys } from '../../constants/query-keys';
import { useMessage } from '../../context/message-context';
import {
  AssessmentType,
  CreateAssessmentInput,
  useCreateAssessmentMutation,
  useGetAssessmentQuery,
  useGetCourseAssessmentSkillsQuery,
  useUpdateAssessmentMutation,
} from '../../graphql/@generated/graphql';
import useUrlQueries from '../../hooks/useUrlQueries';

type FormInput = CreateAssessmentInput & {
  skills: number[];
};

function AddAssessment() {
  const [form] = Form.useForm<FormInput>();

  const { slug } = useParams<{ slug: string }>();

  const isEdit = !!slug;

  const query = useUrlQueries<{
    scheduleId: string;
    courseId: string;
  }>();

  const { data: courseAssessment, loading: courseAssessmentLoading } =
    useGetCourseAssessmentSkillsQuery({
      variables: {
        courseId: +query.courseId,
      },
    });

  useEffect(() => {
    if (query.scheduleId) {
      form.setFieldsValue({
        courseScheduleStudentsId: +query.scheduleId,
      });
    }
  }, [form, query.scheduleId]);

  const { success } = useMessage();

  const [createAssessment, { loading: createAssessmentLoading }] = useCreateAssessmentMutation({
    refetchQueries: [queryKeys.GetAssessments],
    onCompleted: () => {
      success('Assessment created successfully');
      form.resetFields();
    },
  });
  const [updateAssessment, { loading: updateAssessmentLoading }] = useUpdateAssessmentMutation({
    refetchQueries: [queryKeys.GetAssessments, queryKeys.GetAssessment],
    onCompleted: () => {
      success('Assessment updated successfully');
    },
  });

  const { data: assessment } = useGetAssessmentQuery({
    variables: {
      slug: slug!,
    },
    skip: !isEdit,
    onCompleted: (data) => {
      if (data.assessment) {
        const response = data.assessment;
        form.setFieldsValue({
          attitude: response.attitude,
          type: response.type,
          result: response.result,
          skills: response.skillsOfAssessment.map((skill) => Number(skill.skill.id)),
          date: dayjs(response.date),
          assementAction: response.assementAction,
          validUpTo: response.validUpTo ? (dayjs(response.validUpTo) as any) : undefined,
        });
      }
    },
  });

  const assessmentData = useMemo(() => {
    if (assessment?.assessment) {
      return assessment.assessment;
    }
    return null;
  }, [assessment]);

  const onSubmit = (data: FormInput) => {
    const { skills: skls, ...rest } = data;

    if (isEdit) {
      updateAssessment({
        variables: {
          updateAssessmentInput: {
            ...rest,
            date: rest.date.toISOString(),
            skillsOfAssement: skls.map((id) => ({
              applicable: true,
              proLevel: '',
              assessmentSkillsId: id,
            })),
          },
          updateAssessmentId: assessmentData!.id,
        },
      });
    } else {
      createAssessment({
        variables: {
          createAssessmentInput: {
            ...rest,
            date: rest.date.toISOString(),
            skillsOfAssement: skls.map((id) => ({
              applicable: true,
              proLevel: '',
              assessmentSkillsId: id,
            })),
          },
        },
      });
    }
  };

  if (courseAssessmentLoading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="p-6 text-left">
      <div className="max-w-xl">
        <h1 className="mb-6 text-3xl font-bold">
          {isEdit ? 'Update Assessment' : 'Add Assessment'}
        </h1>
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            rules={[{ required: true, message: 'Please select type' }]}
            label="Type"
            name="type"
          >
            <Checkbox.Group>
              <Checkbox value={AssessmentType.TrainingRecord}>Training Record</Checkbox>
              <Checkbox value={AssessmentType.Hr}>HR</Checkbox>
              <Checkbox value={AssessmentType.Certificate}>Certificate</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {Boolean(courseAssessment?.course?.courseAssessmentSkills?.length) && (
            <Form.Item
              rules={[{ required: true, message: 'Please select applicable skills' }]}
              label="Applicable Skills"
              name="skills"
            >
              <Checkbox.Group>
                <Row>
                  {courseAssessment?.course?.courseAssessmentSkills?.map((item) => {
                    const skill = item?.assessmentSkill;
                    return (
                      <Col span={24}>
                        <Checkbox key={skill!.id} value={skill!.id}>
                          <p className="w-full">{skill!.name}</p>
                        </Checkbox>
                      </Col>
                    );
                  }) || []}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          )}
          <Form.Item hidden label="User" name="courseScheduleStudentsId">
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please select date' }]}
            label="Date"
            name="date"
          >
            <DatePicker className="!w-full" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please enter attitude' }]}
            label="Attitude"
            name="attitude"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please enter result' }]}
            label="Result"
            name="result"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please enter result' }]}
            label="Action"
            name="assementAction"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Valid Upto" name="validUpTo">
            <DatePicker className="!w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={createAssessmentLoading || updateAssessmentLoading}
              shape="round"
              block
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}

export default AddAssessment;
