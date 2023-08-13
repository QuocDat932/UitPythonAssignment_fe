import axios from "axios"
import Config from "../../../config/Config";
class services {

    onLoad = async () => {
        await this.loadAllRole()
    }

    loadAllRole = async () =>{
        let {data: result} = await axios.get(Config.SERVER_BACKEND_URI +'roles/get-all-role');
        $$('dataTable_Role').parse(result);
    }

    onDbClick = async (val) => {
        var RoleData = await this.getRoleById(val.id)
        console.log(RoleData);
        this.setDataRoleIntoForm(RoleData.data)
    }

    getRoleById = async (role_id) => {
        let {data: result} = await axios.get(Config.SERVER_BACKEND_URI+'roles/get-role-by-id', {params:{role_id: role_id}})
        return result;
    }

    setDataRoleIntoForm = (RoleData) => {
        $$("rightForm").setValues(RoleData);
        // $$("role_id").define('readonly', true);
        // $$("role_id").refresh();
    }

    btnSave_click= async () =>{
        let {role_id: role_id, role_name: role_name, description: description, is_use: is_use} = $$("rightForm").getValues();
        let roleParam = {
            "role_id": role_id,
            "role_name": role_name,
            "description": description,
            "is_use": is_use
        }
        let {data: response} = await axios.post(Config.SERVER_BACKEND_URI+'roles/post-save-role', roleParam);
        if(response.status){
            swal("Success!", response.message, "success", {buttons: false ,timer: 1500});
            this.onLoad();
        }else{
            swal("Fail!", response.message, "error", {buttons: false ,timer: 1500});
        }
    }
    
    btnClearForm_click = () =>{
        this.setDataRoleIntoForm({
            "role_id": '',
            "role_name": '',
            "description": '',
            "is_use": 1
        });
        // $$("role_id").define('readonly', false);
        // $$("role_id").refresh();
    }

}
export default new services();