import React from "react"
import ScreenCenter from "../patterns/ScreenCenter"
import PasswordInput from "./PasswordInput"
import PasswordHash from "../../scripts/PasswordHash"
import AuthEnum from "../../types/enums/auth"

interface RegistrationState {
	loginError: string
	passError: string
	confrimPassError: string
}

class Registration extends React.Component {
	private login: string = ""
	private pass: string = ""
	private confrimPass: string = ""
	private loginMatch: RegExp = new RegExp( "[^a-zA-Z0-9_]+" )
	public state: RegistrationState = {
		loginError: "",
		passError: "",
		confrimPassError: ""
	}

	OnKeyPress( e: React.KeyboardEvent<HTMLFormElement> ) {
		if ( e.key === "Enter" ) {
			this.Register()
		}
	}

	OnPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.pass = e.currentTarget.value
		this.CheckPass()
	}

	OnConfrimPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.confrimPass = e.currentTarget.value
		this.CheckPassConfrim()
	}

	OnLoginChange( e: React.FormEvent<HTMLInputElement> ) {
		this.login = e.currentTarget.value
		this.CheckLogin()
	}

	async CheckLoginTaken( e: React.FormEvent<HTMLInputElement> ) {
		const res = await fetch( "/api/auth/check_name", {
			method: "POST",
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify( { name: this.login } ),
		} )
		const data = await res.json()

		if ( data.name !== this.login ) {
			return
		}

		if ( data.taken && this.CheckLogin() ) {
			this.setState( { loginError: "Имя занято." } )
		}

		return data.taken
	}

	CheckLogin(): boolean {
		let verified = !this.loginMatch.test( this.login )
		let error = ""

		if ( this.login.length <= 0 ) {
			error = "Необходимо ввести логин."
			verified = false
		} else if ( !verified ) {
			error = "Можно использовать только латинские символы, цифры и нижнее подчеркивание."
		}

		this.setState( { loginError: error } )

		return verified
	}

	CheckPass(): boolean  {
		if ( this.confrimPass.length > 0 ) {
			this.CheckPassConfrim()
		}

		const verified = this.pass.length <= AuthEnum.PASS_LEN

		this.setState( {
			passError: verified ? "" : "Пароль не должен превышать " + AuthEnum.PASS_LEN + " символа"
		} )

		return verified
	}

	CheckPassConfrim(): boolean {
		const confrimed = this.confrimPass === this.pass

		this.setState( {
			confrimPassError: confrimed ? "" : "Пароли не совпадают"
		} )

		return confrimed
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
					<input
						className="input"
						placeholder="Логин"
						maxLength={AuthEnum.LOGIN_LEN}
						onChange={this.OnLoginChange.bind( this )}
						onBlur={this.CheckLoginTaken.bind( this )}
					/>
					<div className="error_warning">{this.state.loginError}</div>
					<PasswordInput onChange={this.OnPassChange.bind( this )} />
					<div className="error_warning">{this.state.passError}</div>
					<input
						className="input"
						placeholder="Повторите пароль"
						type="password"
						onChange={this.OnConfrimPassChange.bind( this )}
					/>
					<div className="error_warning">{this.state.confrimPassError}</div>
					<button className="end_button" onClick={this.Register.bind( this )} type="button">Зарегистрироваться</button>
				</form>
			</ScreenCenter>
		)
	}
}

export default Registration