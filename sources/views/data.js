import {JetView} from "webix-jet";
import {data} from "models/records";
import Config from "../config/Config";

export default class DataView extends JetView{
	config(){
		return { view:"datatable", autoConfig:true, css:"webix_shadow_medium" };
	}
	init(view){
		view.parse(data);
	}
	ready(){
	}
}