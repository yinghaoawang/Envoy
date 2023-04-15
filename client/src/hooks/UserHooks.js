import { useEffect, useState } from 'react';
import { useRedux } from './useRedux';
import authHelper from '../helpers/authHelper';
import { setUser } from '../redux/profile/actions';

const useProfile = () => {
  const { dispatch, useAppSelector } = useRedux();

  const { userProfile } = useAppSelector((state) => ({
    userProfile: state.Profile.user
  }));
  const [loading, setLoading] = useState(userProfile ? false : true);

  useEffect(() => {
    try {
      authHelper.getSessionUser().then((user) => {
        dispatch(setUser(user));
        setLoading(false);
      });
    } catch (error) {}
  }, []);

  return { userProfile, loading };
};

export { useProfile };
