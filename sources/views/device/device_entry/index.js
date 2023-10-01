import { JetView } from "webix-jet";
import services from "./services";
import popupDevice from "../../popup_provided_device/index";

const mainForm = () => ({
	view: "form",
	id: "mainForm",
	name: "mainForm",
	minWidth: 1000,
	maxWidth: 2000,
	minHeight: 600,
	maxHeight: 1000,
	elements: [
		{
			view: "tabview",
			tabbar: {
				width: 500,
				options: ["Danh Sách Thiết Bị", "Danh Sách Cung Cấp"]
			},
			animate: false,
			cells: [
				{
					id: "Danh Sách Thiết Bị",
					rows: [
						FormDevice()
					]
				},
				{
					id: "Danh Sách Cung Cấp",
					rows: [
						FormProvided()
					]
				}
			]
		}
	]
})

const FormDevice = () => ({
	view: "form",
	id: "FormDevice",
	name: "FormDevice",
	maxWidth: 2000,
	rows: [
		{
			cols: [
				FormDeviceLeft(),
				FormDeviceRight()
			]
		}
	]
});

const chart_statistics_top_device_provided = () => ({
	view: "chart",
	id: "chart_statistics_the_number_of_device_for_user",
	type: "bar",
	value: "#number#",
	label: "#number#",
	color: "#color#",
	radius: 0,
	barWidth: 40,
	maxHeight: 500,

	maxWidth: 1000,
	tooltip: {
		template: "#number#"
	},
	xAxis: {
		title: "Thống Kê Top 3 Thiết Bị Cung Cấp Nhiều Nhất",
		template: "#device_name#",
		lines: false
	},
	yAxis: {
		// title: "Số Lượng",
		start: 0,
		step: 2,
		end: 10,
		lines: true
	},
	padding: {
		left: 40,
		right: 10,
		top: 50
	}
})

const FormDeviceLeft = () => ({
	view: "form",
	id: "FormDeviceLeft",
	name: "FormDeviceLeft",
	maxWidth: 1000,
	rows: [
		{
			rows: [
				{
					view: "datatable",
					id: "tableDevice_1",
					name: "tableDevice_1",
					select: true,
					scrollY: true,
					width: 550,
					maxHeight: 350,
					pager: "pagerDevice",
					columns: [
						{ id: "device_id", header: "Mã", fillspace: 0.2, sort: "text" },
						{ id: "device_name", header: "Tên Thiết Bị", fillspace: true, sort: "text" },
						{ id: "brand", header: "Thương Hiệu", fillspace: 0.5 },
						{ id: "description", header: "Ghi Chú", fillspace: true }
					],
					on: {
						onItemDblClick: function (val) {
							services.onDbClickDataTable(this.getItem(val.row));
						}
					}
				},
				{
					view: "pager", id: "pagerDevice",
					animate: {
						subtype: "out"
					},
					size: 8,
					group: 5
				}
			]
		},
		chart_statistics_top_device_provided()
	]
});

