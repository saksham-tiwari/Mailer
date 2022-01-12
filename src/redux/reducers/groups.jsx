import {CREATE_GROUP_SUCCESS} from "../actions/types";

const initialState = {groups:[]};

const grps_reducer = (state = initialState, action)=>{
    const {type, payload} = action;
     switch(type){
         case CREATE_GROUP_SUCCESS:
             let tempGrp = state.groups;
             return{
                 ...state,
                groups: tempGrp.push(payload),
             }

         default:
             return state;
     }
}