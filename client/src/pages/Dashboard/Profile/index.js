import { useProfile, useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import EditProfile from './EditProfile';

const Profile = (props) => {
  const { userProfile } = useProfile();
  const { dispatch } = useRedux();

  const onClickEditProfile = () => {
    const editProfileContent = {
      component: EditProfile
    };
    dispatch(switchContent(editProfileContent));
  };

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
                      userProfile?.profileImgUrl ||
                      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
                    }
                    alt='avatar'
                    className='img-fluid img-thumbnail h-100 w-100 object-fit-cover'
                    style={{
                      backgroundColor: '#121212'
                    }}
                  />
                </div>
              </div>
              <div className='ms-3' style={{ marginTop: '130px' }}>
                <h5>{userProfile?.displayName || 'Unknown'}</h5>
                <p>{userProfile?.status}</p>
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
                      {userProfile?.biography ||
                        'This user has nothing to say.'}
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <div>
                    <p className='mb-1 h5'>253</p>
                    <p className='small text-muted mb-0'>Photos</p>
                  </div>
                  <div className='px-3'>
                    <p className='mb-1 h5'>1026</p>
                    <p className='small text-muted mb-0'>Followers</p>
                  </div>
                  <div>
                    <p className='mb-1 h5'>478</p>
                    <p className='small text-muted mb-0'>Following</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>Featured photos</p>
                  <p className='mb-0'>
                    <a href='#!' className='text-muted'>
                      Show all
                    </a>
                  </p>
                </div>
                <div className='row g-2'>
                  <div className='col mb-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp'
                      alt='image 1'
                      className='w-100 rounded-3'
                    />
                  </div>
                  <div className='col mb-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp'
                      alt='image 1'
                      className='w-100 rounded-3'
                    />
                  </div>
                </div>
                <div className='row g-2'>
                  <div className='col'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp'
                      alt='image 1'
                      className='w-100 rounded-3'
                    />
                  </div>
                  <div className='col'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp'
                      alt='image 1'
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
