import GroupsService from "../../services/group.service";
import { CREATE_GROUP, CREATE_GROUP_SUCCESS, REFRESH } from "./types";

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
        if(err.response.status===401){
            // console.log("here");
            return Promise.reject({refresh:"required"});
            // dispatch({})

        }
    })
}