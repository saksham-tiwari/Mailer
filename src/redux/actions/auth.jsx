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
    SET_MESSAGE,
  } from "./types";
  
import AuthService from "../../services/auth.service";

// export const logInUser = ()=>{
//     return{
//         type: "LogInUser"
//     }
// }

// export const signUserUp = ()=>{
//     return{
//         type: "SignUserUp"
//     }
// }

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password)
    .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: res.data },
        });
  
        return Promise.resolve();
    })
    .catch((error) => {
        var message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if(error.response.status === 401){
          message = "Incorrect Password. Try Again"
        } else if(error.response.status===404){
          message = "User Not Found. Pls Sign Up"
        }
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const register = (name, username) => (dispatch) => {
    return AuthService.register(name, username)
    .then((response) => {
        if(response.status===208){
          dispatch({
            type: OTP_SEND_FAIL
          })
          dispatch({
            type: SET_MESSAGE,
            payload:"USER ALREADY PRESENT"
          })
          return Promise.reject();
        }
        else{
          dispatch({
            type: OTP_SEND_SUCCESS,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          return Promise.resolve();

        }
        
  
      })
    .catch((error) => {
        var message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if(error.response.status===403){
          // message = "User already exist, pls verify.";
          dispatch(resendOtp(username))
          return Promise.resolve();
        }
  
        dispatch({
          type: OTP_SEND_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const verifyOtp = (username, userOtp)=>(dispatch)=>{
      return AuthService.verifyOtp(username, userOtp)
      .then((res)=>{
          dispatch({
              type: OTP_SUCCESS,
          });
          dispatch({
              type: SET_MESSAGE,
              payload: res.data.message
          });

          return Promise.resolve();
      })
      .catch((error)=>{
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: OTP_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
      });
  };

  export const createPassword = (username, password)=>(dispatch)=>{
      return AuthService.createPassword(username, password)
      .then((res)=>{
          dispatch({
              type: REGISTER_SUCCESS,
              payload: { user: res.data },
          });
          dispatch({
              type: SET_MESSAGE,
              payload: res.data.message
          });
          return Promise.resolve();
      })
      .catch((error)=>{
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: REGISTER_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
      })
  }

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };

  export const resendOtp = (email)=>(dispatch) =>{
    return AuthService.resendOtp(email)
    .then((res)=>{
      dispatch({
        type: OTP_SEND_SUCCESS,
      })
      dispatch({
        type: SET_MESSAGE,
        payload: res.data.message,
      })
      return Promise.resolve();
    })
    .catch((error)=>{
      const message =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
          type: OTP_SEND_FAIL,
      });

      dispatch({
          type: SET_MESSAGE,
          payload: message,
      });

      return Promise.reject();
    })
  }