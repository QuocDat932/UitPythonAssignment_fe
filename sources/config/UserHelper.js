class UserHelper{

    constructor(user_id, user_name, is_use, mssv, email, img, address, role_id, role_name, role_is_use) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.is_use = is_use;
        this.mssv= mssv;
        this.email=  email;
        this.img  = img;
        this.address  = address;
        this.role = {
            role_id: role_id,
            role_name: role_name ,
            is_use: role_is_use
        };
    }

    getUserId() {
        return this.user_id
    }
    
    getUserName() {
        return this.user_name
    }
    
    getUserId() {
        return this.is_use
    }
    
}
export default UserHelper;