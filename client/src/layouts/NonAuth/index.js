import { ToastContainer } from 'react-toastify';

const NonAuthLayout = (props) => {
  return (
    <div>
      <ToastContainer theme='dark' autoClose={2000} />
      {props.children}
    </div>
  );
}

export default NonAuthLayout;