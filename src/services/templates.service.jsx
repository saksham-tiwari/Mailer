import axios from "axios"
import { BaseUrl } from './BaseUrl';
import authHeader from "./auth-header"

class TemplatesService{
    async uploadTemplate(fd){
    const user = JSON.parse(localStorage.getItem("user"));

        return await axios
        .post(BaseUrl()+"mail/uploadTemplate",fd,
        {
            
            headers: { 
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + user.access_token
             }
        })
    }
}

export default new TemplatesService();