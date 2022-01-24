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
        return await axios
        .post(BaseUrl()+"upload/file/",{
            fd
        },
        {
            headers: authHeader()
        })
    }
}

export default new MailsService();
