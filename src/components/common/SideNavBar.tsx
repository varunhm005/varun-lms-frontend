import {
  ApartmentOutlined,
  BankOutlined,
  BookOutlined,
  ContainerOutlined,
  DropboxOutlined,
  EditOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/newLogo.jpg';
import {
  ADMIN_PERMISSIONS,
  FACULTY_PERMISSIONS,
  LINE_MANAGER_PERMISSIONS,
  Permissions,
  STUDENT_PERMISSIONS,
} from '../../configs/permissions';
import { route } from '../../constants/routes';
import { useGetUserProfileQuery } from '../../graphql/@generated/graphql';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#F9FAF5',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  height: '64px',
  marginBottom: '8px',
};

const logoStyle: React.CSSProperties = {
  height: '50px',
  transition: 'all 0.2s',
  width: '150px'
};

const menuStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
};

const footerStyle: React.CSSProperties = {
  padding: '12px 24px',
  marginTop: 'auto',
  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'rgba(0, 0, 0, 0.45)',
  userSelect: 'none',
};

export default function SideNavBar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { data } = useGetUserProfileQuery();

  const profile = data?.getUserProfile;

  const items: Array<any> = useMemo(() => {
    const menuItems: any[] = [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: 'Home',
        onClick() {
          navigate(`/${route.dashboard}`);
        },
      },
    ];

    const roleName = profile!.role!.name;

    let permissions: Permissions[] = [];

    if (roleName === 'Admin') {
      permissions = ADMIN_PERMISSIONS;
    }

    if (roleName === 'Faculty') {
      permissions = FACULTY_PERMISSIONS;
    }

    if (roleName === 'Students') {
      permissions = STUDENT_PERMISSIONS;
    }
    if (roleName === 'Line Manager') {
      permissions = LINE_MANAGER_PERMISSIONS;
    }

    if (permissions.includes(Permissions.ROLES_MENU)) {
      menuItems.push({
        key: 'roles',
        icon: <UserSwitchOutlined />,
        label: 'Roles',
        onClick() {
          navigate(`/${route.roles}`);
        },
      });
    }

    if (permissions.includes(Permissions.COURSE_CATEGORY_MENU)) {
      menuItems.push({
        key: 'coursecategory',
        icon: <DropboxOutlined />,
        label: 'Course Category',
        onClick() {
          navigate(`/${route.courseCategory}`);
        },
      });
    }

    if (permissions.includes(Permissions.COURSES_MENU)) {
      menuItems.push({
        key: 'courses',
        icon: <UnorderedListOutlined />,
        label: 'Courses',
        onClick() {
          navigate(`/${route.courseList}`);
        },
      });
    }

    if (permissions.includes(Permissions.MY_STUDENT_SCHEDULE)) {
      menuItems.push({
        key: 'courses',
        icon: <UnorderedListOutlined />,
        label: 'Courses',
        onClick() {
          navigate(`/${route.myStudentSchedule}`);
        },
      });
    }

    if (permissions.includes(Permissions.EXAM_MENU)) {
      menuItems.push({
        key: 'exam',
        icon: <EditOutlined />,
        label: 'Exam',
        onClick() {
          navigate(`/${route.exam}`);
        },
      });
    }

    if (permissions.includes(Permissions.CERTIFICATES_MENU)) {
      menuItems.push({
        key: 'certificates',
        icon: <SafetyCertificateOutlined />,
        label: 'Certificates',
        onClick() {
          navigate(`/${route.certificates}`);
        },
      });
    }

    if (permissions.includes(Permissions.DEPARTMENTS_MENU)) {
      menuItems.push({
        key: 'departments',
        icon: <BankOutlined />,
        label: 'Departments',
        onClick() {
          navigate(`/${route.departments}`);
        },
      });
    }
    if (permissions.includes(Permissions.DESIGNATION_MENU)) {
      menuItems.push({
        key: 'designation',
        icon: <ApartmentOutlined />,
        label: 'Designations',
        onClick() {
          navigate(`/${route.designation}`);
        },
      });
    }
    if (permissions.includes(Permissions.MANAGE_ASSESSMENT_SKILLS)) {
      menuItems.push({
        key: 'assessment-skills',
        icon: <TrophyOutlined />,
        label: 'Assessment Skills',
        onClick() {
          navigate(`/${route.assessmentSkills}`);
        },
      });
    }
    if (permissions.includes(Permissions.VIEW_COURSE_EVALUATION)) {
      menuItems.push({
        key: 'course-evaluation',
        icon: <ContainerOutlined />,
        label: 'Course Evaluation',
        onClick() {
          navigate(`/${route.courseEvaluationList}`);
        },
      });
    }

    if (permissions.includes(Permissions.FACULTIES_MENU)) {
      menuItems.push({
        key: 'faculties',
        icon: <TeamOutlined />,
        label: 'Users',
        onClick() {
          navigate(`/${route.users}`);
        },
      });
    }
    if (permissions.includes(Permissions.MANAGE_COURSE_RECOMMENDATION)) {
      menuItems.push({
        key: 'recommend-course',
        icon: <BookOutlined />,
        label: 'Recommend Course',
        onClick() {
          navigate(`/${route.addCourseRecommendation}`);
        },
      });
    }

    menuItems.push({
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick() {
        navigate(`/${route.profile}`);
      },
    });

    if (permissions.includes(Permissions.REQUESTS_MENU)) {
      menuItems.push({
        key: 'requests',
        icon: <PullRequestOutlined />,
        label: 'Requests',
        onClick() {
          navigate(`/${route.requests}`);
        },
      });
    }
    if (permissions.includes(Permissions.REPORT_MENU)) {
      menuItems.push({
        key: 'report',
        icon: <HomeOutlined />,
        label: 'Report',
        onClick() {
          navigate(`/${route.report}`);
        },
      });
    }

    menuItems.push({
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick() {
        navigate(`/${route.settings}`);
      },
    });

    return menuItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Sider
      width={220}
      style={siderStyle}
      className="side-bar border-r border-gray-100"
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div style={headerStyle}>
        <Link to="/">
          <img
            className="logo"
            src={Logo}
            alt=""
            style={{ ...logoStyle, maxWidth: collapsed ? '50px' : '150px' }}
          />
        </Link>
      </div>

      <Menu
        style={menuStyle}
        className="pl-5 pr-5"
        mode="inline"
        items={items}
        inlineCollapsed={collapsed}
      />

      <Button
        type="text"
        style={footerStyle}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
      >
        {!collapsed && <span>Collapse menu</span>}
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
}
