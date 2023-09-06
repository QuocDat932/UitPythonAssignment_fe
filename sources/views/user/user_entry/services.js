import axios from "axios"
import Config from "../../../config/Config";
class services {
    listUser = [];
    lstDataRole = [];
    IMG_DEFAULT = 'img/user.png';
    obj = {
        img: "user.png",
    };

    onLoad = () => {
        this.loadDataRoleIdForComponentRole();
        this.searchDataView();
        $$("btnDelete").disable();
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
        this.btnClear_click()
    };

    selectCurrentUser = async (val) => {
        let currentUser = this.listUser.find(e => e.id == val);
        $$("formHeader").setValues(currentUser);
        $$("role_id").setValue(currentUser.role.role_id);
        $$("role_name").setValue(currentUser.role.role_name);
        $$("btnDelete").enable();
        $$("listDeviceOfUser").clearAll();
        // Commit: FE0006 - Design table list device is provided for user QuocDat - TanPhat
        let {data: response} = await axios.get(Config.SERVER_BACKEND_URI+`users/get-device-is-provided-for-user?user_id=${currentUser.user_id}`)
        if(response.status){
            $$("listDeviceOfUser").parse(response.data);
        }
    };

    btnClear_click = () => {
        $$("formHeader").setValues({role_id: 3, role_name: "User", is_use: 1, birthday: moment().format("YYYY-MM-DD")});
        $$("btnDelete").disable();
    };

    btnSave_click = async () => {
        var { mssv: mssv, user_name: user_name, email: email, address: address, birthday: birthday, role_id: role_id, is_use: is_use } = $$("formHeader").getValues();
        let userInfo = {
            mssv: mssv, 
            user_name: user_name,
            email: email, 
            address: address, 
            birthday: moment(birthday).format("YYYY-MM-DD"), 
            role_id: role_id, 
            is_use: is_use
        };
        let {data: response} = await axios.post(Config.SERVER_BACKEND_URI+'users/post-save-user', userInfo);
        if(response.status){
            swal("Success!", response.message, "success", {buttons: false ,timer: 1500});
            this.onLoad();
        }else{
            swal("Fail!", response.message, "error", {buttons: false ,timer: 1500});
        };
    }

    btnDelete_click = async () => {
        let mssv = $$("mssv").getValue();
        let {data: response} = await axios.post(Config.SERVER_BACKEND_URI+'users/delete-user', {"mssv": mssv});
        if(response.status){
            swal("Success!", response.message, "success", {buttons: false ,timer: 1500});
            this.onLoad();
        }else{
            swal("Fail!", response.message, "error", {buttons: false ,timer: 1500});
        };
    }

}
export default new services();