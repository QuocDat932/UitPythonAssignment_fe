import swal from 'sweetalert'
import Config from '../../config/Config';
import axios from 'axios';
import UserHelper from '../../config/UserHelper';
class services {

    accounts = [
        { userName: "quocdat@gmail.com", passWord: "22410007" },
        { userName: "nhauyen@gmail.com", passWord: "22210030" },
        { userName: "tanphat@gmail.com", passWord: "22210018" },
    ];

    checkLogin = () =>{
        let inValUserName = $$("UserName").getValue();
        let inValUserPassWord = $$("Password").getValue();
        if(inValUserName == '' || inValUserName == undefined){
            $$("UserName").focus();
            return false;
        } else if(inValUserPassWord == '' || inValUserPassWord == undefined) {
            $$("Password").focus();
            return false;
        }

        return this.accounts.some((e) => (e.userName == inValUserName && e.passWord == inValUserPassWord));
    };

    btnLogin_click = () => {
        if(this.checkLogin()){
                window.location.assign("http://localhost:8081/#!/top/start");
                swal("Success!", "Login Success!", "success", {buttons: false ,timer: 1500});
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