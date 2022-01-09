import axios from "axios";
import refreshHeader from "./refresh-header";

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

  async resendOtp(username){
    return await axios
    .post(API_URL+"signup/resend",{
      username
    })
  }

  async forgot(username){
    return await axios
    .post(API_URL+"signup/forgot",{
      username
    })
  }
  async refresh(){
    return await axios
    .request({
      method: 'POST',
      url: API_URL+"refreshToken",
      headers: refreshHeader(),
    
    })
  }
  // axios
  //   .post(API_URL+"refreshToken",{
  //     headers: {
  //       'refresh_token':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaXZlbGVnMzA3QHd1c2VoZS5jb20iLCJleHAiOjE2NDIzNDE3NDgsImlhdCI6MTY0MTczNjk0OH0.SfxYKQH9-jSw2uwi54noxarXoR6JFP9DjRvY3rVg5gBVjhtl0gpEE-23pWeY-NdcTiP7thKwZaubxZ5Nz5aZ0Q',
  //     }
  //   });
}

export default new AuthService();