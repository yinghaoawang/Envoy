import { useRedux } from './useRedux';

const useProfile = () => {
  const {  useAppSelector } = useRedux();

  const { userProfile } = useAppSelector((state) => ({
    userProfile: state.Profile.user
  }));
  
  return { userProfile };
};

export { useProfile };
