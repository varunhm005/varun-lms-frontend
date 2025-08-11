import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import FullScreenLoading from '../components/loading/FullScreenLoading';
import { route } from '../constants/routes';
import { useFirebaseContext } from '../context/firebase-user-context';
// import AdminLayout from '../layouts/AdminLayout';
import { Permissions } from '../configs/permissions';
import AdminLayout from '../layouts/AdminLayout';
import CertificatePrint from '../pages/certificate-print';
import Designations from '../pages/designations';
import Login from '../pages/login';
import PrivateRoute from './PrivateRoute';

// Pages
const NotFound = lazy(() => import('../pages/404'));
const AddAssessment = lazy(() => import('../pages/add-assesment'));
const AddCourseRecommendation = lazy(() => import('../pages/add-course-recommendation'));
const Assessments = lazy(() => import('../pages/assesment'));
const AssessmentSkills = lazy(() => import('../pages/assesment-skills'));
const AttendedExams = lazy(() => import('../pages/attended-exams'));
const CertificateDetails = lazy(() => import('../pages/certificate-details'));
const Certificates = lazy(() => import('../pages/certificates'));
const ChapterCreation = lazy(() => import('../pages/chapter-creation'));
const ChapterDetails = lazy(() => import('../pages/chapter-details'));
const CourseCategories = lazy(() => import('../pages/course-category'));
const CourseLevels = lazy(() => import('../pages/course-levels'));
const CourseList = lazy(() => import('../pages/course-list'));
const CoursesInner = lazy(() => import('../pages/courses-details'));
const CreateCourse = lazy(() => import('../pages/create-course'));
const CreateExam = lazy(() => import('../pages/create-exam'));
const CreateSchedule = lazy(() => import('../pages/create-schedule'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Departments = lazy(() => import('../pages/departments'));
const EditAttendance = lazy(() => import('../pages/edit-attendance'));
const Exams = lazy(() => import('../pages/exams'));
const Faculties = lazy(() => import('../pages/faculties'));
const FacultyRegistration = lazy(() => import('../pages/faculty-registration'));
const Notifications = lazy(() => import('../pages/notifications'));
const Profile = lazy(() => import('../pages/profile'));
const Requests = lazy(() => import('../pages/requests'));
const Roles = lazy(() => import('../pages/roles'));
const ScheduleStudents = lazy(() => import('../pages/schedule-students'));
const Settings = lazy(() => import('../pages/settings'));
const StudentAttendExam = lazy(() => import('../pages/student-attend-exam'));
const StudentClassModule = lazy(() => import('../pages/student-class-module'));
const StudentCourseDDetails = lazy(() => import('../pages/student-course-details'));
const MyStudentCourses = lazy(() => import('../pages/student-my-courses'));
const ViewAttendedExamDetails = lazy(() => import('../pages/view-attended-exam'));
const ViewChapterDoc = lazy(() => import('../pages/view-chapter-doc'));
const Report = lazy(() => import('../pages/report'));
const ReportDetails = lazy(() => import('../pages/report/[slug]'));
const ScheduleAttendance = lazy(() => import('../pages/schedule-attendance'));
const CourseEvaluationDetails = lazy(() => import('../pages/course-evaluation/[slug]'));
const CourseEvaluation = lazy(() => import('../pages/course-evaluation'));
const UpdateExamMark = lazy(() => import('../pages/update-exam-marks'));
// const AttendanceReport = lazy(() => import('../pages/attendance-report'));
// const CourseAssessment = lazy(() => import('../pages/course-assesment'));
// const CreateCertificate = lazy(() => import('../pages/create-certificate'));
// const StudentExam = lazy(() => import('../pages/student-exam'));
// const StudentExamObjectives = lazy(() => import('../pages/student-exam-objectives'));
// const StudentJoinClass = lazy(() => import('../pages/student-join-class'));

const protectedRoute = [
  {
    index: true,
    path: '/',
    element: <Navigate replace to={route.dashboard} />,
    permissions: [Permissions.Dashboard],
  },
  {
    path: route.attendExam,
    element: <StudentAttendExam />,
    permissions: [Permissions.ATTEND_EXAM],
  },
  {
    path: route.viewExam,
    element: <StudentAttendExam />,
    permissions: [Permissions.VIEW_EXAM],
  },
  // {
  //   path: route.studentExam,
  //   element: <StudentExam />,
  //   permissions: [],
  // },
  {
    path: route.studentClassModule(':studentScheduleId'),
    element: <StudentClassModule />,
    permissions: [Permissions.VIEW_STUDENT_MODULE],
  },
  // {
  //   path: route.studentJoinClass,
  //   element: <StudentJoinClass />,
  //   permissions: [],
  // },

  {
    path: route.studentCourseDetails(':studentScheduleId'),
    element: <StudentCourseDDetails />,
    permissions: [Permissions.VIEW_STUDENT_COURSE_DETAILS],
  },
  {
    path: route.dashboard,
    element: <Dashboard />,
    permissions: [Permissions.Dashboard],
  },
  {
    path: route.facultyRegistration,
    element: <FacultyRegistration />,
    permissions: [Permissions.FACULTY_REGISTRATION],
  },
  {
    path: route.editUser(':userId'),
    element: <FacultyRegistration />,
    permissions: [Permissions.EDIT_USER],
  },
  {
    path: route.courseChapterCreation(':levelId'),
    element: <ChapterCreation />,
    permissions: [Permissions.CREATE_CHAPTER],
  },
  {
    path: route.editCourse(':id'),
    element: <CreateCourse />,
    permissions: [Permissions.EDIT_COURSE],
  },
  {
    path: route.chapterDetails(':id'),
    element: <ChapterDetails />,
    permissions: [Permissions.VIEW_CHAPTER],
  },
  {
    path: route.editChapter(':id'),
    element: <ChapterCreation />,
    permissions: [Permissions.CREATE_CHAPTER],
  },
  {
    path: route.profile,
    element: <Profile />,
    permissions: [Permissions.VIEW_PROFILE],
  },
  {
    path: route.createCourse,
    element: <CreateCourse />,
    permissions: [Permissions.CREATE_COURSE],
  },
  {
    path: route.exam,
    element: <Exams />,
    permissions: [Permissions.VIEW_EXAM_LIST],
  },
  // {
  //   path: route.courseAssessment,
  //   element: <CourseAssessment />,
  //   permissions: [],
  // },
  {
    path: route.courseCategory,
    element: <CourseCategories />,
    permissions: [Permissions.COURSE_CATEGORY_MENU],
  },
  // {
  //   path: route.createCertificate,
  //   element: <CreateCertificate />,
  //   permissions: [],
  // },
  // {
  //   path: route.editCertificate(':id'),
  //   element: <CreateCertificate />,
  //   permissions: [],
  // },
  {
    path: `${route.coursesDetails(':levelId')}`,
    element: <CoursesInner />,
    permissions: [Permissions.COURSE_LEVEL_DETAILS],
  },
  // {
  //   path: route.attendanceReport,
  //   element: <AttendanceReport />,
  //   permissions: [],
  // },
  {
    path: route.roles,
    element: <Roles />,
    permissions: [Permissions.ROLES_MENU],
  },
  {
    path: route.departments,
    element: <Departments />,
    permissions: [Permissions.DEPARTMENTS_MENU],
  },
  {
    path: route.courseList,
    element: <CourseList />,
    permissions: [Permissions.COURSE_LIST],
  },
  {
    path: route.users,
    element: <Faculties />,
    permissions: [Permissions.USERS_LIST],
  },
  {
    path: route.createCourseExam(':levelId'),
    element: <CreateExam />,
    permissions: [Permissions.ATTEND_EXAM, Permissions.CREATE_EXAM],
  },
  {
    path: route.editExam(':examId'),
    element: <CreateExam />,
    permissions: [Permissions.EDIT_EXAM],
  },
  {
    path: route.courseLevels(':courseId'),
    element: <CourseLevels />,
    permissions: [Permissions.COURSE_LEVEL_DETAILS],
  },
  {
    path: route.certificates,
    element: <Certificates />,
    permissions: [Permissions.CERTIFICATES_MENU],
  },
  {
    path: route.createSchedule(':levelId'),
    element: <CreateSchedule />,
    permissions: [Permissions.CREATE_COURSE_SCHEDULE],
  },
  {
    path: route.editAttendance(':id'),
    element: <EditAttendance />,
    permissions: [Permissions.EDIT_ATTENDANCE],
  },
  {
    path: route.editSchedule(':scheduleId'),
    element: <CreateSchedule />,
    permissions: [Permissions.CREATE_SCHEDULE],
  },
  {
    path: route.myStudentSchedule,
    element: <MyStudentCourses />,
    permissions: [Permissions.MY_STUDENT_SCHEDULE],
  },
  {
    path: route.viewChapterDoc,
    element: <ViewChapterDoc />,
    permissions: [],
  },
  {
    path: route.assessmentSkills,
    element: <AssessmentSkills />,
    permissions: [Permissions.MANAGE_ASSESSMENT_SKILLS],
  },
  {
    path: route.getCertificateDetails(':id'),
    element: <CertificateDetails />,
    permissions: [Permissions.VIEW_CERTIFICATE],
  },
  {
    path: route.scheduleStudents(':scheduleId'),
    element: <ScheduleStudents />,
    permissions: [Permissions.VIEW_SCHEDULE_STUDENTS],
  },
  {
    path: route.addAssessment,
    element: <AddAssessment />,
    permissions: [Permissions.ADD_ASSESSMENT],
  },
  {
    path: route.assessments,
    element: <Assessments />,
    permissions: [Permissions.ASSESSMENT_LIST],
  },
  {
    path: route.settings,
    element: <Settings />,
    permissions: [],
  },
  {
    path: route.addCourseRecommendation,
    element: <AddCourseRecommendation />,
    permissions: [Permissions.MANAGE_COURSE_RECOMMENDATION],
  },
  {
    path: route.notifications,
    element: <Notifications />,
    permissions: [],
  },
  {
    path: route.attendedExams,
    element: <AttendedExams />,
    permissions: [],
  },
  {
    path: route.viewAttendedExam(':slug'),
    element: <ViewAttendedExamDetails />,
    permissions: [],
  },
  {
    path: route.editAssessment(':slug'),
    element: <AddAssessment />,
    permissions: [Permissions.EDIT_ASSESSMENT],
  },
  {
    path: route.requests,
    element: <Requests />,
    permissions: [Permissions.REQUESTS_MENU],
  },
  {
    path: route.report,
    element: <Report />,
    permissions: [Permissions.REPORT_MENU],
  },
  {
    path: route.scheduleAttendance(':scheduleId'),
    element: <ScheduleAttendance />,
    permissions: [],
  },
  {
    path: route.reportDetails(':slug'),
    element: <ReportDetails />,
    permissions: [Permissions.VIEW_REPORT_DETAILS],
  },
  {
    path: route.courseEvaluation(':slug'),
    element: <CourseEvaluationDetails />,
    permissions: [Permissions.VIEW_COURSE_EVALUATION],
  },
  {
    path: route.courseEvaluationList,
    element: <CourseEvaluation />,
    permissions: [Permissions.VIEW_COURSE_EVALUATION],
  },
  {
    path: route.designation,
    element: <Designations />,
    permissions: [Permissions.DESIGNATION_MENU],
  },
  {
    path: route.updateExamMarks,
    element: <UpdateExamMark />,
    permissions: [Permissions.UPDATE_OFFLINE_EXAM_MARK],
  },
].map((_route) => {
  const { element, permissions, ...rest } = _route;

  const routeObj: RouteObject = {
    element: <PrivateRoute permissions={permissions}>{element}</PrivateRoute>,
    ...rest,
  };

  return routeObj;
});

const router = createBrowserRouter(
  [
    {
      path: route.certificatePrint,
      element: <CertificatePrint />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <AdminLayout />,
      children: protectedRoute,

      // errorElement: <ErrorFallback />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {}
);

export default function Router() {
  const { initializing } = useFirebaseContext();

  if (initializing) {
    return <FullScreenLoading />;
  }

  return <RouterProvider router={router} />;
}
