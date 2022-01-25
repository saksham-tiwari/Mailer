import MailsService from "../../services/mails.service";
import { ADD_ATTACHMENT, MAIL_SENT, PREV_MAILS } from "./types";

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

export const attachFile = (fd)=>(dispatch)=>{
    return MailsService.attachFile(fd)
    .then(res=>{
        console.log(res);
        return Promise.resolve({file:res.data})
    })
    .catch(err=>{
        if(err.response.status===400){
            return Promise.reject({code:400,msg:"Cannot upload file. Try again later!"})
        } else if(err.response.status===410){
            return Promise.reject({refresh:"required"});
        } else {
            console.log(err.response);
        }
    })
}

export const previousMails = ()=>(dispatch)=>{
    return MailsService.previousMails()
    .then(res=>{
        dispatch({
            type: PREV_MAILS,
            payload: res.data,
        })
        return Promise.resolve()
    })
    .catch(err=>{
        if(err.response.status===410){
            return Promise.reject({refresh:"required"});
        }
    })
}