import { Card } from 'antd';
import { Link } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { route } from '../../constants/routes';
import { useGetReportListQuery } from '../../graphql/@generated/graphql';

function Report() {
  const { data, loading } = useGetReportListQuery();

  if (loading) {
    return <FullScreenLoading />;
  }

  const reports = data?.reportList ?? [];

  return (
    <div className="p-6 text-left">
      <h1 className="mb-5 text-2xl font-bold">Reports</h1>
      <div className="grid grid-cols-3 gap-5">
        {reports.map((report) => (
          <div className="col-span-1" key={report?.title}>
            <Link to={route?.reportDetails(report?.slug!)}>
              <Card
                className="card-style cursor-pointer"
                style={{ backgroundColor: '#E7F3FF', width: '100%', height: '100%' }}
              >
                <h4 className="mb-5 text-xl font-semibold">{report?.title}</h4>
                <p>{report?.description}</p>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
