// views/window2.js
export default class AboutUs {
    isOpened = false;

    constructor({ id }) {
        this._id = id;
    }

    CLOSE_BUTTON = {
        view: 'button',
        width: 30,
        align: 'right',
        hotkey: 'esc',
        type: 'image',
        image: 'img/icon/close.png',
        click: () => {
            $$(this._id).hide();
        }
    };

    layout = () => ({
        view: "window",
        id: this._id,
        maxWidth: 800,
        height: 300,
        modal: true,
        width: this._popup_width,
        height: this._popup_height,
        position: 'center',
        move: true,
        resize: true,
        head: {
            view: 'toolbar',
            cols: [
                { width: 5 },
                { view: 'label', label: "Đôi Nét Về Dự Án" },
                this.CLOSE_BUTTON
            ]
        },
        body: {
            height: 300,
            cols: [
                {
					id: "logoAboutUs",
					template: function (obj) {
							return `
                       <div class='box-upload-image'>
                         <img class="img-backgroundLogin" alt="" src='/img/logo_assignment.jpg'>
                       </div>`;
					}
				},
                {
                    rows:[
                        {
                            id:"facebook",
                            template: function(obj){
                                return `
                                <div>
                                <p>1* Xin chào Thầy Ths.Phạm Thế Sơn và các bạn. <p>
                                <p>2* Cảm Thầy Ths.Phạm Thế Sơn đã xem sản phẩm. <p>
                                <p>3* Đây là dự án quản lý người dùng. <p>
                                <p>4* Dự trên công nghệ Python - Webix - MySQL. <p>
                                <p>5* Thành Viên:  <p>
                                        <p>#1/ 22410007 - Bùi Quốc Đạt</p>
                                        <p>#2/ 22210030 - Đặng Nguyễn Nhã Uyên</p>
                                        <p>#3/ 22210018 - Phạm Tấn Phát</p> 
                                <br>
                                <br>
                                </div>`; 
                            }
                        }
                    ]
                }
            ]
        }
    });

    drawPopup = () => {
        webix.ui(
            this.layout()
        );
        webix.extend($$(this._id), webix.ProgressBar);
    }

    showWindow() {
        if (!this.isOpened) {
            this.drawPopup();
            this.isOpened = true;
        };
        $$(this._id).show();
    };
    
    closeWindow() {
        $$(this._id).hide();
    }
}