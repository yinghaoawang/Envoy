import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';
import FormInput from '../../../components/FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRedux } from '../../../hooks';
import {
  displayNamePattern,
  emailPattern,
  filterObject,
  passwordPattern
} from '../../../utils';
import { updateUser } from '../../../redux/profile/actions';

const schema = yup
  .object({
    displayName: yup
      .string()
      .notRequired()
      .matches(displayNamePattern, {
        message: 'Display name must be valid',
        excludeEmptyString: true
      })
      .label('Display name'),
    email: yup
      .string()
      .notRequired()
      .matches(emailPattern, {
        message: 'Email must be a valid email',
        excludeEmptyString: true
      })
      .label('Email'),
    password: yup
      .string()
      .notRequired()
      .matches(passwordPattern, {
        message: 'Password must be a valid password',
        excludeEmptyString: true
      })
      .label('Password')
  })
  .required();

const EditProfileForm = () => {
  const { dispatch, useAppSelector } = useRedux();

  const {
    isLoading,
    profileError,
    user: { email, displayName }
  } = useAppSelector((state) => ({
    isLoading: state.Profile.loading,
    profileError: state.Profile.error,
    user: state.Profile.user
  }));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
      displayName
    }
  });

  const onSubmit = (data) => {
    if (isLoading) return;
    const nonEmptyData = filterObject(data, (d) => d !== '' && d != null);
    if (Object.keys(nonEmptyData).length === 0) return;
    dispatch(updateUser(nonEmptyData));
  };

  return (
    <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
      <h3 className='mb-3'>Personal info</h3>
      <div className='mb-1'>
        <FormInput
          label='Display name'
          name='displayName'
          register={register}
        />
        <ErrorMessage message={errors.displayName?.message} />
      </div>
      <div className='mb-1'>
        <FormInput label='Email address' name='email' register={register} />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div className='mb-3'>
        <FormInput
          label='Password'
          name='password'
          placeholder='*******'
          type='password'
          register={register}
        />
        <ErrorMessage message={errors.password?.message} />
      </div>
      <div className='mb-1'>
        <button disabled={isLoading} className='btn btn-primary' type='submit'>
          Save Changes
        </button>
      </div>
      <ErrorMessage message={profileError} />
    </form>
  );
};

const EditProfile = (props) => {
  return (
    <div className='py-4 mx-4 '>
      <div
        className='w-100 align-items-center mx-auto'
        style={{ maxWidth: 1000 }}
      >
        <h1>Edit Profile</h1>
        <hr />
        <div className='row gx-5'>
          <div className='col-md-3'>
            <div className='text-center'>
              <img
                src='//placehold.it/150'
                className='avatar img-circle mb-3'
                alt='avatar'
              />
              <h6 className='mb-3'>Upload a different photo...</h6>

              <input type='file' className='form-control' />
            </div>
          </div>
          <div className='col-md-9 personal-info'>
            <EditProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
