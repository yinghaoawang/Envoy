import Welcome from '../../components/Welcome';
import { useProfile } from '../../hooks';
import Leftbar from './Leftbar';

const Dashboard = (props) => {
  const { userProfile } = useProfile();
  return (
    <div className="d-flex w-100">
      <Leftbar></Leftbar>
      <div className='w-100 bg-pattern-1 bg-gray-800 align-items-center text-white'>
        <Welcome />
      </div>
    </div>
  );
}

export default Dashboard;