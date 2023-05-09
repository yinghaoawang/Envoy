import { BiMessageAltDetail as MessageIcon } from 'react-icons/bi';

const Welcome = (props) => {
  return (
    <div
      className='w-full h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center mx-auto'
      style={{ maxWidth: '500px' }}
    >
      <div className='mb-4 bg-soft-primary rounded-circle'>
        <MessageIcon size={80} />
      </div>
      <h4>Welcome to Envoy</h4>
      <p className='text-muted'>
        We are a social networking platform with with focus on realtime
        messaging, calling, and communication.
      </p>
    </div>
  );
};

export default Welcome;
