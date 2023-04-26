import { useRedux } from '../../hooks';
import { loginUser, logoutUser } from '../../redux/auth/login/actions';
import { registerUser } from '../../redux/auth/register/actions';
import { APIClient } from '../../api/apiCore';

const Home = () => {
  const api = new APIClient();
  const { dispatch,  useAppSelector } = useRedux();
  const { isUserLoggedIn, loginError, loginLoading, isUserLoggedOut } = useAppSelector(
    state => ({
      isUserLoggedIn: state.Login.isUserLoggedIn,
      loginError: state.Login.error,
      loginLoading: state.Login.loading,
      isUserLoggedOut: state.Login.isUserLoggedOut,
    })
  );
  const { isUserRegistered, registerError, registerLoading } = useAppSelector(
    state => ({
      isUserRegistered: state.Register.isUserRegistered,
      registerError: state.Register.error,
      registerLoading: state.Register.loading
    })
  )
  const onLogin = async () => {
    dispatch(loginUser({email: 'hey@email.com', password: 'password'}));
  };

  const onLogout = () => {
    dispatch(logoutUser());
  }

  const onRegister = () => {
    dispatch(registerUser({email: 'hey@email.com', password: 'password'}));
  }

  return (
    <div>
      <div>{isUserLoggedIn && 'isUserLoggedIn'} {loginError && 'login error' + loginError} {loginLoading && 'loginloading'} {isUserLoggedOut && 'isUserLoggedOut'}</div>
      <div>{isUserRegistered && 'isUserRegistered'} {registerError && 'register error' + registerError} {registerLoading && 'registerLoading'}</div>
      <div>Home</div>
      <button onClick={() => onLogin()}>Login</button>
      <button onClick={() => onLogout()}>Logout</button>
      <button onClick={() => onRegister()}>Register</button>
    </div>
  );
};

export default Home;
