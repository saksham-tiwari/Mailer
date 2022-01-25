import GroupsService from "../../services/group.service";
import { ADD_EMAIL, CREATE_GROUP_SUCCESS, DELETE_EMAIL, DELETE_GROUP, GET_EMAILS, GET_GROUPS, REFRESH } from "./types";

export const createGroup = (name,emails,count)=>(dispatch)=>{
    return GroupsService.createGroup(name,emails)
    .then((res)=>{
        console.log(res);
        if(res.status===201){
            //Group Created
            dispatch({
                type: CREATE_GROUP_SUCCESS,
                payload: {
                    name,
                    count
                }
            })
        } else if(res.status===208){
            Promise.reject({code:208,msg:"Emails not found"});
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

export const createGroupWithName = (name,nameEmail,count)=>(dispatch)=>{
    return GroupsService.createGroup(name,nameEmail)
    .then((res)=>{
        console.log(res);
        if(res.status===201){
            //Group Created
            dispatch({
                type: CREATE_GROUP_SUCCESS,
                payload: {
                    name,
                    count
                }
            })
        } else if(res.status===208){
            Promise.reject({code:208,msg:"Emails not found"});
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

export const deleteEmail = (id)=>(dispatch)=>{
    return GroupsService.deleteEmail(id)
    .then((res)=>{
        dispatch({
            type: DELETE_EMAIL,
            payload: id
        })
    })
    .catch((err)=>{
        if(err.response.status === 404){
            return Promise.reject({msg:"Invalid Email Id!"})
        } else if(err.response.status===410){
            return Promise.reject({msg:"Refresh"})
        }else {
            return Promise.reject(err);
        }
    })
}

export const deleteGroup = (id)=>(dispatch)=>{
    return GroupsService.deleteGroup(id)
    .then((res)=>{
        dispatch({
            type: DELETE_GROUP,
            payload: id
        })
    })
    .catch((err)=>{
        if(err.response.status === 404){
            return Promise.reject({msg:"Invalid Group Id!"})
        } else if(err.response.status===410){
            return Promise.reject({msg:"Refresh"})
        } else {
            return Promise.reject(err);
        }
    })
}

export const addEmail = (groupId,emails)=>(dispatch)=>{
    return GroupsService.addEmail(groupId,emails)
    .then((res)=>{
        if(res.status===200){
            dispatch({
                type:ADD_EMAIL,
                payload: res.data[0]
            })

            return Promise.resolve();
        }
    })
    .catch((err)=>{
        if(err.status.code===404){
            return Promise.reject({code:404,msg:"Group Not Found"})
        }else if(err.response.status===410){
            return Promise.reject({msg:"Refresh"})
        } else {
            return Promise.reject({err})
        }
    })
}