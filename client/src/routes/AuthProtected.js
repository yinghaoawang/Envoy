import React from 'react';
import { Navigate } from 'react-router-dom';

import { useProfile } from '../hooks/index';

const AuthProtected = (props) => {
  const { userProfile } = useProfile();

  if (!userProfile) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return <>{props.children}</>;
};

export { AuthProtected };
