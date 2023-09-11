import { JetView, plugins } from "webix-jet";
import AboutUs from "./aboutUs";
import swal from "sweetalert";
export default class TopView extends JetView {
	config() {
		var header = {
			type: "header",
			template: this.app.config.name,
			css: "webix_header app_header"
		};

		var menu = {
			view: "menu", id: "top:menu",
			css: "app_menu",
			width: 180, layout: "y", select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{ value:"OverView", id:"start", icon:"mdi mdi-clover" },
				{ value:"Role Entry",id:"role.role_entry",  icon:"mdi mdi-account-convert" },
				{ value:"User Entry",id:"user.user_entry",  icon:"wxi-user" },
				{ value:"Manage Device",id:"device.device_entry",  icon:"mdi mdi-laptop-chromebook" },

			]
		};

		var menuControl = {
			rows: [
				{
					view: "toolbar", id: "toolbar", elements: [
						{
							view: "icon", icon: "mdi mdi-menu",
							click: function () {
								if ($$("menuSub").config.hidden) {
									$$("menuSub").show();
								}
								else
									$$("menuSub").hide();
							}
						},
						{
							view: "label",
							label: "Control"
						}
					]
				}
			]
		};
		
		var menuFooter = {
			view: "button",
			type: "image",
			image: "img/logo_assignment.jpg",
			label:"Nhóm 03",
			click: () =>{
				this.aboutUs.showWindow()
			}
		}

		var ui = {
			id:"mainLayout",
			type: "clean", paddingX: 5, css: "app_layout", cols: [
				// Menu
				{ paddingX: 5, paddingY: 10, rows: [{ css: "webix_shadow_medium", rows: [header, menuControl, menu, menuFooter] }] },
				// Màn Hình : SubView
				{
					type: "wide", paddingY: 10, paddingX: 5, rows: [
						{ $subview: true }
					]
				}
			]
		};

		return ui;
	}
	init() {

		if ($$("attachfile")) {
			$$("attachfile").destructor();
		}

		if ($$("menuSub")) {
			$$("menuSub").destructor();
		}

		this.use(plugins.Menu, "top:menu");
		// Render load file one time
		webix.ui({
			id: "attachfile",
			name: "attachfile",
			view: "uploader",
			upload: "http://localhost:8888/api/file", // API BACKEND
			multiple: false,
			autosend: false,
			inputName: "files",
			accept: "image/png, image/gif, image/jpeg",
			on: {
				onBeforeFileAdd(upload) {
					const { file } = upload;
					const reader = new FileReader();
					reader.onload = (event) => {
						$$("avata").setValues({ src: event.target.result });
					};
					reader.readAsDataURL(file);
					return true;
				},
				onFileUploadError() {
					webix.alert("Error during file upload");
				}
			},
			apiOnly: true
		});

		webix.ui({
			view: "sidemenu",
			id: "menuSub",
			width: 200,
			position: "left",
			state: function (state) {
				var toolbarHeight = $$("toolbar").$height;
				state.top = toolbarHeight + 55;
				state.height -= toolbarHeight + 55;
			},
			css: "my_menu",
			body: {
				view: "list",
				borderless: true,
				scroll: false,
				template: "<button class='btn-control'><span class='webix_icon mdi mdi-#icon#'></span></button>#value#",
				data: [
					{
						id: "Logout",
						value: "Logout",
						icon: "logout"
					},
					{ id: "Settings", 
					  value: "Control",
					  icon: "settings" 
					}
				],
				select: true,
				type: {
					height: 50
				},
				on: {
					onItemClick: (val) => {
						$$("menuSub").hide();

						swal({
							title: "Xác nhận",
							text: "Bạn muốn đăng xuất không",
							icon: "warning",
							buttons: true,
							dangerMode: true,
						  })
						  .then((willDelete) => {
							if (willDelete) {
								window.location.assign("/#!/login_form");
								window.location.reload();
							} else {
								window.location.reload();
							}
						  });
						}
					}
				}
		});

		this.aboutUs = new AboutUs({id:"AboutUs"});
	}
}