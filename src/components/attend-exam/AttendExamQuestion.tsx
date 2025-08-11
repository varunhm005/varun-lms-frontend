import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Badge, Button, Image, Input, InputNumber, Tag } from 'antd';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Permissions } from '../../configs/permissions';
import { queryKeys } from '../../constants/query-keys';
import { useMessage } from '../../context/message-context';
import {
  AnswerStatus,
  AnswerType,
  useUpdateAttendedExamAnswerMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { ExamQuestionsWithScenarioQuestion } from '../../types/ExamQuestionsWithScenario';
import { cn } from '../../utils/cn';
import { getImageDetailsFromUrl } from '../../utils/utils';

interface Props {
  data: ExamQuestionsWithScenarioQuestion;
  readonly: boolean;
  canEvaluate: boolean;
}

function AttendExamQuestion(props: Props) {
  const { data, readonly, canEvaluate } = props;

  const [answer, setAnswer] = useState<null | string>(data.answer || null);
  const prevAnswerRef = useRef(answer);

  const [remarks, setRemarks] = useState(data.remarks);
  const deferredRemarks = useDeferredValue(remarks);
  const prevRemarksRef = useRef(deferredRemarks);

  const [mark, setMark] = useState(data.selectedAnswerMark);
  const deferredMark = useDeferredValue(mark);
  const prevMarkRef = useRef(deferredMark);

  const [updateAttendedExamAnswerMutation] = useUpdateAttendedExamAnswerMutation({
    refetchQueries: [queryKeys.GetAttendedExam, queryKeys.GetAttendedExamDetails],
  });

  const permissions = useGetUserPermissions();

  const { error } = useMessage();

  // Track if this is the first render
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (answer && answer !== prevAnswerRef.current) {
      updateAttendedExamAnswerMutation({
        variables: {
          updateAttendedExamAnswerInput: {
            id: Number(data.id),
            answer,
          },
        },
      });
      prevAnswerRef.current = answer;
    }
  }, [answer, data.id, updateAttendedExamAnswerMutation]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (permissions.includes(Permissions.EVALUATE_EXAM)) {
      if (deferredRemarks && deferredRemarks !== prevRemarksRef.current) {
        updateAttendedExamAnswerMutation({
          variables: {
            updateAttendedExamAnswerInput: {
              id: Number(data.id),
              remarks: deferredRemarks,
            },
          },
        });
        prevRemarksRef.current = deferredRemarks;
      }
    }
  }, [deferredRemarks, data.id, updateAttendedExamAnswerMutation, permissions]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (permissions.includes(Permissions.EVALUATE_EXAM)) {
      if (deferredMark && deferredMark !== prevMarkRef.current) {
        updateAttendedExamAnswerMutation({
          variables: {
            updateAttendedExamAnswerInput: {
              id: Number(data.id),
              selectedAnswerMark: deferredMark,
            },
          },
        });
        prevMarkRef.current = deferredMark;
      }
    }
  }, [deferredMark, data.id, updateAttendedExamAnswerMutation, permissions]);

  const hasEvaluatePermission = useMemo(() => {
    return permissions.includes(Permissions.EVALUATE_EXAM);
  }, [permissions]);

  const getStatusBadge = useMemo(() => {
    if (!readonly) return null;

    // Use answerStatus from the data
    switch (data.answerStatus) {
      case AnswerStatus.NotAnswered:
        return <Tag color="warning">Not Answered</Tag>;
      case AnswerStatus.Answered:
        return <Tag color="processing">Answered</Tag>;
      case AnswerStatus.WaitingForReview:
        return <Tag color="orange">Waiting for Review</Tag>;
      case AnswerStatus.Reviewed:
        return <Tag color="blue">Reviewed</Tag>;
      case AnswerStatus.CorrectAnswer:
        return <Tag color="success">Correct</Tag>;
      case AnswerStatus.WrongAnswer:
        return <Tag color="error">Incorrect</Tag>;
      default:
        return null;
    }
  }, [readonly, data.answerStatus]);

  return (
    <div
      className={cn(
        'mb-5 rounded-lg border border-gray-200 p-4',
        readonly ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            count={`${data.questionNumber}`}
            style={{
              backgroundColor: '#1890ff',
              padding: '0 8px',
            }}
          />
          {getStatusBadge}
        </div>
        {readonly && data.answerType === AnswerType.Mcq && data.correctAnswer && (
          <div className="text-sm">
            <span className="font-medium">Correct Answer:</span> {data.correctAnswer}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h5 className="mb-3 text-base font-medium text-gray-800">{data.questionText}</h5>

        {Boolean(data.mediaUrl) && (
          <div className="mb-4">
            {getImageDetailsFromUrl(`${data.mediaUrl}`).type === 'image' ? (
              <Image className="!h-72" src={data.mediaUrl ?? ''} />
            ) : (
              <DocViewer
                documents={[
                  {
                    uri: data.mediaUrl!,
                    fileName: `${getImageDetailsFromUrl(`${data.mediaUrl}`).fileName}`,
                  },
                ]}
                pluginRenderers={DocViewerRenderers}
                prefetchMethod="GET"
                style={{
                  width: '100%',
                  minHeight: '400px',
                }}
                config={{
                  header: {
                    disableFileName: true,
                    disableHeader: true,
                  },
                }}
              />
            )}
          </div>
        )}

        {data.answerType === AnswerType.Mcq ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {data.answersOptions?.map((ans) => {
              const isSelect = answer === ans;

              return (
                <Button
                  key={ans}
                  shape="round"
                  onClick={() => {
                    if (readonly) return;
                    setAnswer(ans);
                  }}
                  type={isSelect ? 'primary' : 'default'}
                  className={cn(readonly && '!cursor-not-allowed')}
                >
                  {ans}
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="mb-4">
            <Input.TextArea
              readOnly={readonly}
              defaultValue={data.answer}
              rows={4}
              onBlur={(e) => {
                if (readonly) return;
                setAnswer(e.target.value);
              }}
              className={cn('w-full rounded-lg', readonly && 'border-gray-200 bg-gray-50')}
            />
          </div>
        )}

        {readonly && (
          <div className="mt-3 space-y-2">
            {Boolean(data.selectedAnswerMark) && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Mark:</span>
                <span>
                  {data.selectedAnswerMark} / {data.correctAnswerMark}
                </span>
              </div>
            )}

            {Boolean(data.correctAnswer) && data.answerType !== AnswerType.Mcq && (
              <div>
                <div className="font-medium">Model Answer:</div>
                <div className="text-gray-700">{data.correctAnswer}</div>
              </div>
            )}

            {Boolean(data.remarks) && (
              <div>
                <div className="font-medium">Remarks:</div>
                <div className="text-gray-700">{data.remarks}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {hasEvaluatePermission && canEvaluate && (
        <div className="mt-3 border-t pt-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 font-medium">Mark</p>
              <InputNumber
                value={mark ?? 0}
                onChange={(value) => {
                  if (value !== null && hasEvaluatePermission) {
                    if (value >= 0 && value <= Number(data.correctAnswerMark)) {
                      setMark(value);
                    } else {
                      error("Mark can't be greater than alloted mark");
                    }
                  }
                }}
                className="!w-full rounded-lg"
                placeholder="Enter Mark"
                disabled={data.answerType === AnswerType.Mcq}
              />
              <div className="mt-1 text-xs text-gray-500">
                Maximum mark: {data.correctAnswerMark}
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium">Remarks</p>
              <Input.TextArea
                className="!w-full rounded-lg"
                value={remarks ?? ''}
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
                rows={3}
                placeholder="Enter remarks"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendExamQuestion;
