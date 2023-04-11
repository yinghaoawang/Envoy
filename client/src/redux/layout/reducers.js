import { LayoutActionTypes } from './types';

const INIT_STATE = {
  activeTab: null,
}
const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload.data
      }
    default:
      return { ...state };
  }
}

export default Layout;