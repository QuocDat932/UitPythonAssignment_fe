import { JetView } from "webix-jet";
import services from "./services";

const mainForm = () => ({
	view: "form", 
	elements: [
		{
			view: "tabview",
			tabbar: { 
				width: 500,
				options: ["Danh Sách Thiết Bị", "Danh Sách Cung Cấp"]
			},
			animate: false,
			cells: [
				{	width: 1290,
					id: "Danh Sách Thiết Bị",
					rows: [
						leftForm()
					]
				},
				{	width: 1290,
					id: "Danh Sách Cung Cấp", 
					rows: [
						{ view: "text", 
						id:"value2",
						name: "value2", 
						label: "value2" },
						{}
					]
				}
			]
		},
		{
			view:"button",
			id:"button Test",
			label: "TEST",
			click: function(){
				console.log(">>>>>>>> "+ $$("value1").getValue());
				console.log(">>>>>>>> "+ $$("value2").getValue());
			}
		}
	]
})

const leftForm = () => ({
	view: "form",
	id: "leftForm",
	name: "leftForm",
	maxWidth: 800,
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
					columns: [
						{ id: "device_id", header: "Mã Thiết Bị", width: 50 },
						{ id: "device_name", header: "Thiết Bị", width: 150 },
						{ id: "brand", header: "Thương Hiệu", width: 130 },
						{ id: "vendor", header: "Nhà Cung Cấp", width: 130 },
						{ id: "description", header: "Ghi Chú", width: 130 }
					],
					pager: "pagerDevice",
					data: [
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
						{ device_name: "Laptop Asus", brand: "ASUS", vendor: "123", description: "Test" },
						{ device_name: "Laptop DELL", brand: "DELL", vendor: "123", description: "Test" },
					]
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
		},
		{ view: "text", 
		id:"value1",
		name: "value1", 
		label: "value1" },
		{
			rows: [
				{
					view: "datatable",
					id: "tableUser",
					name: "tableUser",
					select: true,
					scroll: false,
					width: 550,
					height: 260,
					columns: [
						{ id: "user_id", header: "Mã", width: 100 },
						{ id: "user_name", header: "Mã Nhân Viên", width: 150 },
						{ id: "vendor", header: "Tên Nhân Viên", width: 150 },
						{ id: "description", header: "Số Lượng Đã Cung Cấp", width: 200 }
					],
					pager: "pagerC",
					data: [
						{ user_id: "Laptop DELL", user_name: "DELL", vendor: "123", description: "Test" },
						{ user_id: "Laptop Asus", user_name: "ASUS", vendor: "123", description: "Test" },
						{ user_id: "Laptop DELL", user_name: "DELL", vendor: "123", description: "Test" },
						{ user_id: "Laptop Asus", user_name: "ASUS", vendor: "123", description: "Test" },
						{ user_id: "Laptop DELL", user_name: "DELL", vendor: "123", description: "Test" },
						{ user_id: "Laptop Asus", user_name: "ASUS", vendor: "123", description: "Test" },
						{ user_id: "Laptop DELL", user_name: "DELL", vendor: "123", description: "Test" },
						{ user_id: "Laptop Asus", user_name: "ASUS", vendor: "123", description: "Test" },
						{ user_id: "Laptop DELL", user_name: "DELL", vendor: "123", description: "Test" },
					]
				},
				{
					view: "pager", id: "pagerC",
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

const rightForm = () => ({
	view: "form",
	id: "rightForm",
	name: "rightForm",
	maxWidth: 800,
	rows: [
		{}
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