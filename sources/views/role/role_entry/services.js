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


}
export default new services();