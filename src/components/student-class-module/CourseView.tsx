import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Button, Modal, Spin } from 'antd';
import ReactPlayer from 'react-player';
import { queryKeys } from '../../constants/query-keys';
import {
  Chapter,
  ChapterType,
  CourseProgressStatus,
  ScheduleProgress,
  useUpdateScheduleProgressMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  chapter: Chapter;
  progress: ScheduleProgress | null;
}

export default function CourseView(props: Props) {
  const { chapter, progress } = props;
  const [modal, contextHolder] = Modal.useModal();

  const [updateScheduleProgress, { loading: updateScheduleProgressLoading }] =
    useUpdateScheduleProgressMutation({
      refetchQueries: [queryKeys.GetScheduleStudentDetails],
      onError: showErrorMessage,
    });

  const markCompletedPrompt = () => {
    if (progress?.lessonStatus !== CourseProgressStatus.Completed) {
      updateScheduleProgress({
        variables: {
          updateScheduleProgressInput: {
            id: progress?.id!,
            lessonStatus: CourseProgressStatus.Completed,
          },
        },
      });
    }
    if (progress?.status === CourseProgressStatus.Completed) {
      return;
    }

    modal.confirm({
      title: 'Mark as completed?',
      content: 'Do you want to mark this chapter as completed?',
      centered: true,
      onOk: () => {
        updateScheduleProgress({
          variables: {
            updateScheduleProgressInput: {
              id: progress?.id!,
              status: CourseProgressStatus.Completed,
            },
          },
        });
      },
    });
  };

  return (
    <Spin spinning={updateScheduleProgressLoading}>
      <div className="chapter-doc-container">
        <div className="flex justify-end">
          {(chapter.chapterType !== ChapterType.Video ||
            progress?.lessonStatus === CourseProgressStatus.Completed) &&
            progress?.status !== CourseProgressStatus.Completed && (
              <Button onClick={markCompletedPrompt} className="mb-5" type="primary" shape="round">
                Mark As Completed
              </Button>
            )}
        </div>
        {chapter.chapterType === ChapterType.Video && (
          <ReactPlayer
            url={chapter.link!}
            controls
            light={false}
            onStart={() => {
              if (progress?.lessonStatus === CourseProgressStatus.NotStarted)
                updateScheduleProgress({
                  variables: {
                    updateScheduleProgressInput: {
                      id: progress?.id!,
                      lessonStatus: CourseProgressStatus.InProgress,
                    },
                  },
                });
            }}
            onEnded={markCompletedPrompt}
          />
        )}

        {chapter.chapterType === ChapterType.Document && (
          <DocViewer
            documents={[
              {
                uri: chapter.link!,
                fileName: `${chapter.name}`,
              },
            ]}
            pluginRenderers={DocViewerRenderers}
            prefetchMethod="GET"
            style={{
              width: '100%',
              minHeight: '70vh',
            }}
            config={{
              header: {
                disableFileName: true,
                disableHeader: true,
                retainURLParams: true,
              },
            }}
          />
        )}

        {contextHolder}
      </div>
    </Spin>
  );
}
