import {CREATE_GROUP_SUCCESS, GET_EMAILS, GET_GROUPS} from "../actions/types";

const initialState = {groups:[{name:"demo",count:1,id:1}],emails:[{id:1,email:"sakshamt234@gmail.com"}]};

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
        case GET_EMAILS:
            return{
                ...state,
                emails: payload
            }
         default:
             return state;
     }
}

export default groupsReducer
