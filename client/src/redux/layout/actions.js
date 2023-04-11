import { LayoutActionTypes } from './types';

export const switchTab = (data) => ({
  type: LayoutActionTypes.SWITCH_TAB,
  payload: { data }
});