import MailsService from "../../services/mails.service";
import { MAIL_SENT } from "./types";

export const sendMail = (groupId,subject,body,attachment)=>(dispatch)=>{
    return MailsService.sendMail(groupId,subject,body,attachment)
    .then(res=>{
        dispatch({
            type: MAIL_SENT,
            payload: {groupId,subject,body,attachment}
        })
        return Promise.resolve({code:res.status})
    })
    .catch(err=>{
        if(err.response.status===404){
            return Promise.reject({code:404,msg:"Group Not Found"})
        } else if(err.response.status===406){
            return Promise.reject({code:406,msg:"Mail not sent! Try again later."})
        } else if(err.response.status===410){
            return Promise.reject({refresh:"required"});
        } else {
            console.log(err.response);
        }
    })
}