import axios from "axios"
import Config from "../../../config/Config";
class services {
    AllDevices = [];
    onLoad = () => {
        this.getAllDevices();
        this.getAllUser();
        $$('btnSaveProvide').disable();
        this.statisticsTheNumberOfDeviceProvidedForUser();
        this.getDataUserByProvidedDevice();
    }

    getAllDevices = async () => {
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + "devices/get-all-device");
        this.AllDevices = response.data;
        $$("tableDevice_1").clearAll();
        $$("tableDevice_1").parse(this.AllDevices);
    };

    getAllUser = async () => {
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + "users/get-all-user-with-the-number-of-device");
        this.AllDevices = response.data;
        $$("dataTable_UserWithTheNumberOfDevice").clearAll();
        $$("dataTable_UserWithTheNumberOfDevice").parse(this.AllDevices);
    }

    onDbClickDataTable = (val) => {
        $$("FormDeviceRight").setValues(val);
        this.getDataUserByProvidedDevice(val.device_id)
    }

    btnSave_click = async () => {
        var { device_id, device_name, brand, vendor, description } = $$("FormDeviceRight").getValues();
        var myObject = { device_id, device_name, brand, vendor, description };
        let { data: response } = await axios.post(Config.SERVER_BACKEND_URI + "devices/post-save-device", myObject);
        if (response.status) {
            swal("Success!", response.message, "success", { buttons: false, timer: 1500 });
            this.onLoad();
        } else {
            swal("Fail!", response.message, "error", { buttons: false, timer: 1500 });
        }
    }

    btnClear_click = () => {
        $$("FormDeviceRight").setValues({});
    }

    selectCurrentUser = async (val) => {
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + `users/get-device-is-provided-for-user?user_id=${val.user_id}`)
        if (response.status) {
            $$("dataTable_UserWithTheNumberOfDeviceDetail").clearAll();
            $$("dataTable_UserWithTheNumberOfDeviceDetail").parse(response.data);
        }

        $$("mssv").setValue(val.mssv);
        $$("user_id").setValue(val.user_id);
        $$("user_name").setValue(val.user_name);
        $$("device_id_dtl").setValue('');
        $$("device_name_dtl").setValue('');
        // $$("date_provided").setValue('');
        $$("date_recall").setValue('');
        $$("desciption_dtl").setValue('');
    }

    selectDeviceProvidedDetail = (val) => {
        $$("device_id_dtl").setValue(val.device_id);
        $$("device_name_dtl").setValue(val.device_name);
        $$("date_provided").setValue(val.date_provide);
        $$("date_recall").setValue(val.date_recall);
        $$("desciption_dtl").setValue(val.description);
        // $$("date_provided").define("readonly", true);
        $$("date_provided").refresh();
        $$('showPopupDevice').disable();
        if (val.date_recall) {
            $$('btnSaveProvide').disable();
        } else {
            $$('btnSaveProvide').enable();
        }
    }

    btnClearDetail_click = () => {
        $$("mssv").setValue('');
        $$("user_name").setValue('');
        $$("user_id").setValue('');
        $$("device_id_dtl").setValue('');
        $$("device_name_dtl").setValue('');
        $$("date_provided").setValue(new Date);
        $$("date_recall").setValue('');
        $$("desciption_dtl").setValue('');
        $$("date_provided").define("readonly", false);
        $$("date_provided").refresh();
        $$("dataTable_UserWithTheNumberOfDeviceDetail").clearAll();
        $$('btnSaveProvide').disable();
        $$('showPopupDevice').enable();
    }

    callBackDataFromPopupGetDevice = (val) => {
        $$("device_id_dtl").setValue(val.device_id);
        $$("device_name_dtl").setValue(val.device_name);
        this.enableBtnSaveWhenSaveNew()
    }

    enableBtnSaveWhenSaveNew = () => {
        if ($$("user_id").getValue() && $$("device_id_dtl").getValue()) {
            $$('btnSaveProvide').enable();
        }
    }


    btnSaveProvide_click = async () => {
        let objProvide = {
            user_id: $$("user_id").getValue(),
            device_id: $$("device_id_dtl").getValue(),
            date_provided: $$("date_provided").getValue(),
            date_recall: $$("date_recall").getValue(),
            description: $$("desciption_dtl").getValue()
        }
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + "devices/save-provided-device-for-user", { params: objProvide })
        if (response.status) {
            swal("Success!", response.message, "success", { buttons: false, timer: 1500 });
            this.selectCurrentUser(objProvide);
            this.getAllUser();
            this.statisticsTheNumberOfDeviceProvidedForUser();
        } else {
            swal("Fail!", response.message, "error", { buttons: false, timer: 1500 });
        }
    }

    statisticsTheNumberOfDeviceProvidedForUser = async () => {
        let color = [ "#ee4339", "#ee9336" ,"#eed236" ];
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + "devices/statistics-the-number-of-device-provided-for-user");
        let data = response.data.map((e, index) => {
            return { device_id: e.device_id, device_name: e.device_name, number: e.value, color: color[index]  }
        });
        $$('chart_statistics_the_number_of_device_for_user').clearAll();
        $$('chart_statistics_the_number_of_device_for_user').parse(data);
    }

    getDataUserByProvidedDevice = async (device_id) => {
        let { data: response } = await axios.get(Config.SERVER_BACKEND_URI + `users/get-data-user-by-provided-device?device_id=${device_id}`);
        $$('tableUserUseDevice').clearAll();
        $$('tableUserUseDevice').parse(response.data);
    }

}
export default new services();