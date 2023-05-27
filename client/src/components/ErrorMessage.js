import { BsExclamationTriangleFill as WarningIcon } from 'react-icons/bs';

const ErrorMessage = (props) => {
  return (
    <>
      {props.message && (
        <p className='text-danger align-middle lh-lg'>
          <WarningIcon size={16} />{' '}
          <span className='d-inline-block align-middle'>{props.message?.message || props.message}</span>
        </p>
      )}
    </>
  );
};

export default ErrorMessage;