import TemplatesService from "../../services/templates.service";
import { ADD_TEMPLATE } from "./types";

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