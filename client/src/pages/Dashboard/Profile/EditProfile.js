import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';
import FormInput from '../../../components/FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProfile, useRedux } from '../../../hooks';
import {
  displayNamePattern,
  emailPattern,
  filterObject,
  passwordPattern
} from '../../../utils';
import { setUser, updateUser } from '../../../redux/profile/actions';
import { useState } from 'react';
import profileApi from '../../../api/profileApi';

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

const UploadProfileImageForm = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatusMessage, setUploadStatusMessage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const onFileChange = (event) => {
    try {
      const reader = new FileReader();
      reader.onload = function (event) {
        console.log(event.target.result);
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {
      setUploadError(error);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setUploadStatusMessage('Uploading...');
      const user = await profileApi.uploadProfileImage({ uploadData: uploadedImage });
      dispatch(setUser(user));
      setIsLoading(false);
      setUploadStatusMessage('Success');
    } catch (error) {
      setUploadError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className='px-4 py-4 bg-gray-700'>
      <div className='col-md-8 mx-auto'>
        <div className='mb-3 text-center'>
          <div
            className='mb-3 rounded-3'
            style={{
              width: '150px',
              height: '150px',
              backgroundImage: 'url("//placehold.it/150")'
            }}
          >
            <img
              src={uploadedImage}
              onLoad={() => {
                setUploadError(null);
              }}
              onError={() => {
                setUploadError({ message: 'Invalid file uploaded' });
              }}
              width='150px'
              height='150px'
              alt=''
              className='avatar rounded-3'
            />
          </div>
          <h6>Update profile picture</h6>
          <div className='col-md-8 mx-auto'>
            <label className='input-group-text text-center' htmlFor='inputFile'>
              <span className='w-100'>Select file</span>
              <input
                type='file'
                className='form-control d-none'
                id='inputFile'
                onChange={onFileChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div>{!uploadError && uploadStatusMessage}</div>
      <ErrorMessage message={uploadError?.message} />
      <button
        disabled={!uploadedImage || uploadError || isLoading}
        className='btn btn-primary mt-3'
        onClick={onSubmit}
      >
        Save Changes
      </button>
    </div>
  );
};

const EditProfile = (props) => {
  return (
    <div className='pt-4 mx-4 '>
      <div
        className='w-100 align-items-center mx-auto'
        style={{ maxWidth: 1000 }}
      >
        <h1>Edit Profile</h1>
        <hr className='py-2' />
        <div className='row gx-5'>
          <div className='col-md-4 mb-4'>
            <UploadProfileImageForm />
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
