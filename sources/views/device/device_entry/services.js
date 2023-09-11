import axios from "axios"
import Config from "../../../config/Config";
class services {
    AllDevices = [];
    onLoad = () => {
        this.getAllDevices();
    }

    getAllDevices = async () => {
        let {data: response} = await axios.get(Config.SERVER_BACKEND_URI+"devices/get-all-device");
        this.AllDevices = response.data;
        $$("tableDevice").clearAll();
        $$("tableDevice").parse(this.AllDevices);
    };

    onDbClickDataTable = (val) => {
        $$("FormDeviceRight").setValues(val);
    }
    
    btnSave_click = async () => {
        var {device_id, device_name, brand, vendor, description} = $$("FormDeviceRight").getValues();
        var myObject = {device_id, device_name, brand, vendor, description};
        let {data: response} = await axios.post(Config.SERVER_BACKEND_URI+"devices/post-save-device", myObject);
        if(response.status){
            swal("Success!", response.message, "success", {buttons: false ,timer: 1500});
            this.onLoad();
        }else{
            swal("Fail!", response.message, "error", {buttons: false ,timer: 1500});
        }
    }

    btnClear_click = () =>{
        $$("FormDeviceRight").setValues({});
    }

}
export default new services();