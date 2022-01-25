import { ADD_TEMPLATE } from "../actions/types";

const initialState = {templates:[]}

const templatesReducer=(state=initialState,action)=>{
    const {type, payload} = action;
    switch(type){
        case ADD_TEMPLATE:
            return{
                ...state,
                templates:[...state.templates,{id:null,name:payload}]
            }
        default:
            return state
    }
}
export default templatesReducer
