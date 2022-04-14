import TemplatesService from "../../services/templates.service";
import { ADD_TEMPLATE, GET_TEMPLATES, MAIL_SENT, DELETE_TEMPLATE } from "./types";

export const uploadTemplate = (fd)=>(dispatch)=>{
    return TemplatesService.uploadTemplate(fd)
    .then((res)=>{
        console.log(res);
        dispatch({
            type: ADD_TEMPLATE,
            payload:res.data,
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
export const attachPdf = (fd)=>(dispatch)=>{
    return TemplatesService.attachPdf(fd)
    .then(res=>{
        console.log(res);
        return Promise.resolve({file:res.data.fileName})
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

export const sendMailWithTemplate = (from,subject,attachment,logo,templateId,groupId,pdfName)=>(dispatch)=>{
    return TemplatesService.sendMailWithTemplate(from,subject,attachment,logo,templateId,groupId,pdfName)
    .then(res=>{
        dispatch({
            type: MAIL_SENT,
            payload: {from,subject,attachment,logo,templateId,groupId,pdfName}
        })
        return Promise.resolve({code:res.status})
    })
    .catch(err=>{
        if(err.response.status===404){
            return Promise.reject({code:404,msg:"Group Not Found"})
        } else if(err.response.status===406){
            return Promise.reject({code:406,msg:"Mail not sent! Try again later."})
        } else if(err.response.status===410){
            return Promise.reject({code:410, msg:"Refresh"});
        } else {
            return Promise.reject({code:err.response.status, msg:"Mail not sent"})
        }
    })
}

export const deleteTemplate = (id)=>dispatch=>{
    return TemplatesService.deleteTemplate(id)
    .then(res=>{
        dispatch({
            type: DELETE_TEMPLATE,
            payload: id
        })
        return Promise.resolve({code:res.status})

    })
    .catch(err=>{
        if(err.response.status===404){
            return Promise.reject({code:404,msg:"Template Not Found"})
        } else if(err.response.status===410){
            return Promise.reject({code:410, msg:"Refresh"});
        } else {
            return Promise.reject({code:err.response.status, msg:"Mail not sent"})
        }
    })
}