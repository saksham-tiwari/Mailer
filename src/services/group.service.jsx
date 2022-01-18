import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://bulk-mailer-app.herokuapp.com/";

class GroupsService{
    async createGroup(name,emails){

        return await axios
        .post(API_URL+"groups/add",{
            name,emails
        },{
            headers:authHeader()
        });
    }
    async getGroups(){
        return await axios
        .get(API_URL+"groups/getAllGroups",{
            headers:authHeader()
        })
    }
    async getEmails(id){
        return await axios
        .get(API_URL+"groups/getEmails/"+id,{
            headers:authHeader()
        })
    }
    async deleteEmail(id){
        return await axios
        .delete(API_URL+"groups/deleteEmail/"+id,{
            headers:authHeader()
        })
    }
    async deleteGroup(id){
        return await axios
        .delete(API_URL+"groups/deleteGroup/"+id,{
            headers:authHeader()
        })
    }
}
export default new GroupsService();