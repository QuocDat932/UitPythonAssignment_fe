import swal from 'sweetalert'
import Config from '../../config/Config';
import axios from 'axios';
import UserHelper from '../../config/UserHelper';
class services {

    account = [
        { userName: "quocdat@gmail.com", passWord: "22410007" },
        { userName: "nhauyen@gmail.com", passWord: "22210030" },
        { userName: "tenphat@gmail.com", passWord: "22210018" },
    ];

    checkLogin = async () =>{
        let inValUserName = $$("UserName").getValue();
        let inValUserPassWord = $$("Password").getValue();
        if(inValUserName == '' || inValUserName == undefined){
            $$("UserName").focus();
            return false;
        } else if(inValUserPassWord == '' || inValUserPassWord == undefined) {
            $$("Password").focus();
            return false;
        }

        let {data: result} = await axios.get('http://127.0.0.1:8000/api/users/get-user-login', {params: {"email":inValUserName,"password":inValUserPassWord}});
        if(result.status){
            Config.setUserLogin(result.data);
            Config.IS_LOGIN = true;
            return true;
        } else {
            Config.IS_LOGIN = false;
            return false;
        }
        

    };

    btnLogin_click = async () => {
        if(await this.checkLogin()){
            if(Config.IS_LOGIN){
                window.location.assign("/#!/top/start");
                swal("Success!", "Login Success!", "success", {buttons: false ,timer: 1500});
            }
        } else {
            swal("Fail!", "Login Fail!", "error", {buttons: false ,timer: 2000});
            $$("UserName").focus();
        }
    }

    resetAuthor = async () =>{
        await Config.setUserLogin(undefined);
        $$("UserName").setValue("");
        $$("Password").setValue("");
        await this.checkLogin()
    }
}
export default new services();