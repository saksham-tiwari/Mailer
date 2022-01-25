export default function refreshHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

  
    if (user && user.access_token) {
      // For Spring Boot back-end
    //   console.log("here i am")
      return { "refresh-token": user.refresh_token };
  
      // for Node.js Express back-end
    //   return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }