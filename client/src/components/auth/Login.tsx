import React from "react"
import ScreenCenter from "../patterns/ScreenCenter"
import PasswordInput from "./PasswordInput"
import AuthEnum from "../../types/enums/auth"

class Login extends React.Component {
	private pass: string = ""

	OnPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.pass = e.currentTarget.value
	}

	Login() {

	}

	render() {
		return (
			<ScreenCenter>
				<form className="auth_form">
					<div className="overlay_header">Вход</div>
					<input className="input" placeholder="Логин" maxLength={AuthEnum.LOGIN_LEN} />
					<PasswordInput onChange={this.OnPassChange.bind( this )} />
					<button className="end_button" onClick={this.Login} type="button">Войти</button>
				</form>
			</ScreenCenter>
		)
	}
}

export default Login