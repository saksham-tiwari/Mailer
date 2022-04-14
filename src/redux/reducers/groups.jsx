import {ADD_EMAIL, CREATE_GROUP_SUCCESS, DELETE_EMAIL, DELETE_GROUP, GET_EMAILS, GET_GROUPS, SET_TEMPLATE} from "../actions/types";

const initialState = {groups:[],emails:{emails:[{id:1,email:"sakshamt234@gmail.com"}],hasName:false,count:null},isTemplate:{isTemplate:false,name:null}};

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
        case ADD_EMAIL:
            return{
                ...state,
                emails: {...state.emails,emails:[...state.emails.emails,{...payload}]}
            }
        case DELETE_EMAIL:
            return{
                ...state,
                // emails: state.emails.filter(email => email.id !== payload)
                emails: {...state.emails,emails:state.emails.emails.filter(email => email.id !== payload)}

            }
        case DELETE_GROUP:
            return{
                ...state,
                groups:state.groups.filter(group=>group.id!==payload)
            }
        case SET_TEMPLATE:{
            return{
                ...state,
                isTemplate:payload
            }
        }
         default:
             return state;
     }
}

export default groupsReducer
