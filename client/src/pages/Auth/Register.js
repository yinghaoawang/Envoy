import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import AuthWrapper from './AuthWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRedux } from '../../hooks';
import { registerUser } from '../../redux/auth/register/actions';
import { emailPattern, passwordPattern } from '../../utils/patterns';
import ErrorMessage from '../../components/ErrorMessage';

const schema = yup
  .object({
    email: yup.string().required().matches(emailPattern, 'Email must be a valid email').label('Email'),
    password: yup.string().required().matches(passwordPattern, 'Password must be a valid password').label('Password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required()
      .label('Confirm password')
  })
  .required();

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { dispatch, useAppSelector } = useRedux();

  const { isLoading, registerError } = useAppSelector((state) => ({
    isLoading: state.Register.loading,
    registerError: state.Register.error
  }));

  const onSubmit = (data) => {
    if (isLoading) return;
    dispatch(registerUser(data));
  };

  return (
    <AuthWrapper>
      <div className='card-body p-5'>
        <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='fw-bold mb-3'>Sign up</h2>
          <div className='mb-3'>
            <FormInput
              label='Email'
              name='email'
              placeholder='name@example.com'
              register={register}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className='mb-3'>
            <FormInput
              label='Password'
              name='password'
              type='password'
              placeholder='*******'
              register={register}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
          <div className='mb-3'>
            <FormInput
              label='Confirm password'
              name='confirmPassword'
              type='password'
              placeholder='*******'
              register={register}
            />
            <ErrorMessage message={errors.confirmPassword?.message} />
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary' type='submit'>
              Sign Up
            </button>
          </div>
          <ErrorMessage message={registerError} />
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
