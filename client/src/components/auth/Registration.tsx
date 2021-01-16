import React from "react"
import ScreenCenter from "../patterns/ScreenCenter"
import PasswordInput from "./PasswordInput"
import AuthEnum from "../../types/enums/auth"

interface RegistrationState {
	loginError: string
	passwordError: string
	confrimPasswordError: string
}

class Registration extends React.Component {
	private pass: string = ""
	private confrimPass: string = ""
	private passMatch: RegExp = /[^a-zA-Z0-9]+/
	public state: RegistrationState = {
		loginError: "w",
		passwordError: "s",
		confrimPasswordError: "x"
	}

	OnKeyPress( e: React.KeyboardEvent<HTMLFormElement> ) {
		if ( e.key === "Enter" ) {
			this.Register()
		}
	}

	OnPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.pass = e.currentTarget.value
		this.CheckPassword()
	}

	OnConfrimPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.confrimPass = e.currentTarget.value
		this.CheckPasswordConfrim()
	}

	CheckLogin() {

	}

	CheckPassword() {
		if ( this.confrimPass ) {
			this.CheckPasswordConfrim()
		}
	}

	CheckPasswordConfrim() {

	}

	Register() {
		if ( !this.pass || !this.confrimPass ) {
			return
		}
	}

	render() {
		return (
			<ScreenCenter>
				<form className="auth_form" onKeyPress={this.OnKeyPress.bind( this )}>
					<div className="overlay_header">Регистрация</div>
					<input className="input" placeholder="Логин" maxLength={AuthEnum.LOGIN_LEN} onChange={undefined} />
					<div className="error_warning">{this.state.loginError}</div>
					<PasswordInput />
					<div className="error_warning">{this.state.passwordError}</div>
					<input
						className="input"
						placeholder="Повторите пароль"
						type="password"
						onBlur={this.OnConfrimPassChange.bind( this )}
						onSubmit={()=>console.log("kekw")}
					/>
					<div className="error_warning">{this.state.confrimPasswordError}</div>
					<button className="end_button" onClick={this.Register.bind( this )} type="button">Зарегистрироваться</button>
				</form>
			</ScreenCenter>
		)
	}
}

export default Registration