import { SET_PERMISSION } from "../actions/types";

const initialState = {};

const permission = (state=initialState, action)=>{
    const { type, payload } = action;

    switch(type){
        case SET_PERMISSION: 
            return { permission: payload };
        
        default:
            return state;
    }
}

export default permission