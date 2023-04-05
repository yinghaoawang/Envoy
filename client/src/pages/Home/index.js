import { useRedux } from '../../hooks';
import { loginUser } from '../../redux/auth/login/actions';

const Home = () => {
  const { dispatch,  useAppSelector } = useRedux();
  const { isUserLogin, error, loginLoading, isUserLogout } = useAppSelector(
    state => ({
      isUserLogin: state.Login.isUserLogin,
      error: state.Login.error,
      loginLoading: state.Login.loading,
      isUserLogout: state.Login.isUserLogout,
    })
  );
  const onLogin = () => {
    dispatch(loginUser({ name: 'hey' }));
  };
  return (
    <div>
      <div>{isUserLogin && 'isuserlogin'} {error && 'error'} {loginLoading && 'loginloading'} {isUserLogout && 'isuserlogout'}</div>
      <div>Home</div>
      <button onClick={() => onLogin()}>Login</button>
    </div>
  );
};

export default Home;
