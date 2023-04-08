import { combineReducers } from 'redux';

import Login from './auth/login/reducer';
import Register from './auth/register/reducer';
import Layout from './layout/reducers';

export default combineReducers({
  Login,
  Register,
  Layout
});