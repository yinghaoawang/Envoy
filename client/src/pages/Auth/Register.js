import AuthWrapper from './AuthWrapper';

const Register = (props) => {
  return (
    <AuthWrapper>
      <div className='card-body p-5'>
        <form className='mb-3'>
          <h2 className='fw-bold mb-2'>Envoy</h2>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label '>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='name@example.com'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label '>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='*******'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirm-password' className='form-label '>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              id='confirm-password'
              placeholder='*******'
            />
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary' type='submit'>
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <p className='mb-0 text-center'>
            Already have an account?{' '}
            <a href='/login' className='text-primary fw-bold'>
              Log In
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Register;
