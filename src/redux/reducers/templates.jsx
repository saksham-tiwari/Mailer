import { ADD_TEMPLATE, DELETE_TEMPLATE, GET_TEMPLATES } from "../actions/types";

const initialState = {templates:[]}

const templatesReducer=(state=initialState,action)=>{
    const {type, payload} = action;
    switch(type){
        case ADD_TEMPLATE:
            return{
                ...state,
                templates:[...state.templates,payload]
            }
        case GET_TEMPLATES:
            return{
                ...state,
                templates:payload,
            }
        case DELETE_TEMPLATE:
            return{
                ...state,
                templates:state.templates.filter(template=>template.id!==payload)
            }
        default:
            return state
    }
}
export default templatesReducer
