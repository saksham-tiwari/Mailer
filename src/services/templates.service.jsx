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
    async getTemplates(){
        return await axios
        .get(BaseUrl()+"mail/get/templates",
        {
            headers: authHeader()
        });
    }
    async sendMailWithTemplate(from,subject,attachment,logo,templateId,groupId){
        return await axios
        .post(BaseUrl()+"mail/sendWithName",{
            from,subject,attachment,logo,templateId,groupId
        },
        {
            headers: authHeader()
        }
        )
    }
    async deleteTemplate(id){
        return await axios
        .delete(BaseUrl()+"mail/deleteTemplate/"+id,{
            headers: authHeader()
        })
    }
}

export default new TemplatesService();