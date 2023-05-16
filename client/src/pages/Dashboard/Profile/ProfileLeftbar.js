import Profile from '.';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import EditProfile from './EditProfile';
import { AiOutlineEdit as UserEditIcon } from 'react-icons/ai';
import { BsPerson as UserIcon, BsPeople as FriendRequestIcon } from 'react-icons/bs';
import { BsSearch as FindFriendsIcon } from 'react-icons/bs';
import FriendRequests from './FriendRequests';
import FindFriends from './FindFriends';

const ProfileLeftbar = (props) => {
  const { dispatch } = useRedux();

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

  const onClickFriendRequests = () => {
    const friendRequestContent = {
      component: FriendRequests
    };
    dispatch(switchContent(friendRequestContent));
  }

  const onClickFindFriend = () => {
    const findFriendContent = {
      component: FindFriends
    };
    dispatch(switchContent(findFriendContent));
  }

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
            <div className='ms-2'>My profile</div>
          </a>
        </li>
        <li>
          <a
            className='py-2 px-2 hover-dim  d-flex text-light align-items-center'
            onClick={onClickEditProfile}
            href='#!'
          >
            <UserEditIcon size={20} />
            <div className='ms-2'>Edit profile</div>
          </a>
        </li>
        <li>
          <a
            className='py-2 px-2 hover-dim  d-flex text-light align-items-center'
            onClick={onClickFriendRequests}
            href='#!'
          >
            <FriendRequestIcon size={20} />
            <div className='ms-2'>Friend requests</div>
          </a>
        </li>
        <li>
          <a
            className='py-2 px-2 hover-dim  d-flex text-light align-items-center'
            onClick={onClickFindFriend}
            href='#!'
          >
            <FindFriendsIcon size={20} />
            <div className='ms-2'>Find friends</div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileLeftbar;