const FormDeviceRight = () => ({
	view: "form",
	id: "FormDeviceRight",
	name: "FormDeviceRight",
	cols: [
		{
			minWidth: 10,
			maxWidth: 20
		},
		{
			rows: [
				{
					rows: [
						{
							view: "text",
							name: "device_id",
							id: "device_id",
							label: "Mã Thiết Bị",
							maxWidth: 550,
							labelWidth: 120,
							placeholder: "Auto",
							readonly: true
						},
						{
							view: "text",
							name: "device_name",
							id: "device_name",
							label: "Thiết Bị",
							placeholder: "Devices's Name",
							invalidMessage: "A name is required",
							tooltip: "Client's name is " + "#value#",
							maxWidth: 550,
							labelWidth: 120,
							required: true
						},
						{
							view: "text",
							name: "brand",
							id: "brand",
							label: "Thương Hiệu",
							placeholder: "Brand",
							maxWidth: 550,
							labelWidth: 120,
							required: true
						},
						{
							view: "text",
							name: "vendor",
							id: "vendor",
							label: "Nhà Cung Cấp",
							placeholder: "Vendor",
							tooltip: "Client's address is " + "#value#",
							maxWidth: 550,
							labelWidth: 120,
							required: true
						},
						{
							view: "textarea",
							name: "description",
							id: "description",
							label: "Ghi Chú",
							placeholder: "Description",
							maxWidth: 550,
							labelWidth: 120,
							required: true
						},
						{
							cols: [
								{},
								{
									view: "button",
									value: "Save",
									name: "Save",
									id: "btnSave",
									click: services.btnSave_click
								},
								{
									view: "button",
									value: "Clear",
									name: "btnClear",
									id: "btnClear",
									click: services.btnClear_click
								}
							]
						}
					]
				},
				{ height: 35 },
				{
					view: "datatable",
					id: "tableUserUseDevice",
					name: "tableUserUseDevice",
					select: true,
					scrollY: false,
					width: 550,
					maxHeight: 350,
					pager: "pagerUserUseDevice",
					columns: [
						{ id: "mssv", header: "Mã Nhân Viên", fillspace: 0.7 },
						{ id: "user_name", header: "Tên Nhân Viên", fillspace: true, sort: 'text' },
						{ id: "date_provided", header: "Ngày Cấp", fillspace: 0.5 },
						{ id: "date_recall", header: "Ngày Trả", fillspace: 0.5 }
					]
					// ,on: {
					// 	onItemDblClick: function (val) {
					// 		services.onDbClickDataTable(this.getItem(val.row));
					// 	}
					// }
				},
				{
					view: "pager", id: "pagerUserUseDevice",
					animate: {
						subtype: "out"
					},
					size: 5,
					group: 5
				}
			]
		},
		{
			minWidth: 10,
			maxWidth: 20
		}
	]
});

const FormProvided = () => ({
	view: "form",
	id: "FormProvided",
	name: "FormProvided",
	maxWidth: 2000,
	cols: [
		FormProvidedLeft(),
		FormProvidedRight()
	]
});

const FormProvidedLeft = () => ({
	view: "form",
	id: "FormProvidedLeft",
	name: "FormProvidedLeft",
	cols: [
		{
			rows: [
				{
					view: 'datatable',
					id: 'dataTable_UserWithTheNumberOfDevice',
					name: 'dataTable_UserWithTheNumberOfDevice',
					select: true,
					css: "webix_header_border",
					pager: "pagerUserWithTheNumberOfDevice",
					columns: [
						{ id: 'user_id', hidden: true },
						{ id: 'number', header: [{ text: 'STT', css: { "text-align": "center" } }], width: 50 },
						{ id: 'mssv', header: [{ text: 'MSNV', css: { "text-align": "center" } }], fillspace: 0.5 },
						{ id: 'user_name', header: [{ text: 'Tên NV', css: { "text-align": "center" } }], fillspace: true },
						{ id: 'total_provided', css: { "text-align": "center" }, header: [{ text: "Số Lượng", colspan: 3, css: { "text-align": "center" } }, { text: 'Đã Cấp', css: { "text-align": "center" } }] },
						{ id: 'total_recall', css: { "text-align": "center" }, header: [null, { text: 'Đã Trả', css: { "text-align": "center" } }] },
						{ id: 'total_owe', css: { "text-align": "center" }, header: [null, { text: 'Đang Giữ', css: { "text-align": "center" } }] }
					],
					on: {
						onItemDblClick: function (val) {
							services.selectCurrentUser(this.getItem(val))
						}
					}
				},
				{
					view: "pager", id: "pagerUserWithTheNumberOfDevice",
					animate: {
						subtype: "out"
					},
					size: 5,
					group: 5
				}
			]
		}
	]
});

