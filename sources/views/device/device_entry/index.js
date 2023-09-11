import { JetView } from "webix-jet";
import services from "./services";

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
	cols: [
		FormDeviceLeft(),
		FormDeviceRight()
	]
});

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
					id: "tableDevice",
					name: "tableDevice",
					select: true,
					scroll: false,
					width: 550,
					height: 260,
					pager: "pagerDevice",
					columns: [
						{ id: "device_id", header: "Mã Thiết Bị", width: 50 },
						{ id: "device_name", header: "Thiết Bị", fillspace: true },
						{ id: "brand", header: "Thương Hiệu", fillspace: true },
						{ id: "description", header: "Ghi Chú", fillspace: true }
					],
					on:{
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
					size: 5,
					group: 5
				}
			]
		}
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
					placeholder: "vendor",
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
	]
});

export default class loginFormView extends JetView {
	config() {
		return mainForm();
	}
	init() {
		services.onLoad();
	}
	ready() {
	}
}