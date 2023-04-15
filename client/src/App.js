import { useEffect } from 'react';
import Routes from './routes';
import authApi from './api/auth';
import { setUser } from './redux/profile/actions';
import { useRedux } from './hooks';

const App = () => {
  const { dispatch } = useRedux();

  // fetch session user from server on app load
  useEffect(() => {
    try {
      authApi.getSessionUser().then((user) => {
        dispatch(setUser(user));
      });
    } catch (error) {}
  }, []);

  return <Routes />;
};

export default App;
