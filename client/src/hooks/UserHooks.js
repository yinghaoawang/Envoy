import { useEffect, useState } from 'react';
import { useRedux } from './useRedux';
import authHelper from '../helpers/authHelper';

const useProfile = () => {
  // global store
  const { useAppSelector } = useRedux();

  // const { settings } = useAppSelector(state => ({
  //   settings: state.Settings.settings,
  // }));
  // const image = settings.basicDetails && settings.basicDetails.profile;
  // const image = {};
  // const userProfileSession = authHelper.getLoggedInUser();
  // const [loading] = useState(userProfileSession ? false : true);
  // const [userProfile, setUserProfile] = useState(
  //   userProfileSession ? { ...userProfileSession, profileImage: image } : null
  // );
  // useEffect(() => {
  //   const userProfileSession = firebaseHelper.getLoggedInUser();
  //   setUserProfile(
  //     userProfileSession ? { ...userProfileSession, profileImage: image } : null
  //   );
  // }, []);

  return { userProfile: null, loading: false };
};

export { useProfile };