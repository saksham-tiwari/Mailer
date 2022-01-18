import {CREATE_GROUP_SUCCESS, GET_GROUPS} from "../actions/types";

const initialState = {groups:[{name:"demo",count:1}]};

const groupsReducer = (state = initialState, action)=>{
    const {type, payload} = action;
     switch(type){
         case CREATE_GROUP_SUCCESS:
            //  let tempGrp = state.groups;
             return{
                 ...state,
                groups: [...state.groups,{name:payload.name,count:payload.count}]
             }

        
        case GET_GROUPS:
            return{
                ...state,
                groups: payload
            }
         default:
             return state;
     }
}

export default groupsReducer
