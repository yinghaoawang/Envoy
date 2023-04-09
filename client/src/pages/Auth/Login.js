import AuthWrapper from './AuthWrapper';

const Login = (props) => {
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
          <p className='small'>
            <a className='text-primary' href='forget-password.html'>
              Forgot password?
            </a>
          </p>
          <div className='d-grid'>
            <button className='btn btn-primary' type='submit'>
              Login
            </button>
          </div>
        </form>
        <div>
          <p className='mb-0 text-center'>
            Don't have an account?{' '}
            <a href='/signup' className='text-primary fw-bold'>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
