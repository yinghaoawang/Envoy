import { useProfile } from '../../hooks';
import Leftbar from './Leftbar';

const Dashboard = (props) => {
  const { userProfile } = useProfile();
  return (
    <div className="d-flex">
      <Leftbar></Leftbar>
      <div>
        <div>Dashboard</div>
        <div>{ userProfile.uid }</div>
        <div>{ userProfile.email }</div>
      </div>
    </div>
  );
}

export default Dashboard;