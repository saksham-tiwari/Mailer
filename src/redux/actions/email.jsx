import { SET_EMAIL } from './types'

export const setEmail = (mail) => ({
    type: SET_EMAIL,
    payload: mail,
  });