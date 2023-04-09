import React from 'react';
import { Navigate } from 'react-router-dom';

import { useProfile } from '../hooks/index';

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();

  if (!userProfile && loading) {
    return (
      <Navigate to={{ pathname: '/login'}} />
    );
  }

  return <>{props.children}</>;
};

export { AuthProtected };
