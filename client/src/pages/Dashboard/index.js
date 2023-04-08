import { useProfile } from '../../hooks';
import Leftbar from './Leftbar';

const Dashboard = (props) => {
  const { userProfile } = useProfile();
  console.log(userProfile);
  return (
    <div>
      <Leftbar />
      <div>Dashboard</div>
      <div>{ userProfile.uid }</div>
      <div>{ userProfile.email }</div>
    </div>
  )
}

export default Dashboard;