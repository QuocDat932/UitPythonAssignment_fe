import { JetView } from "webix-jet";
import services from "./services";

const leftForm = () => ({
	view: 'form',
	id: 'leftForm',
	name: 'leftForm',
	rows: [
		{
			view: 'datatable',
			id: 'dataTable_Role',
			name: 'dataTable_Role',
			select: true,
			columns: [
				{ id: 'id', header: 'Mã Vai Trò', fillspace: true },
				{ id: 'name', header: 'Tên Vai Trò', fillspace: true },
				{ id: 'is_use_text', header: 'Trạng Thái', fillspace: true },
			],
			on:{
				onItemDblClick: function(val){
					services.onDbClick(this.getItem(val.row));
				}
			}
		},
		{
			view: "chart",
			id: "chart_statistics_the_number_of_role_by_role_name",
			type: "bar",
			value: "#number#",
			label: "#number#",
			color: "#color#",
			radius: 0,
			barWidth: 40,
			height: 300,
			tooltip: {
				template: "#number#"
			},
			xAxis: {
				title: "Thống Kê Lượng Vai Trò Theo Tên Vai Trò",
				template: "#role_name#",
				lines: false
			},
			yAxis: {
				// title: "Số Lượng",
				start: 0,
				step: 10,
				end: 100,
				lines: true
			},
			padding: {
				left: 40,
				right: 10,
				top: 50
			},
			data: [
				{ id: 1, number: 20, role_name: "User", color: "#ee4339" },
				{ id: 2, number: 55, role_name: "Tester", color: "#ee9336" },
				{ id: 3, number: 40, role_name: "Developer", color: "#eed236" },
				{ id: 4, number: 78, role_name: "Admin", color: "#d3ee36" },
				{ id: 10, number: 59, role_name: "Manager", color: "#e33fc7" }
			]
		}
	]

});

const rightForm = () => ({
	view: 'form',
	id: 'rightForm',
	name: 'rightForm',
	rows: [
		{
			view: 'text',
			id: 'role_id',
			name: 'role_id',
			label: 'Mã Vai Trò',
			labelWidth: 100,
			readonly: true
		},
		{
			view: 'text',
			id: 'role_name',
			name: 'role_name',
			label: 'Tên Vai Trò',
			labelWidth: 100

		},
		{
			view: 'textarea',
			id: 'description',
			name: 'description',
			label: 'Ghi Chú',
			labelWidth: 100,
			height: 120

		},
		{
			cols: [
				{
					view: "switch",
					id:'is_use',
					name:'is_use',
					value: 1,
					label: 'Sử Dụng',
					labelWidth: 100
				},
				{
					view: 'button',
					id: 'btn_save',
					name: 'btn_save',
					label: 'Lưu',
					width: 120,
					click: services.btnSave_click
				},
				{
					view: 'button',
					id: 'btn_delete_form',
					name: 'btn_delete_form',
					label: 'Xoá Form',
					width: 120,
					click: services.btnClearForm_click
				}
			]
		},
		/*{
			rows: [
				{
					view: 'form',
					id: 'formButton',
					name: 'formButton',
					maxWidth: 2000,
					border:false,
					cols: [
						{
							width: 70
						},
						{
							view: 'button',
							id: 'btn_save',
							name: 'btn_save',
							label: 'Lưu',
							width: 100
						},
						{
							view: 'button',
							id: 'btn_delete',
							name: 'btn_delete',
							label: 'Xoá',
							width: 100
						}
					]
				}
			]
		},*/
		{ template: "Thống Kê Vai Trò Theo Trạng Thái ", type: "section" },
		{
			view: "chart",
			id: "chart",
			type: "pie",
			value: "#number#",
			color: "#color#",
			label: "#is_use#",
			pieInnerText: "#number#",
			tooltip: "statistics the number of #is_use# is #number#",
			shadow: 0,
			data: [
				{ number: "5", is_use: "Y - Active", color: "#367fee" },
				{ number: "4", is_use: "N - inActive", color: "#ee3639" },
			]
		}
	]

});

export default class loginFormView extends JetView {
	config() {
		return {
			view: "form",
			id: "formPage",
			name: "formPage",
			cols: [
				leftForm(),
				rightForm()

			]
		};
	}

	init() {

		services.onLoad()

	}

	ready() {
	}
}