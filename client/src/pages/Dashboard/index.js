import { useProfile } from '../../hooks';

const Dashboard = (props) => {
  const { userProfile } = useProfile();
  return (
    <div>
      <div>Dashboard</div>
      <div>{ userProfile.uid }</div>
      <div>{ userProfile.email }</div>
    </div>
  );
}

export default Dashboard;