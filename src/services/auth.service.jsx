import axios from "axios";

const API_URL = "https://bulk-mailer-app.herokuapp.com/";

class AuthService {
  async login(username, password) {
    return await axios
      .post(API_URL + "authenticate", { username, password })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
    //   .catch((err)=>{
    //       if(err.response.status === 401){
    //           return("Incorrect Password");
    //       } else if(err.response.status===404){
    //           return("User not found");
    //       } else{
    //           return(err);
    //       }
    //   });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(name, username) {
    return await axios
    .post(API_URL + "signup/register", {
      name,
      username
    });
  }

  async verifyOtp(username, userOtp){
      return await axios
      .post(API_URL+"signup/verifyOtp",{
          username,
          userOtp
      });
  }
  
  async createPassword(username, password){
      return await axios
      .post(API_URL+"signup/setPassword",{
          username,
          password
      });
  }
}

export default new AuthService();