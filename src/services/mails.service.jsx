import axios from "axios"
import { BaseUrl } from './BaseUrl';
import authHeader from "./auth-header"

class MailsService{
    async sendMail(groupId,subject,body,attachment){
        console.log(authHeader(),groupId,subject,body,attachment)
        return await axios
        .post(BaseUrl()+"mail/sendMail",{
            groupId,subject,body,attachment
        },{
            headers: authHeader()
        });

    }
    async attachFile(fd){
    const user = JSON.parse(localStorage.getItem("user"));

        return await axios
        .post(BaseUrl()+"mail/upload/",fd,
        {
            
            headers: { 
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + user.access_token
             }
        })

        // return await axios({
        //     method: "post",
        //     url: BaseUrl()+"mail/upload/",
        //     data: fd,
        //     headers: { 
        //         "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        //         Authorization: "Bearer " + user.access_token
        //      },
        //   })
    }
    async previousMails(){
        return await axios
        .get(BaseUrl()+"mail/get/previousMail",{headers:authHeader()});
    }
}

export default new MailsService();
