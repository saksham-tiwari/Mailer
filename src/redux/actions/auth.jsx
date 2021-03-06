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
    REFRESH_SUCCESS,
    SET_USER,
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
        AuthService.getUserInfo()
        .then(()=>{
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res },
          });
        })
        
  
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

  export const createPassword = (username, password)=>(dispatch)=>{
       return AuthService.createPassword(username, password)
      .then((res)=>{
        AuthService.getUserInfo()
        .then(()=>{
          dispatch({
            type: REGISTER_SUCCESS,
            payload: { user: res },
          });
        })
        
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: res.data.message
        // });
        return Promise.resolve({res});
      })
      .catch( (error)=> {
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
      return Promise.reject({code:error.response.status});
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

      if(error.response.status===404){
        dispatch({
          type: SET_MESSAGE,
          payload: "Account does not exist, redirecting to signup.",
      });
      return Promise.reject({code:error.response.status})
      }
      else{
        dispatch({
          type: OTP_SEND_FAIL,
      });

      dispatch({
          type: SET_MESSAGE,
          payload: message,
      });

      return Promise.reject({code:error.response.status});
      }
      
    })

  }
  export const refresh = ()=>(dispatch)=>{
    return AuthService.refresh()
    .then((res)=>{
      var user = JSON.parse(localStorage.getItem("user"));
      var payload=user;
      if(res.status===200){
        payload= {
          access_token:res.data.access_token,
          refresh_token:user.refresh_token
        }
        localStorage.setItem("user",JSON.stringify(payload))
        dispatch({
          type:REFRESH_SUCCESS,
          payload
        })
        return Promise.resolve();
      }
      
    })
    .catch((err)=>{
      // console.log(err.message)
      console.log("LOGGED OUT DUE TO REFRESH TOKEN FAILURE");
      dispatch({
        type:LOGOUT
      })
      return Promise.reject({msg:"Refresh Fail"})
    })
  }

  export const getUserInfo = ()=>(dispatch)=>{
    return AuthService.getUserInfo()
    .then(res=>{
      console.log("called");
      console.log(res);
      return Promise.resolve();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  export const oneTap = (token)=>(dispatch)=>{
    return AuthService.oneTap(token)
    .then(res=>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res },
      });
      localStorage.setItem("one-tap",true)
      AuthService.getUserInfo()
      .then(()=>{
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: res },
        });
      })
      return Promise.resolve();
    })
    .catch(err=>{
      if(err.response.status===401){
        dispatch({
          type: SET_MESSAGE,
          payload: "Not verified, try again!",
        }) 
        return Promise.reject({code:401,msg:err.response.message})
      }
      else if(err.response.status===403){
        dispatch({
          type: SET_MESSAGE,
          payload: "Authentication error, try again later.",
        });
        return Promise.reject({code:403,msg:err.response.message})
      }
      else{
        return Promise.reject({code:err.response.status,msg:err.response.message})
        
      }

    })
  }

  export const changePassword = (oldPassword,newPassword)=>dispatch=>{
    return AuthService.changePassword(oldPassword,newPassword)
    .then(()=>{

    })
    .catch(()=>{
      
    })
  }