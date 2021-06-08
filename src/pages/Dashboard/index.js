import 'antd/dist/antd.css';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import './dashboard.css';
import DashboardLayout from './DashboardLayout';

export default function Dashboard() {
  useAuthenticated();

  return (
    <div className="zvn-react-blogs">
      <DashboardLayout />
    </div>
  )
}