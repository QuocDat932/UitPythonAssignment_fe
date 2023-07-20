import { JetView } from "webix-jet";
import "../../styles/login_form.css";
import services from "./services";
import Config from "../../config/Config";
const formHeader = () => ({
	view: "form",
	id: "formHeader",
	name: "formHeader",
	css: "formLogin",
	cols: [
		{
			maxWidth: 10
		},
		{
			rows: [
				{},
				{
					id: "logo_assignment",
					height: 200,
					template: function (obj) {
						if (!obj.src)
							return `
                       <div class='box-upload-image'>
                         <img class="img-backgroundLogin" alt="" src='/img/logo_assignment.jpg'>
                       </div>`;
					}
				},
				{
					view: "label",
					css: "titleFormLogin",
					label: "Login into your account",
					height: 100
				},
				{
					view: "text",
					name: "Email adress",
					width: 400,
					height: 65,
					id: "UserName",
					label: "Email address",
					labelPosition: "top",
					placeholder: "laptrinhpython@gmail.com",
					invalidMessage: "Email is required",
					tooltip: "Input your email " + "#value#"
				},
				{
					height: 25
				},
				{
					view: "text",
					type: "password",
					name: "Password",
					width: 400,
					height: 65,
					id: "Password",
					label: "Password", labelPosition: "top",
					placeholder: "Enter your password",
					invalidMessage: "A name is required",
					tooltip: "Input your password "
				},
				{
					height: 35 
				},
				{
					view: "button",
					value: "Login now",
					name: "btnLogin",
					id: "btnLogin",
					css: "button_login",
					click: services.btnLogin_click
				},
				{
					height: 35 
				},
				{ template:"Or", type:"section"},
				{
					height: 25 
				},
				{
					view: "button",
					value: "Signup now",
					name: "btnRegister",
					id: "btnRegister",
					css: 'button_signup',
					click: () => {
					}
				},
				{}
			]
		},
		{	
			maxWidth: 10
		}
	]
});

export default class loginFormView extends JetView {
	config() {
		return {
			view: "form",
			id: "formPage",
			name: "formPage",
			//css: "loginBody invalid_login",
			css:{
				"background-image": "url('/img/background_login3.jpg')",
				"background-size": "cover",
				"background-repeat": "no-repeat",
				"background-position": "center center",
				"-webkit-animation": "formshake .5s linear"
			},
			cols: [
				{
					rows:[
						formHeader()
					]
				}
			]
		};
	}
	
	init() {
		services.resetAuthor();
	}
}