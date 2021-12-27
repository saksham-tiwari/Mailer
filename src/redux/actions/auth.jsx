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
    SET_EMAIL,
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
  
        return Promise.resolve({code:res.status});
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
        } else if(error.response.status===403){
          // message = "User already exist, pls verify.";
          dispatch(resendOtp(username))
          dispatch({
            type: SET_EMAIL,
            payload: username,
          })
          dispatch({
            type: SET_MESSAGE,
            payload: "Verify needed",
          });
          // return Promise.resolve();
        return Promise.reject({code:403});

        }
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject({code:error.response.status});
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
          return Promise.reject({code:response.status});
        }
        else{
          dispatch({
            type: OTP_SEND_SUCCESS,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          return Promise.resolve({code:response.status});

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
          return Promise.resolve({code:error.response.status});
        }
  
        dispatch({
          type: OTP_SEND_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject({code:error.response.status});
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

          return Promise.resolve({code:res.status});
      })
      .catch((error)=>{
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        if(error.response.status===401){
          dispatch({
            type: OTP_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: "Incorrect OTP",
          });
          return Promise.reject({code:error.response.status})
        }
        dispatch({
            type: OTP_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject({code:error.response.status});
      });
  };

  export const createPassword = (username, password)=>async (dispatch)=>{
      try {
      const res = await AuthService.createPassword(username, password);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res.data },
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.data.message
      });
      return await Promise.resolve({code:res.status});
    } catch (error) {
      const message = (error.response &&
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
      return await Promise.reject({code:error.response.status});
    }
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
      return Promise.resolve({code:res.status});
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

      return Promise.reject({code:error.response.status});
    })
  }

  export const forgot = (email)=>(dispatch)=>{
    return AuthService.forgot(email)
    .then((res)=>{
      dispatch({
        type:OTP_SEND_SUCCESS,
      })
      dispatch({
        type: SET_MESSAGE,
        payload: res.data.message,
      })
      return Promise.resolve({code:res.status});
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

      return Promise.reject({code:error.response.status});
    })
  }