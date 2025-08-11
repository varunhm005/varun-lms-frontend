import { Button, Checkbox, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import SaftyImage from '../../assets/images/safety.png';
import SeacrhBox from '../../components/search/SeacrhBox';

interface ReportDataType {
  key: string;
  name: string;
  address: string;
  date: string;
  strength: string;
  present: string;
  absent: string;
}

interface AttendanceDataType {
  key: string;
  student: string;
  designation: string;
  department: string;
}

const attendanceColumns: ColumnsType<AttendanceDataType> = [
  {
    title: 'S.No',
    dataIndex: 'key',
    key: 'string',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Student',
    dataIndex: 'student',
    key: 'student',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
  },
  {
    title: 'Department',
    key: 'department',
    dataIndex: 'department',
  },
  {
    title: 'Attendance Status',
    render: () => (
      <div className="flex items-center justify-center">
        <Checkbox checked />
      </div>
    ),
  },
  {
    title: 'Remark',
    render: () => <Input className="!rounded-full" />,
  },
];

const attendanceData: AttendanceDataType[] = [
  {
    key: '1',
    student: 'John Brown',
    designation: 'Crew Member',
    department: 'Flight Attender',
  },
  {
    key: '2',
    student: 'Jim Green',
    designation: 'Crew Member',
    department: 'Flight Attender',
  },
  {
    key: '3',
    student: 'Salman Shareef',
    designation: 'Crew Member',
    department: 'Flight Attender',
  },
];

const reportColumns: ColumnsType<ReportDataType> = [
  {
    title: 'S.No',
    dataIndex: 'key',
    key: 'string',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    key: 'action',
    render: () => <div>11:00 AM</div>,
  },
  {
    title: 'Location',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Instructor',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Strength',
    key: 'strength',
    dataIndex: 'strength',
  },
  {
    title: 'Present',
    key: 'present',
    dataIndex: 'present',
  },
  {
    title: 'Absent',
    key: 'absent',
    dataIndex: 'absent',
  },
];

const reportData: ReportDataType[] = [
  {
    key: '1',
    date: '18-01-2023',
    name: 'John Brown',
    address: 'New York No. 1 Lake Park',
    strength: '10',
    present: '10',
    absent: '0',
  },
  {
    key: '2',
    date: '18-01-2023',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
    strength: '10',
    present: '10',
    absent: '0',
  },
  {
    key: '3',
    date: '18-01-2023',
    name: 'Salman Shareef',
    address: 'Sydney No. 1 Lake Park',
    strength: '10',
    present: '10',
    absent: '0',
  },
];
export default function index() {
  return (
    <div>
      <SeacrhBox />

      <div className="p-6 text-left">
        <div className="grid  grid-cols-1 gap-4 text-left md:grid-cols-10">
          <div className="col-span-1 md:col-span-6 ">
            <div className="relative flex rounded-[25px]  border border-red-200 bg-red-100 shadow">
              <div className="p-5">
                <div className="mb-3 flex">
                  <div className="border-r  border-r-stone-300 pr-5">
                    <p className="text-[14px] font-normal text-black">Course Name:</p>
                    <h3 className="text-[24px] font-black text-black">Airside Safety</h3>
                  </div>
                  <div className="pl-5">
                    <p className="text-[14px] font-normal text-black">Next Class:</p>
                    <h6 className="text-[16px] font-black text-black">11-12-2023</h6>
                  </div>
                </div>

                <Button shape="round" className="mr-3 mt-2" type="primary">
                  Add Session
                </Button>
                <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
                  Attendance Reports
                </Button>
                <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
                  Create Exam
                </Button>
              </div>
              <div className=" w-[140px]">
                <img
                  className="h-[279px   absolute bottom-0 right-3 w-[136px]"
                  src={SaftyImage}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 ">
            <div className=" flex flex-wrap rounded-[25px]   border border-sky-200  bg-sky-100 p-5 shadow">
              <div className="w-1/2 ">
                <p className="text-[14px] font-normal text-black">Course Code:</p>
                <h6 className="text-[16px] font-black text-black">00000000100101#</h6>
              </div>
              <div className="w-1/2 ">
                <p className="text-[14px] font-normal text-black">Instructor:</p>
                <h6 className="text-[16px] font-black text-black">Salman Shareef</h6>
              </div>
              <div className="mt-4 ">
                <p className="text-[14px] font-normal text-black">Mode:</p>
                <h6 className="text-[16px] font-black text-black">Abcdefgh</h6>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-2 mt-4 text-base">Attendance: 11-05-2023 Tuesday:</p>
        <Table columns={attendanceColumns} dataSource={attendanceData} />
        <Button shape="round" className="mr-3 mt-2" type="primary">
          Save
        </Button>
        <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
          Clear
        </Button>

        <p className="mb-2 mt-5 text-base">Attendance Report: 01-01-2023 Tuesday</p>
        <Table columns={reportColumns} dataSource={reportData} />
        <Button shape="round" className="mr-3 mt-2" type="primary">
          Download
        </Button>
        <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
          Upload
        </Button>
        <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
          Share
        </Button>
      </div>
    </div>
  );
}
