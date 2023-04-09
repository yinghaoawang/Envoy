import AuthWrapper from './AuthWrapper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRedux } from '../../hooks';
import { loginUser } from '../../redux/auth/login/actions';
import ErrorMessage from './ErrorMessage';
import FormInput from '../../components/FormInput';
import { emailPattern, passwordPattern } from '../../utils/patterns';

const schema = yup
  .object({
    email: yup.string().required().matches(emailPattern, 'Email must be a valid email').label('Email'),
    password: yup.string().required().matches(passwordPattern, 'Password must be a valid password').label('Password'),
  })
  .required();

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { dispatch, useAppSelector } = useRedux();
  const { isLoading, loginError } = useAppSelector((state) => ({
    isLoading: state.Login.loading,
    loginError: state.Login.error,
  }));

  const onSubmit = (data) => {
    if (isLoading) return;
    dispatch(loginUser(data));
  };

  return (
    <AuthWrapper>
      <div className='card-body p-5'>
        <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='fw-bold mb-2'>Envoy</h2>
          <div className='mb-3'>
            <FormInput label='Email address' name='email' placeholder='name@example.com' register={register} />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className='mb-3'>
            <FormInput label='Password' name='password' placeholder='*******' type='password' register={register} />
            <ErrorMessage message={errors.password?.message} />
          </div>
          <p className='small'>
            <a className='text-primary' href='forget-password.html'>
              Forgot password?
            </a>
          </p>
          <div className='d-grid'>
            <button
              disabled={isLoading}
              className='btn btn-primary'
              type='submit'
            >
              Login
            </button>
          </div>
          <ErrorMessage message={loginError} />
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
