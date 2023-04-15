import { LayoutActionTypes } from './types';

export const switchTab = (data) => ({
  type: LayoutActionTypes.SWITCH_TAB,
  payload: { data }
});

export const switchContent = (data) => ({
  type: LayoutActionTypes.SWITCH_CONTENT,
  payload: { data }
});

export const resetLayoutState = () => ({
  type: LayoutActionTypes.RESET_STATE
});
