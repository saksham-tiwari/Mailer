import axios from "axios";
import refreshHeader from "./refresh-header";
import { BaseUrl } from './BaseUrl';
import authHeader from "./auth-header";



class AuthService {
  async login(username, password) {
    return await axios
      .post(BaseUrl() + "authenticate", { username, password })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("info")
  }

  async register(name, username) {
    return await axios
    .post(BaseUrl() + "signup/register", {
      name,
      username
    });
  }

  async verifyOtp(username, userOtp){
      return await axios
      .post(BaseUrl()+"signup/verifyOtp",{
          username,
          userOtp
      });
  }
  
  async createPassword(username, password){
      return await axios
      .post(BaseUrl()+"signup/setPassword",{
          username,
          password
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  async resendOtp(username){
    return await axios
    .post(BaseUrl()+"signup/resend",{
      username
    })
  }

  async forgot(username){
    return await axios
    .post(BaseUrl()+"signup/forgot",{
      username
    })
  }
  async refresh(){
    return await axios
    .request({
      method: 'POST',
      url: BaseUrl()+"refreshToken",
      headers: refreshHeader(),
    
    })
  }
  async getUserInfo(){
    return await axios
    .get(BaseUrl()+"getUser",{
      headers:authHeader()
    })
    .then((response) => {
      if (response.data.name) {
        localStorage.setItem("info", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch(err=>{
      console.log(err);
    })
  }

  async oneTap(token){
    return await axios
    .post(BaseUrl()+"signup/google/",{token})
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }
  // axios
  //   .post(BaseUrl()+"refreshToken",{
  //     headers: {
  //       'refresh_token':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaXZlbGVnMzA3QHd1c2VoZS5jb20iLCJleHAiOjE2NDIzNDE3NDgsImlhdCI6MTY0MTczNjk0OH0.SfxYKQH9-jSw2uwi54noxarXoR6JFP9DjRvY3rVg5gBVjhtl0gpEE-23pWeY-NdcTiP7thKwZaubxZ5Nz5aZ0Q',
  //     }
  //   });
}
 
export default new AuthService();