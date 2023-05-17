import { BsCheck as AcceptIcon, BsX as RejectIcon } from 'react-icons/bs';

const friendRequests = [
  {
    user: {
      displayName: 'jojo',
      friends: [{}, {}, {}]
    }
  },
  {
    user: {
      displayName: 'jojo',
      friends: [{}, {}, {}]
    }
  },
  {
    user: {
      displayName: 'jojo',
      friends: [{}, {}, {}]
    }
  }
];

const FriendRequestItem = (props) => {
  const { friendRequest } = props;
  const { user } = friendRequest;

  const onClickAcceptRequest = () => {

  }

  const onClickRejectRequest = () => {

  }

  return (
    <div className='bg-gray-800 p-3'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <img
            src={
              user.profileImgUrl ||
              'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
            }
            className='rounded-circle avatar me-3'
            alt='avatar 3'
            style={{ width: '60px', height: '60px' }}
          />
          <div className='my-auto'>
            <div className='fw-bold'>{user.displayName}</div>
            <div className='text-muted'>{user.friends.length} friends</div>
          </div>
        </div>
        <div className='d-flex my-auto gap-2'>
          <button onClick={onClickAcceptRequest} className='btn btn-primary'><AcceptIcon size={24} /></button>
          <button onClick={onClickRejectRequest} className='btn btn-danger'><RejectIcon size={24} /></button>
        </div>
      </div>
    </div>
  );
};

const FriendRequests = (props) => {
  return (
    <div className='container p-4 text-white bg-gray-950'>
      <div className='mb-4'>
        <h1>Friend Requests</h1>
      </div>
      <div className='text-white d-flex flex-column gap-3'>
        {friendRequests.map((friendRequest, idx) => (
          <FriendRequestItem key={idx} friendRequest={friendRequest} />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
