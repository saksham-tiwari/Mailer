import axios from "axios";
import { BaseUrl } from './BaseUrl';
import authHeader from "./auth-header";


class GroupsService{
    async createGroup(name,emails){
        return await axios
        .post(BaseUrl()+"groups/add",{
            name,emails
        },{
            headers:authHeader()
        });
    }
    async createGroupWithName(name,nameEmail){
        return await axios
        .post(BaseUrl()+"groups/addWithName",{
            name,nameEmail
        },{
            headers:authHeader()
        });
    }
    async getGroups(){
        return await axios
        .get(BaseUrl()+"groups/getAllGroups",{
            headers:authHeader()
        })
    }
    async getEmails(id){
        return await axios
        .get(BaseUrl()+"groups/getEmails/"+id,{
            headers:authHeader()
        })
    }
    async deleteEmail(id){
        return await axios
        .delete(BaseUrl()+"groups/deleteEmail/"+id,{
            headers:authHeader()
        })
    }
    async deleteGroup(id){
        return await axios
        .delete(BaseUrl()+"groups/deleteGroup/"+id,{
            headers:authHeader()
        })
    }
    async addEmail(groupId,emails){
        return await axios
        .put(BaseUrl()+"groups/updateGroup/",{groupId,emails},{
            headers:authHeader()
        })
    }
}
export default new GroupsService();