const FormProvidedRight = () => ({
	view: "form",
	id: "FormProvidedRight",
	name: "FormProvidedRight",
	cols: [
		{
			rows: [
				{
					view: "text",
					name: "user_id",
					id: "user_id",
					hidden: true
				},
				{
					view: "text",
					name: "mssv",
					id: "mssv",
					label: "Mã Số Nhân Viên",
					placeholder: "Staff's Id",
					maxWidth: 550,
					labelWidth: 120,
					readonly: true
				},
				{
					view: "text",
					name: "user_name",
					id: "user_name",
					label: "Họ và Tên",
					placeholder: "Full Name",
					maxWidth: 550,
					labelWidth: 120,
					readonly: true
				},
				{
					cols: [
						{
							view: "text",
							name: "device_id",
							id: "device_id_dtl",
							label: "Thiết Bị",
							placeholder: "Id",
							maxWidth: 200,
							labelWidth: 120,
							readonly: true,
						},
						{
							view: "text",
							name: "device_name",
							id: "device_name_dtl",
							placeholder: "Device's Name",
							required: true,
							maxWidth: 300,
							readonly: true
						},
						{
							view: "button",
							width: 30,
							align: "right",
							hotkey: "esc",
							type: "image",
							image: "img/icon/search.png",
							id: "showPopupDevice"
						}
					]
				},
				{
					cols: [
						{
							view: "datepicker",
							id: "date_provided",
							name: "date_provided",
							maxWidth: 550,
							label: "Ngày Nhận",
							labelWidth: 120,
							stringResult: true,
							value: new Date,
							format: "%d/%m/%Y"
						},
						{
							width: 10
						},
						{
							view: "datepicker",
							id: "date_recall",
							name: "date_recall",
							maxWidth: 550,
							label: "Ngày Trả",
							labelWidth: 120,
							stringResult: true,
							value: '',
							format: "%d/%m/%Y"
						}
					]
				},
				{
					view: "textarea",
					name: "desciption",
					id: "desciption_dtl",
					label: "Ghi Chú",
					labelWidth: 120,
					maxHeight: 100,
				},
				{
					cols: [
						{},
						{
							view: "button",
							value: "Save",
							name: "btnSaveProvide",
							id: "btnSaveProvide",
							click: services.btnSaveProvide_click
						},
						{
							view: "button",
							value: "Clear",
							name: "btnClearProvide",
							id: "btnClearProvide",
							click: services.btnClearDetail_click
						}
					]
				},
				{
					view: 'datatable',
					id: 'dataTable_UserWithTheNumberOfDeviceDetail',
					name: 'dataTable_UserWithTheNumberOfDeviceDetail',
					select: true,
					css: "webix_header_border",
					pager: "paper_dataTable_UserWithTheNumberOfDeviceDetail",
					columns: [
						{ id: 'user_id', hidden: true },
						{ id: 'device_id', header: [{ text: 'Mã', css: { "text-align": "center" } }], width: 50 },
						{ id: 'device_name', header: [{ text: 'Sản Phẩm', css: { "text-align": "center" } }], width: 150 },
						{ id: 'date_provide', header: [{ text: "Ngày", colspan: 2, css: { "text-align": "center" } }, { text: 'Cấp', css: { "text-align": "center" } }] },
						{ id: 'date_recall', header: [null, { text: 'Trả', css: { "text-align": "center" } }] },
						{ id: 'description', header: [{ text: 'Ghi Chú', css: { "text-align": "center" } }], fillspace: 2 }
					],
					on: {
						onItemDblClick: function (val) {
							services.selectDeviceProvidedDetail(this.getItem(val));
						}
					}
				},
				{
					view: "pager", id: "paper_dataTable_UserWithTheNumberOfDeviceDetail",
					animate: {
						subtype: "out"
					},
					size: 5,
					group: 5
				}
			]
		}
	]
});

export default class loginFormView extends JetView {
	config() {
		return mainForm();
	}
	init() {
		const popupDeviceProvide = new popupDevice({
			id: "SelectDeviceForUser",
			config: {
				popupProperties: {
					title: "Select Device",
					widthDefault: 500,
					heightDefault: 800,
					selectMultiple: false
				}
			}
		});
		$$("showPopupDevice").attachEvent("onItemClick", function () {
				console.log();
				popupDeviceProvide.showWindow({
						config: {},
						callback: services.callBackDataFromPopupGetDevice,
						param: {"user_id": $$("user_id").getValue()}
				})
		})
		services.onLoad();
	}
	ready() {
	}
}