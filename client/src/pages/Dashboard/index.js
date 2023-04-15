import Leftbar from './Leftbar';
import Content from './Content';

const Dashboard = (props) => {
  return (
    <div className='d-flex w-100'>
      <Leftbar></Leftbar>
      <Content />
    </div>
  );
}

export default Dashboard;