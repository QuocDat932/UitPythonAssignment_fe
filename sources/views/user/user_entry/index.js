import { JetView } from "webix-jet";
import service from "./services";

/*
#[NhaUyen - Dev] - [TanPhat - Test]
# Commit: FE0002 - Design UI User Entry
*/

const formListLeft = () => ({
	view: "form",
	id: "formList",
	name: "formBody",
	maxWidth: 1200,
	rows: [
		{
			view: "dataview",
			id: "userView",
			scroll: "y",
			select: true,
			padding: 0,
			maxWidth: 2000,
			maxHeight: 2000,
			type: {
				height: "auto",
				width: "auto",
				type: "tiles",
				template: function (obj) {
					obj.img = obj.img == undefined ? "user.png" : obj.img;
					const displayUsrNo = obj.tenKh === "" ? 0 : 1;
					return `<div>
                          <img id='imgItem ${obj.user_name}' src='${"/img/" + obj.img}' onerror="this.onerror=null; this.src='${service.IMG_DEFAULT}'">
                          <div class='info'>
						  <div class="number" style='opacity: ${displayUsrNo}'>${obj.mssv}</div>
						  <div class='row name'>${obj.user_name}</div>
                            <div class='row col'>
                               <div class='start-date'>${obj.role.role_name === undefined ? "Undefined" : obj.role.role_name}</div>
                            </div>
                            <div>
                                <div>${obj.is_use == 0 ? "Vô Hiệu Hoá" : obj.is_use == 1 ? "Đang Hoạt Động" : obj.is_use == undefined ? "Đang Hoạt Động" : "Deleted"}</div>
                            </div>
                          </div></br>
                        </div>`;
				}
			},
			on: {
				onItemClick: function (val) {
					service.selectCurrentUser(val);
				}
			}
		}
	]
});

const formChart = () => ({
	id: 'formChart',
	name:'formChart',
	rows:[
		{
				id:"charts",
				cols:[
				  {
					view: "chart",
					id:"chart",
					type:"pie",
					value:"#sales#",
					color:"#color#",
					label:"#month#",
					pieInnerText:"#sales#",
					shadow:0,
					data:[
						{ sales:"20", month:"Jan", color: "#ee3639" },
						{ sales:"30", month:"Feb", color: "#ee9e36" },
						{ sales:"50", month:"Mar", color: "#eeea36" },
						{ sales:"40", month:"Apr", color: "#a9ee36" },
						{ sales:"70", month:"May", color: "#36d3ee" },
						{ sales:"80", month:"Jun", color: "#367fee" },
						{ sales:"60", month:"Jul", color: "#9b36ee" }
					]
				  }
				]
		},
		{
			template:"<div style='width:100%;text-align:center'>Thống Kê Người Dùng</div>",
			height:30
		}
	]
})

const formRight = () => ({
	view: "form",
	id: "formRight",
	name: "formRight",
	maxWidth: 800,
	rows:[
		formDetailRight(),
		formChart()
	]
})

const formDetailRight = () => ({
	view: "form",
	id: "formHeader",
	name: "formHeader",
	maxWidth: 1000,
	cols: [
		{
			rows: [
				{
					view: "text",
					name: "mssv",
					id: "mssv",
					label: "Mã Số Nhân Viên",
					maxWidth: 550,
					labelWidth: 120,
					placeholder: "Tự động",
					readonly: true
				},
				{
					view: "text",
					name: "user_name",
					id: "user_name",
					label: "Họ và Tên",
					//labelPosition: "top",
					placeholder: "Full Name",
					invalidMessage: "A name is required",
					tooltip: "Client's name is " + "#value#",
					maxWidth: 550,
					labelWidth: 120,
					required: true
				},
				{
					view: "text",
					name: "email",
					id: "email",
					label: "Email",
					placeholder: "Email",
					tooltip: "Client's mail is " + "#value#",
					maxWidth: 550,
					labelWidth: 120,
					required: true
				},
				{
					view: "text",
					name: "address",
					id: "address",
					label: "Địa Chỉ",
					placeholder: "Address",
					tooltip: "Client's address is " + "#value#",
					maxWidth: 550,
					labelWidth: 120,
					required: true
				},
				{
					view: "datepicker",
					id: "birthday",
					name: "birthday",
					maxWidth: 550,
					label: "Ngày Sinh",
					labelWidth: 120,
					stringResult: true,
					value: new Date,
					format: "%d/%m/%Y",
					required: true
				},
				{
					cols: [
						{
							view: "combo",
							id: "role_id",
							name: "role_id",
							width: 230,
							labelWidth: 120,
							label: "Vai Trò",
							required: true,
							on: {
								onChange: function (newValue) {
									service.setAutoFillDataRoleName(newValue);
								}
							}
						},
						{
							view: "text",
							id: "role_name",
							name: "role_name",
							readonly: true
						}
					]
				},
				{
					view: "switch",
					id: "is_use",
					name: "is_use",
					label: "Sử Dụng",
					onLabel: "Active",
					offLabel: "InActive",
					labelWidth: 120,
					value: 0
				},
				{
					cols: [
						{},
						{
							view: "button",
							value: "Delete",
							name: "Delete",
							id: "btnDelete",
							click: service.btnDelete_click
						},
						{
							view: "button",
							value: "Clear",
							name: "btnClear",
							id: "btnClear",
							click: service.btnClear_click
						},
						{
							view: "button",
							value: "Save",
							name: "btnSearch",
							id: "btnSearch",
							click: service.btnSave_click
						}
					]
				}
			]
		}
	],
	rules: {
		"mail": webix.rules.isEmail
	}
});


export default class loginFormView extends JetView {
	config() {
		return {
			view: "form",
			id: 'mainForm',
			maxWidth: 2000,
			maxHeight: 2000,
			cols: [
				formListLeft(),
				formRight()
			]
		};
	}
	init() {
		service.onLoad()
	}
	ready(){
	}
}