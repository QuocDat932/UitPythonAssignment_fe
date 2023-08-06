import UserHelper from "./UserHelper";

class Config{

    SERVER_BACKEND_URI = "http://127.0.0.1:8000/api/";
    USERLOGIN = JSON.parse(localStorage.getItem("USERLOGIN"));

    setUserLogin(obj) {
        this.IS_LOGIN = (obj) ? true : false;
        if(obj){
            let userLogin = new UserHelper(obj.user_id, obj.user_name, obj.is_use, obj.mssv, obj.email, obj.img, obj.address, obj.role_id, obj.role_name, obj.role_is_use);
            localStorage.setItem("USERLOGIN", JSON.stringify(userLogin));
            this.USERLOGIN = JSON.parse(localStorage.getItem("USERLOGIN"))
        }
        else {
            localStorage.removeItem("USERLOGIN");
            this.USERLOGIN = undefined;
        }
    }

    checkUserLogin(hrf){
        if(this.USERLOGIN){
			window.location.assign(hrf);
		}else{
            window.location.assign("/#!/login_form");
        };
    }
    
}
export default new Config();