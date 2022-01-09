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
}
export default new GroupsService();