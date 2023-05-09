import { FaRegSadTear as CryingIcon } from 'react-icons/fa';

const NoFriends = (props) => {
  return (
    <div
      className='w-full h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center mx-auto'
      style={{ maxWidth: '500px' }}
    >
      <div className='mb-4'>
        <CryingIcon size={60} />
      </div>
      <h4>You have no friends</h4>
      <p className='text-muted'>
        Find friends by joining public servers and adding people, or use the friend finder tool in the people sidebar.
      </p>
    </div>
  );
};

export default NoFriends;
