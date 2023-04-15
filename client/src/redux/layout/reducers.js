import { LayoutActionTypes } from './types';

const INIT_STATE = {
  activeTab: null,
  activeContent: null,
  error: null
};
const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload.data
      };
    case LayoutActionTypes.SWITCH_CONTENT:
      return {
        ...state,
        activeContent: action.payload.data
      };
    case LayoutActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      }
    default:
      return { ...state };
  }
};

export default Layout;
