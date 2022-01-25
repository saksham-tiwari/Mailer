import TemplatesService from "../../services/templates.service";
import { ADD_TEMPLATE, GET_TEMPLATES, MAIL_SENT } from "./types";

export const uploadTemplate = (fd)=>(dispatch)=>{
    return TemplatesService.uploadTemplate(fd)
    .then((res)=>{
        console.log(res);
        dispatch({
            type: ADD_TEMPLATE,
            payload:res.data.fileName,
        })
        
    })
    .catch((err)=>{
        if(err.response.status===400){
            return Promise.reject({code:400,msg:"Cannot upload template. Try again later!"})
        } else if(err.response.status===410){
            return Promise.reject({msg:"Refresh"});
        } else {
            console.log(err.response);
        }
    })
}
export const getTemplates = ()=>(dispatch)=>{
    return TemplatesService.getTemplates()
    .then((res)=>{
        console.log(res);
        
        dispatch({
            type: GET_TEMPLATES,
            payload: res.data
        })
    })
    .catch((err)=>{
        if(err.response.status===410){
            return Promise.reject({msg:"Refresh"});
        } else {
            console.log(err.response);
        }
    })
}

export const sendMailWithTemplate = (from,subject,attachment,logo,templateId,groupId)=>(dispatch)=>{
    return TemplatesService.sendMailWithTemplate(from,subject,attachment,logo,templateId,groupId)
    .then(res=>{
        dispatch({
            type: MAIL_SENT,
            payload: {from,subject,attachment,logo,templateId,groupId}
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