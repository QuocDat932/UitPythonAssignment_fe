import { JetView } from "webix-jet";
import services from "./services";
const leftForm = () => ({
	view: "form",
	id: "leftForm",
	name: "leftForm",
	cols: [
		{
			view:"datatable",
			id:"videoList01",
			name:"videoList01",
			columns:[
			  { id:"user_id", header:"User Id", width: 100 }, 
			  { id:"user_name", header:"User Name", width: 150 },
			  { id:"email", header:"Email", width:100	},
			  { id:"mssv", header:"Mssv", width:80 }
			],
			autoheight:true,
			autowidth: true,
			scroll:false,
			select:"row"
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
				{
						
				},
				{
					view: "iframe",
					id: "videoPlayer",
					src: "https://www.youtube.com/embed/HZ3XumHDDwA",
					width: 640,
					height: 360
				  }
				
			]
		};
	}
	init() {
		services.onLoad();
	}
	ready(){
	}
}