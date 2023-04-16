import Profile from '.';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import EditProfile from './EditProfile';

const ProfileLeftbar = (props) => {
  const { dispatch } = useRedux();

  const onClickMyProfile = () => {
    const myProfileContent = {
      component: Profile
    }
    dispatch(switchContent(myProfileContent));
  };

  const onClickEditProfile = () => {
    const editProfileContent = {
      component: EditProfile
    };
    dispatch(switchContent(editProfileContent));
  };

  return (
    <div className='d-flex flex-column'>
      <a onClick={onClickMyProfile} href='#!'>
        My profile
      </a>
      <a onClick={onClickEditProfile} href='#!'>
        Edit profile
      </a>
    </div>
  );
};

export default ProfileLeftbar;
