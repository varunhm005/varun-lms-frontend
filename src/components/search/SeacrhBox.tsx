import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export default function SeacrhBox() {
  return (
    <div className="search-box">
      <Input size="large" placeholder="Search" prefix={<SearchOutlined />} />
    </div>
  );
}
