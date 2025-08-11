import AdminDashboard from '../../components/dashboards/admin-dashboard';
import StudentDashboard from '../../components/dashboards/student-dashboard';
import { useGetUserRoleName } from '../../hooks/auth-hook';

export default function Dashboard() {
  const roleName = useGetUserRoleName();

  if (roleName === 'Students' || roleName === 'Line Manager') {
    return <StudentDashboard />;
  }
  return <AdminDashboard />;

  // return (
  //   <div>
  //     <div className="p-6">
  //       <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
  //         <div className="col-span-1 text-left">
  //           <p className="mb-2 text-base">Courses</p>

  //           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
  //             <div className="col-span-1">
  //               <Card className="card-style" style={{ backgroundColor: '#E7F3FF', width: '100%' }}>
  //                 <p>Active</p>
  //                 <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //                 <p>Status: Ongoing</p>
  //                 <p>Date: 19-12-2023</p>
  //                 <p>Progress:</p>
  //                 <Progress strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }} percent={80} />
  //               </Card>
  //             </div>
  //             <div className="col-span-1">
  //               <Card className="card-style" style={{ backgroundColor: '#FFE3E1', width: '100%' }}>
  //                 <p>Active</p>
  //                 <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //                 <p>Status: Ongoing</p>
  //                 <p>Date: 19-12-2023</p>
  //                 <p>Progress:</p>
  //                 <Progress strokeColor={{ '0%': '#FEA39D', '100%': '#FEA39D' }} percent={40} />
  //               </Card>
  //             </div>
  //             <div className="col-span-1">
  //               <Card className="card-style" style={{ backgroundColor: '#D8FFF0', width: '100%' }}>
  //                 <p>Active</p>
  //                 <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //                 <p>Status: Ongoing</p>
  //                 <p>Date: 19-12-2023</p>
  //                 <p>Progress:</p>
  //                 <Progress strokeColor={{ '0%': '#80DCBA', '100%': '#80DCBA' }} percent={90} />
  //               </Card>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="col-span-1">
  //           <div style={wrapperStyle}>
  //             <Calendar fullscreen={false} />
  //           </div>
  //         </div>
  //       </div>

  //       <div className="mt-5 grid grid-cols-1 gap-5 text-left md:grid-cols-4">
  //         <div className="col-span-4 ">
  //           <p className="text-base">Exam</p>
  //         </div>
  //         <div className="col-span-1 ">
  //           <Card className="card-style" style={{ backgroundColor: '#E7F3FF', width: '100%' }}>
  //             <p>Active</p>
  //             <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //             <p>Status: Ongoing</p>
  //             <p>Date: 19-12-2023</p>
  //             <p>Progress:</p>
  //             <Progress strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }} percent={80} />
  //           </Card>
  //         </div>

  //         <div className="col-span-1 ">
  //           <Card className="card-style" style={{ backgroundColor: '#E7F3FF', width: '100%' }}>
  //             <p>Active</p>
  //             <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //             <p>Status: Ongoing</p>
  //             <p>Date: 19-12-2023</p>
  //             <p>Progress:</p>
  //             <Progress strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }} percent={80} />
  //           </Card>
  //         </div>

  //         <div className="col-span-1 ">
  //           <Card className="card-style" style={{ backgroundColor: '#E7F3FF', width: '100%' }}>
  //             <p>Active</p>
  //             <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //             <p>Status: Ongoing</p>
  //             <p>Date: 19-12-2023</p>
  //             <p>Progress:</p>
  //             <Progress strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }} percent={80} />
  //           </Card>
  //         </div>

  //         <div className="col-span-1 ">
  //           <Card className="card-style" style={{ backgroundColor: '#E7F3FF', width: '100%' }}>
  //             <p>Active</p>
  //             <h4 className="mb-5 text-xl font-semibold">Airside Safety</h4>
  //             <p>Status: Ongoing</p>
  //             <p>Date: 19-12-2023</p>
  //             <p>Progress:</p>
  //           </Card>
  //         </div>
  //       </div>

  //       <div className="mt-5 grid grid-cols-1 gap-5 text-left ">
  //         <div className="col-span-1 ">
  //           <p className="mb-3 text-base">Schedule</p>
  //           <Table columns={columns} dataSource={data} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
