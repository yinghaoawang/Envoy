import Profile from '.';
import { useProfile, useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import EditProfile from './EditProfile';
import { AiOutlineEdit as UserEditIcon } from 'react-icons/ai';
import { BsPerson as UserIcon } from 'react-icons/bs';

const ProfileLeftbar = (props) => {
  const { dispatch } = useRedux();
  const { userProfile } = useProfile();

  const onClickMyProfile = () => {
    const myProfileContent = {
      component: Profile
    };
    dispatch(switchContent(myProfileContent));
  };

  const onClickEditProfile = () => {
    const editProfileContent = {
      component: EditProfile
    };
    dispatch(switchContent(editProfileContent));
  };

  return (
    <div>
      <h2>Profile</h2>
      <ul className='list-unstyled mb-0'>
        <li>
          <a
            className='py-2 px-2 hover-dim  d-flex text-light align-items-center'
            onClick={onClickMyProfile}
            href='#!'
          >
            <UserIcon size={20} />
            <div className='ms-1'>My profile</div>
          </a>
        </li>
        <li>
          <a
            className='py-2 px-2 hover-dim  d-flex text-light align-items-center'
            onClick={onClickEditProfile}
            href='#!'
          >
            <UserEditIcon size={20} />
            <div className='ms-1'>Edit profile</div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileLeftbar;
