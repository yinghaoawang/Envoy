import { useProfile } from '../../hooks';
import Leftbar from './Leftbar';
import Content from './Content';

const Dashboard = (props) => {
  const { userProfile } = useProfile();
  return (
    <div className="d-flex w-100">
      <Leftbar></Leftbar>
      <Content />
    </div>
  );
}

export default Dashboard;