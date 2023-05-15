import { FaHashtag as NoChannelIcon } from 'react-icons/fa';

const NoChannels = (props) => {
  return (
    <div
      className='w-full h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center mx-auto'
      style={{ maxWidth: '500px' }}
    >
      <div className='mb-4'>
        <NoChannelIcon size={60} />
      </div>
      <h4>You have no channels</h4>
      <p className='text-muted'>
        Find channels by clicking the discover new channels button in the channels tab.
      </p>
    </div>
  );
};

export default NoChannels;
