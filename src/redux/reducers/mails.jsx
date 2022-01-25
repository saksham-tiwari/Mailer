import { MAIL_SENT, ADD_ATTACHMENT, PREV_MAILS } from "../actions/types";

const initialState = {sentMails:[],prevMails:[]}

const mailsReducer = (state=initialState, action)=>{
    const {type, payload} = action;
    switch(type){
        case MAIL_SENT:
            return{
                ...state,
                sentMails: [...state.sentMails,{payload}]
            }
        case PREV_MAILS:
            return{
                ...state,
                pervMails: payload,
            }
        default:
            return state;
    }
}

export default mailsReducer