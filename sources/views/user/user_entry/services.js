import axios from "axios"
import Config from "../../../config/Config";
class services {
    listUser = [];
    lstDataRole = [];
    IMG_DEFAULT = 'img/user.png';
    obj = {
        img: "user.png",
    };

    loadInit = () => {
        this.loadDataRoleIdForComponentRole();
        this.searchDataView();
    };

    loadDataRoleIdForComponentRole = async () => {
        let {data: result} = await axios.get(Config.SERVER_BACKEND_URI+`roles/get-all-role-by-is-use?is_use=${1}`);
        this.lstDataRole = result.data;
        let options = this.lstDataRole.map((e)=>{
            return {value: e.role_id}
        })
        //$$('RoleId').getPopup().getList().parse(options, false);
        $$('role_id').define("options", options);
        $$('role_id').setValue(options[0].value);
    };

    setAutoFillDataRoleName = (role_id) => {
        // Toán tử Destructuring 
        // let [currentRoleId] = this.lstDataRole.filter((e)=>{
        //     return e.id == id;
        // });
        if(role_id){
            let currentRoleId = this.lstDataRole.find(e => e.role_id == role_id);
            $$('role_name').setValue(currentRoleId.role_name);    
        }
        
    };

    searchDataView = async () =>{
        let {data: response} = await axios.get(Config.SERVER_BACKEND_URI+'users/get-all-user-by-is-use');
        this.listUser = response.data;
        $$("userView").clearAll();
        $$("userView").parse(this.listUser);
    };

    selectCurrentUser = (val) => {
        let currentUser = this.listUser.find(e => e.id == val);
        $$("formHeader").setValues(currentUser);
        $$("role_id").setValue(currentUser.role.role_id);
        $$("role_name").setValue(currentUser.role.role_name);

    };

    btnClear_click = () => {
        $$("formHeader").setValues({role_id: 3, role_name: "User"});
    }

}
export default new services();