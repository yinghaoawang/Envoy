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
    biography: yup.string().notRequired().max(256).label('Biography'),
    status: yup.string().notRequired().max(40).label('Status'),
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
    user: { email, displayName, status, biography }
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
      displayName,
      status,
      biography
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
      <div className='mb-1'>
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
        <FormInput label='Status' name='status' register={register} />
        <ErrorMessage message={errors.status?.message} />
      </div>
      <div className='mb-1'>
        <FormInput
          type='textarea'
          rows='3'
          label='Biography'
          name='biography'
          register={register}
        />
        <ErrorMessage message={errors.biography?.message} />
      </div>
      <div className='my-3'>
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
          <div className='col-md-4'>
            <div className='text-center'>
              <img
                src='//placehold.it/150'
                className='avatar img-circle mb-3'
                alt='avatar'
              />
              <h6 className='mb-3 mx-auto'>Update profile picture</h6>

              <input
                style={{ maxWidth: '150px' }}
                type='file'
                className='form-control mx-auto'
              />
            </div>
          </div>
          <div className='col-md-8 personal-info'>
            <EditProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
