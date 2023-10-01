// views/window2.js
import services from "./services";
export default class popupDevice {
    isOpened = false;

    constructor({ id, config }) {
        this._id = id;
        this._config = config;
        this._title_popup = config.popupProperties.title;
        this._popup_width = config.popupProperties.widthDefault;
        this._popup_height = config.popupProperties.heightDefault;
        this._componentId = {
            BTN_SEL: "BTN_SEL" + this._id,
            DATATABLE: "DATATABLE" + this._id
        }
        this.service = new services(id, this._config, this._componentId);
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

    BTN_SELECT = () => ({
        view: 'button',
        id: this._componentId.BTN_SELECT,
        width: 100,
        align: 'right',
        value: 'select',
        click: () => {
            this.service.onSelect()
        }
    });

    layout = () => ({
        view: "window",
        id: this._id,
        maxWidth: 800,
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
                { view: 'label', label: this._title_popup },
                this.CLOSE_BUTTON
            ]
        },
        body: {
            rows: [
                {
                    view: "datatable",
                    id: this._componentId.DATATABLE,
                    select: true,
					pager: "pagerPupupDevice",
                    columns: [
                        {
                            id: 'checked',
                            header: { content: 'masterCheckbox', css: 'center', contentId: 'masCheckbox' },
                            checkValue: 'Y',
                            uncheckValue: 'N',
                            template: '{common.checkbox()}',
                            width: 40
                        },
                        {
                            id: "device_id",
                            header: "Mã",
                            fillspace: 0.5
                        },
                        {
                            id: "device_name",
                            header: "Tên Sản Phẩm",
                            sort: "text",
                            fillspace: true
                        }
                    ],
                    autoheight: true,
                    scroll: false,
                    on: {

                    }
                },
				{
					view: "pager", id: "pagerPupupDevice",
					animate: {
						subtype: "out"
					},
					size: 5,
					group: 5
				},
                {
                    cols: [
                        {},
                        this.BTN_SELECT()
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

    showWindow({ config = {}, callback = null, param = {}}) {
        if (!this.isOpened) {
            this.drawPopup();
            this.isOpened = true;
        };
        this.service.popupInit(param.user_id);
        this.service._eventCallBack = callback;
        this.service._param = param;
        $$(this._id).show();

    };

    closeWindow() {
        $$(this._id).hide();
    }
}
