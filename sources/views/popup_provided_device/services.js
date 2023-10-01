import axios from "axios";
import Config from "../../config/Config";
export default class services {
    constructor(id, config, componentId) {
        this._id = id;
        this._componentId = componentId;
        this._config = config;
        // this._param = null;
        // set late
        this._eventCallBack = null;
    };
    // callback function 
    onSelect = () => {
        if (this._config.popupProperties.selectMultiple) {
            let lsData = $$(this._componentId.DATATABLE).serialize();
            let lsDataSelect = lsData.filter(d => d.checked == 'Y');
            if (typeof this._eventCallBack == 'function') {
                this._eventCallBack(lsDataSelect);
            }
        } else {
            if (typeof this._eventCallBack == 'function') {
                this._eventCallBack($$(this._componentId.DATATABLE).getSelectedItem());
            }
        }
        $$(this._id).hide();
    };

    hiddenCheckbox = () => {
        if (this._config.popupProperties.selectMultiple) {
            $$(this._componentId.DATATABLE).isColumnVisible('checked') ? null : $$(this._componentId.DATATABLE).showColumn('checked');
        } else{
            $$(this._componentId.DATATABLE).isColumnVisible('checked') ? $$(this._componentId.DATATABLE).hideColumn('checked') : null;
        }
    };

    loadDefaultDataForPopup = async (user_id) =>{
            let {data: result} = await axios.get(Config.SERVER_BACKEND_URI+`devices/get-devices-for-pupup-device?user_id=${user_id}`);
            $$(this._componentId.DATATABLE).clearAll();
            $$(this._componentId.DATATABLE).parse(result.data);
    }

    popupInit = (user_id) => {
        this.loadDefaultDataForPopup(user_id);
        this.hiddenCheckbox();
    };
}