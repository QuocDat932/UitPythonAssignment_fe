import axios from "axios"
import Config from "../../../config/Config";
class services {
    AllVideo = [];
    onLoad = async() => {
        this.parseVideoToTable();
    }

    getAllVideo = async () => {
        // lấy data từ server backend của Python
        //let {data: result} = await axios.get(Config.SERVER_BACKENR_URI+'/video/custom/get-all-video');
        //this.AllVideo = result;
    };

    parseVideoToTable = async () => {
        await this.getAllVideo();
        $$('videoList01').parse(this.AllVideo);
        
    }

}
export default new services();