import { ToastContainer } from 'react-toastify';
import SideMenu from './SideMenu';

const DefaultLayout = (props) => {
  return (
    <div className='main'>
      <SideMenu />
      <ToastContainer theme='dark' autoClose={2000} />
      {props.children}
    </div>
  );
}

export default DefaultLayout;