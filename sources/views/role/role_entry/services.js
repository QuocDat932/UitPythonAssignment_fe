import axios from "axios"
import Config from "../../../config/Config";
class services {

    onLoad = async () => {
        await this.loadAllRole();
        this.getDataForChartAnalysisTheNumberOfUserByRole();
        this.getDataForChartAnalysisTheNumberOfUserByIsUse();
    }

    loadAllRole = async () =>{
        let {data: result} = await axios.get(Config.SERVER_BACKEND_URI +'roles/get-all-role');
        $$('dataTable_Role').parse(result);
    }

    onDbClick = async (val) => {
        var RoleData = await this.getRoleById(val.id)
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
        let {role_id: role_id, role_name: role_name, description: description, is_use: is_use, color: color} = $$("rightForm").getValues();
        let roleParam = {
            "role_id": role_id,
            "role_name": role_name,
            "description": description,
            "is_use": is_use,
            "color": color
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

    getDataForChartAnalysisTheNumberOfUserByRole = async () =>{
        let {data: response} = await axios.get(Config.SERVER_BACKEND_URI+'roles/statistics-the-number-of-user-by-role')
        $$('chart_statistics_the_number_of_user_by_role').clearAll();
        $$('chart_statistics_the_number_of_user_by_role').parse(response.data);
    };
    getDataForChartAnalysisTheNumberOfUserByIsUse = async () =>{
        let {data: response} = await axios.get(Config.SERVER_BACKEND_URI+'roles/statistics-the-number-of-user-by-is-use')
        let dataOfChart = response.data.map((item,index)=>{
            return {
                "label": item.label,
                "value": item.value,
                "color": (item.status_id == 0) ? "#ee3639" : "#367fee"
            }
        })
        $$('chart_statistics_the_number_of_user_by_is_use').clearAll();
        $$('chart_statistics_the_number_of_user_by_is_use').parse(dataOfChart);
    }      
    


}
export default new services();