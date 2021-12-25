import { SET_EMAIL } from "../actions/types";

const initialState = {};

const email = (state=initialState, action)=>{
    const { type, payload } = action;

    switch(type){
        case SET_EMAIL: 
            return { mail: payload };
        
        default:
            return state;
    }
}

export default email