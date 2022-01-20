import GroupsService from "../../services/group.service";
import { CREATE_GROUP_SUCCESS, GET_EMAILS, GET_GROUPS, REFRESH } from "./types";

export const createGroup = (name,emails,count)=>(dispatch)=>{
    return GroupsService.createGroup(name,emails)
    .then((res)=>{
        console.log(res);
        if(res.status===201){
            //Group Created
            console.log("Create Group");
            dispatch({
                type: CREATE_GROUP_SUCCESS,
                payload: {
                    name,
                    count
                }
            })
        }
    })
    .catch((err)=>{
        // console.log(err);
        if(err.response.status===401||err.response.status===410){
            // console.log("here");
            return Promise.reject({refresh:"required"});
            // dispatch({})

        }
    })
}

export const getGroups = ()=>(dispatch)=>{
    return GroupsService.getGroups()
    .then((res)=>{
        console.log(res);
        dispatch({
            type: GET_GROUPS,
            payload: res.data
        })
    })
    .catch((err)=>{
        console.log(err);
        if(err.response.status===401||err.response.status===410){
            // console.log("here");
            return Promise.reject({refresh:"required"});
            // dispatch({})

        }
    })
}

export const getEmails = (id)=>(dispatch)=>{
    return GroupsService.getEmails(id)
    .then((res)=>{
        dispatch({
            type: GET_EMAILS,
            payload: res.data
        })
    })
    .catch((err)=>{
        console.log(err.response.status)
        if(err.response.status === 404){
            return Promise.reject({msg:"Invalid Group Id!"})
        } else if(err.response.status===410){
            return Promise.reject({msg:"Refresh"})
        }
    })
}

export const deleteEmail = ()=>(dispatch)=>{
    return GroupsService.deleteEmail()
    .then((res)=>{

    })
    .catch((err)=>{
        
    })
}

export const deleteGroup = ()=>(dispatch)=>{
    return GroupsService.deleteGroup()
    .then((res)=>{

    })
    .catch((err)=>{
        
    })
}