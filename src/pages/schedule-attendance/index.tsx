import { Button, Table, Upload } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddAttendance from '../../components/attendance/add-attendance';
import { configs } from '../../configs/configs';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { storagePaths } from '../../constants/storage-paths';
import {
  Attendance,
  CourseMedian,
  OrderBy,
  useGetAttendanceSheetMutation,
  useGetAttendancesForScheduleQuery,
  useGetCourseScheduleDetailsQuery,
  useUpdateCourseScheduleMutation,
} from '../../graphql/@generated/graphql';
import { useUrlQueryParam } from '../../hooks/useUrlQueries';
import { formatDate, uploadFileToStorage } from '../../utils/utils';

function ScheduleAttendance() {
  const { scheduleId } = useParams<{ scheduleId: string }>();

  const [selectedSchedule, setSelectedSchedule] = useState<null | number>(null);

  const { queryParams, setQueryParams } = useUrlQueryParam<{
    page: string;
    size: string;
  }>();

  const { data: schedule } = useGetCourseScheduleDetailsQuery({
    variables: {
      courseScheduleId: Number(scheduleId),
    },
  });

  const { data, loading } = useGetAttendancesForScheduleQuery({
    variables: {
      findAttendanceInput: {
        courseScheduleId: Number(scheduleId),
      },
      pagingInput: {
        page: Number(queryParams.page) || configs.defaultPage,
        size: Number(queryParams.size) || configs.defaultPageSize,
        orderBy: OrderBy.Desc,
        orderField: 'date',
      },
    },
  });

  const [genAttendance, { loading: genLoading }] = useGetAttendanceSheetMutation({
    onCompleted: (response) => {
      const url = response?.getAttendanceSheet!.url!;
      window.open(url, '_blank');
    },
    refetchQueries: [queryKeys.GetCourseScheduleDetails],
  });

  const [updateCourseSchedule, { loading: updateLoading }] = useUpdateCourseScheduleMutation({
    refetchQueries: [queryKeys.GetCourseScheduleDetails],
  });

  const uploadToFirebaseAndSaveUrl = async (file: File) => {
    const url = await uploadFileToStorage(file, `${storagePaths.attendanceProofs}/${file.name}`);
    await updateCourseSchedule({
      variables: {
        updateCourseScheduleInput: {
          id: Number(scheduleId),
          attendanceProof: url,
        },
      },
    });
  };

  const navigate = useNavigate();

  return (
    <main className="p-6 text-left">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Attendance</div>
        {schedule?.courseSchedule?.course?.median === CourseMedian.Offline && (
          <div className="flex gap-2">
            {schedule?.courseSchedule?.attendanceProof && (
              <Button
                shape="round"
                onClick={() => {
                  window.open(schedule!.courseSchedule!.attendanceProof!, '_blank');
                }}
                type="default"
              >
                View Attendance Sheet
              </Button>
            )}
            {schedule?.courseSchedule?.attendanceSheet && (
              <Upload
                showUploadList={false}
                customRequest={async (file) => {
                  return uploadToFirebaseAndSaveUrl(file.file as any);
                }}
              >
                <Button loading={updateLoading} shape="round" onClick={() => {}} type="default">
                  {schedule?.courseSchedule?.attendanceProof
                    ? 'Update Attendance Sheet'
                    : 'Upload Attendance Sheet'}
                </Button>
              </Upload>
            )}
            <Button
              shape="round"
              loading={genLoading}
              onClick={() => {
                genAttendance({
                  variables: {
                    getAttendanceSheetInput: {
                      id: Number(scheduleId),
                    },
                  },
                });
              }}
              type="default"
            >
              Download Attendance Sheet
            </Button>
            <Button
              shape="round"
              onClick={() => {
                setSelectedSchedule(Number(schedule?.courseSchedule?.id));
              }}
              type="primary"
            >
              Add Attendance
            </Button>
          </div>
        )}
      </div>
      <Table
        size="small"
        dataSource={(data?.attendances?.data ?? []) as Attendance[]}
        className="mt-5"
        bordered
        columns={[
          {
            title: 'Date',
            render: (_, item) => formatDate(item?.date),
          },
          {
            title: 'Taken By',
            render: (_, item) => item?.creator?.name,
          },
          {
            title: 'Action',
            render: (_, item) => (
              <div>
                <Button
                  onClick={() => {
                    navigate(`/${route.editAttendance(item.slug)}`, {});
                  }}
                  size="small"
                  type="link"
                >
                  View
                </Button>
              </div>
            ),
          },
        ]}
        rowKey={(item) => item.id}
        loading={loading}
        pagination={{
          total: data?.attendances?.paging?.totalItems ?? 0,
          pageSize: Number(data?.attendances?.paging?.size) || configs.defaultPageSize,
          current: Number(data?.attendances?.paging?.currentPage) || configs.defaultPage,
          onChange: (page, size) => {
            setQueryParams({
              page: String(page),
              size: String(size),
            });
          },
        }}
      />
      <AddAttendance
        onClose={() => setSelectedSchedule(null)}
        open={!!selectedSchedule}
        scheduleId={Number(schedule?.courseSchedule?.id)}
        startDate={schedule ? dayjs(schedule?.courseSchedule?.startDate!) : dayjs()}
        endDate={schedule ? dayjs(schedule?.courseSchedule?.endDate!) : dayjs()}
      />
    </main>
  );
}

export default ScheduleAttendance;
