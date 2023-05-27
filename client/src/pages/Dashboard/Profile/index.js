import { useEffect, useState } from 'react';
import directMessageApi from '../../../api/directMessageApi';
import { tabs } from '../../../data';
import { useProfile, useRedux } from '../../../hooks';
import { switchContent, switchTab } from '../../../redux/layout/actions';
import EditProfile from './EditProfile';
import { toast } from 'react-toastify';
import { followUser, unFollowUser } from '../../../redux/socket/actions';
import { resetProfileRestState } from '../../../redux/profile/actions';
import followApi from '../../../api/followApi';

const IsUserButtons = () => {
  const { dispatch } = useRedux();
  const onClickEditProfile = () => {
    const editProfileContent = {
      component: EditProfile
    };
    dispatch(switchContent(editProfileContent));
  };

  return (
    <a onClick={onClickEditProfile} className='btn btn-outline-light' href='#!'>
      Edit Profile
    </a>
  );
};

const IsNotUserButtons = (props) => {
  const { dispatch } = useRedux();
  const { useAppSelector } = useRedux();
  const { userProfile } = useProfile();
  const { error, success } = useAppSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success
  }));

  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getUserFollows = async () => {
      const { followers, following } = await followApi.getUserFollows(
        otherUser.id
      );
      for (const follower of followers) {
        if (follower.followerUserId === userProfile.id) {
          setIsFollowing(true);
          break;
        }
      }
      setIsLoading(false);
    };
    getUserFollows();
  }, []);

  useEffect(() => {
    switch (error?.code) {
      case 1:
        toast.error(error.message);
        break;
      case 123:
        toast.error('You are already following ' + otherUser.displayName);
        setIsFollowing(true);
        break;
      case 124:
        toast.error('You are already not following ' + otherUser.displayName);
        setIsFollowing(false);
        break;
      default:
        if (error?.code != null) {
          console.warn('Unknown error code ' + error?.code);
        }
    }
    setIsLoading(false);
  }, [error]);

  useEffect(() => {
    switch (success?.code) {
      case 0:
        toast.info(success.message);
        break;
      case 123:
        toast.info('You followed ' + otherUser.displayName);
        setIsFollowing(true);
        break;
      case 124:
        toast.info('You unfollowed ' + otherUser.displayName);
        setIsFollowing(false);
        break;
      default:
        if (success?.code != null) {
          console.warn('Unknown success code ' + success?.code);
        }
    }
    setIsLoading(false);
  }, [success]);

  const { otherUser } = props;

  const onFollowUserClick = () => {
    if (isFollowing) {
      dispatch(unFollowUser(otherUser));
    } else {
      dispatch(followUser(otherUser));
    }
    setIsLoading(true);
  };

  const onSendMessageClick = async () => {
    const dmData = {
      toUser: otherUser
    };
    try {
      await directMessageApi.createSendMessage(dmData);
      const messagesTab = tabs.find((t) => t.title === 'Messages');
      dispatch(switchTab(messagesTab));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <button
        onClick={onFollowUserClick}
        disabled={isLoading}
        className={`btn ${isFollowing ? 'btn-danger' : 'btn-success'}`}
        href='#!'
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      <a onClick={onSendMessageClick} className='btn btn-primary' href='#!'>
        Send Message
      </a>
    </>
  );
};

const Profile = (props) => {
  const { userProfile } = useProfile();
  const { dispatch } = useRedux();
  const user = props.user || userProfile;

  useEffect(() => {
    return () => {
      dispatch(resetProfileRestState());
    };
  }, []);

  return (
    <div className='px-5 py-5'>
      <div className='row d-flex justify-content-center align-items-center h-100'>
        <div className='col col-lg-9 col-xl-7 w-100'>
          <div
            className='card mx-auto'
            style={{
              maxWidth: 800
            }}
          >
            <div
              className='rounded-top text-white d-flex flex-row'
              style={{
                backgroundColor: '#000',
                height: '220px'
              }}
            >
              <div className='ms-4 mt-5 d-flex flex-column'>
                <div
                  style={{
                    objectFit: 'cover',
                    width: '150px',
                    height: '150px'
                  }}
                >
                  <img
                    src={
                      user?.profileImgUrl ||
                      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
                    }
                    alt='avatar'
                    className='img-fluid img-thumbnail h-100 w-100 avatar'
                  />
                </div>
              </div>
              <div className='ms-3 mt-auto d-flex flex-column'>
                <h5>{user?.displayName || 'Unknown'}</h5>
                <p>{user?.status}</p>
              </div>
              <div className='d-flex flex-column gap-2 ms-auto mt-auto mb-3 me-4'>
                {user.id === userProfile.id ? (
                  <IsUserButtons />
                ) : (
                  <IsNotUserButtons otherUser={user} />
                )}
              </div>
            </div>
            <div
              className='p-4 d-flex flex-column text-black'
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <div className='d-flex justify-content-between'>
                <div className='d-flex w-100'>
                  <div className='mb-5'>
                    <p className='lead fw-normal mb-1'>About</p>
                    <div className='p-2' style={{ backgroundColor: '#f8f9fa' }}>
                      {user?.biography || 'This user has nothing to say.'}
                    </div>
                  </div>
                </div>
                <div className='d-flex gap-3 text-center'>
                  <div>
                    <p className='h5 mb-1'>253</p>
                    <p className='small text-muted mb-0'>Photos</p>
                  </div>
                  <div>
                    <p className='h5 mb-1'>1026</p>
                    <p className='small text-muted mb-0'>Followers</p>
                  </div>
                  <div>
                    <p className='h5 mb-1'>1026</p>
                    <p className='small text-muted mb-0'>Following</p>
                  </div>
                  <div>
                    <p className='h5 mb-1'>{user?.channels?.length || 0}</p>
                    <p className='small text-muted mb-0'>Channels</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>Featured photos</p>
                  <p className='mb-0'>
                    <a
                      href='#!'
                      className='text-muted text-decoration-underline'
                    >
                      Show all
                    </a>
                  </p>
                </div>
                <div className='row g-2'>
                  <div className='col mb-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp'
                      alt=''
                      className='w-100 rounded-3'
                    />
                  </div>
                  <div className='col mb-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp'
                      alt=''
                      className='w-100 rounded-3'
                    />
                  </div>
                </div>
                <div className='row g-2'>
                  <div className='col'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp'
                      alt=''
                      className='w-100 rounded-3'
                    />
                  </div>
                  <div className='col'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp'
                      alt=''
                      className='w-100 rounded-3'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
