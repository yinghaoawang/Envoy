import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import AuthWrapper from './AuthWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRedux } from '../../hooks';
import { registerUser } from '../../redux/auth/actions';
import { displayNamePattern, emailPattern, passwordPattern } from '../../utils';
import ErrorMessage from '../../components/ErrorMessage';
import config from '../../config';

const schema = yup
  .object({
    displayName: yup
      .string()
      .required()
      .matches(displayNamePattern, 'Display name must be valid')
      .label('Display name'),
    email: yup
      .string()
      .required()
      .matches(emailPattern, 'Email must be a valid email')
      .label('Email'),
    password: yup
      .string()
      .required()
      .matches(passwordPattern, 'Password must be a valid password')
      .label('Password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required()
      .label('Confirm password')
  })
  .required();

const Register = (props) => {
  const { dispatch, useAppSelector } = useRedux();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { isLoading, registerError } = useAppSelector((state) => ({
    isLoading: state.Auth.loading,
    registerError: state.Auth.error
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
              label='Display name'
              name='displayName'
              placeholder='JohnDoe42'
              register={register}
            />
            <ErrorMessage message={errors.displayName?.message} />
          </div>
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
            <a
              href={config.BASENAME + '/login'}
              className='text-primary fw-bold'
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Register;
