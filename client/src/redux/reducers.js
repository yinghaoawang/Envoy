import { combineReducers } from 'redux';

import Auth from './auth/reducer';
import Layout from './layout/reducers';
import Profile from './profile/reducers';

export default combineReducers({
  Auth,
  Layout,
  Profile
});