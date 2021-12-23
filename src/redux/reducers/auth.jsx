import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    OTP_SEND_SUCCESS,
    OTP_SEND_FAIL,
    OTP_SUCCESS,
    OTP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

    const auth_reducer = (state = initialState, action)=> {
        const { type, payload } = action;
      
        switch (type) {
          case REGISTER_SUCCESS:
            return {
              ...state,
              isLoggedIn: true,
              user: payload.user,
            };
          case REGISTER_FAIL:
            return {
              ...state,
              isLoggedIn: false,
              user: null,
            };
          case LOGIN_SUCCESS:
            return {
              ...state,
              isLoggedIn: true,
              user: payload.user,
            };
          case LOGIN_FAIL:
            return {
              ...state,
              isLoggedIn: false,
              user: null,
            };
          case LOGOUT:
            return {
              ...state,
              isLoggedIn: false,
              user: null,
            };
          case OTP_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
        };

          case OTP_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };

          case OTP_SEND_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };

          case OTP_SEND_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        
          
          default:
            return state;
        }
    }

export default auth_reducer;