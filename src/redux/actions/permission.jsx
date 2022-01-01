import { SET_PERMISSION } from './types'

export const setPermission = (permission) => ({
    type: SET_PERMISSION,
    payload: permission,
  });