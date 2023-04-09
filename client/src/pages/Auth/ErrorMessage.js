import { ExclamationTriangleFill as WarningIcon } from 'react-bootstrap-icons';

const ErrorMessage = (props) => {
  return (
    <>
      {props.message && (
        <p className='text-danger align-middle lh-lg'>
          <WarningIcon size={16} />{' '}
          <span className='d-inline-block align-middle'>{props.message}</span>
        </p>
      )}
    </>
  );
};

export default ErrorMessage;