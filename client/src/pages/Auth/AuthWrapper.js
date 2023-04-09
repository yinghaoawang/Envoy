import { Navigate, useNavigate } from 'react-router-dom';
import { useProfile, useRedux } from '../../hooks';
import { useEffect } from 'react';
import { resetLoginState } from '../../redux/auth/login/actions';
import { resetRegisterState } from '../../redux/auth/register/actions';

const AuthWrapper = (props) => {
  const navigate = useNavigate();
  const { dispatch, useAppSelector } = useRedux();

  const { isUserLoggedIn, isUserRegistered } = useAppSelector((state) => ({
    isUserLoggedIn: state.Login.isUserLoggedIn,
    isUserRegistered: state.Register.isUserRegistered
  }));

  useEffect(() => {
    dispatch(resetLoginState());
    dispatch(resetRegisterState());
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) navigate('/dashboard');
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (isUserRegistered) navigate('/dashboard');
  }, [isUserRegistered]);

  const { userProfile } = useProfile();
  if (userProfile) {
    return (
      <Navigate to={{ pathname: '/'}} />
    );
  }

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center bg-gray-300'>
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6'>
            <div className='card bg-gray-800 text-white'>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
