import {JetView} from "webix-jet";
import Config from "../config/Config";

export default class DataView extends JetView{
	config(){
		return {
			view: "form",
			id: "formPage",
			name: "formPage",
			//css: "loginBody invalid_login",
			css:{
				"background-image": "url('/img/background_login4.jpg')",
				"background-size": "cover",
				"background-repeat": "no-repeat",
				"background-position": "center center",
				"-webkit-animation": "formshake .5s linear"
			},
			cols: [
				{
					
				}
			]
		};
	}

	init(view){
	}

	ready(){
	}
}