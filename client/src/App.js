import { useEffect } from 'react';
import Routes from './routes';
import authApi from './api/authApi';
import { setUser } from './redux/profile/actions';
import { useRedux } from './hooks';
import { openNewSocket } from './redux/socket/actions';

const App = () => {
  const { dispatch } = useRedux();

  // fetch session user from server on app load
  useEffect(() => {
    try {
      authApi.getSessionUser().then((user) => {
        dispatch(openNewSocket());
        dispatch(setUser(user));
      });
    } catch (error) {}
  }, []);

  return <Routes />;
};

export default App;
