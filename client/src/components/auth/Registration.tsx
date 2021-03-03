import React from "react"
import ScreenCenter from "../patterns/ScreenCenter"
import PasswordInput from "./PasswordInput"
import { PasswordHash } from "../../util/math"
import { Post } from "../../util/http"

const NAME_LENGTH_MIN = 4
const NAME_LENGTH_MAX = 24
const NAME_MATCH = new RegExp( "[^a-zA-Z0-9_]+" )

interface RegistrationState {
	nameError: string
	passError: string
	confrimPassError: string
}

class Registration extends React.Component {
	private name: string = ""
	private pass: string = ""
	private confrimPass: string = ""
	public state: RegistrationState = {
		nameError: "",
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

		if ( this.confrimPass ) {
			this.CheckPassConfrim()
		}
	}

	OnConfrimPassChange( e: React.FormEvent<HTMLInputElement> ) {
		this.confrimPass = e.currentTarget.value
		this.CheckPassConfrim()
	}

	OnNameChange( e: React.FormEvent<HTMLInputElement> ) {
		this.name = e.currentTarget.value
		this.CheckName()
	}

	OnNameBlur( e: React.FormEvent<HTMLInputElement> ) {
		this.CheckNameTaken()
	}

	async CheckNameTaken() {
		const data = await Post( "/api/auth/is_name_taken", { name: this.name } )

		if ( data.name !== this.name ) {
			return
		}

		if ( data.taken && this.CheckName() ) {
			this.setState( { nameError: "Имя занято." } )
		}

		return data.taken
	}

	CheckName(): boolean {
		let error = ""

		if ( NAME_MATCH.test( this.name ) ) {
			error = "Можно использовать только латинские символы, цифры и нижнее подчеркивание."
		} else if ( this.name.length < NAME_LENGTH_MIN ) {
			error = "Минимальная длина имени " + NAME_LENGTH_MIN + " символа"
		}

		this.setState( { nameError: error } )

		console.log( !!error )

		return !!error
	}

	CheckPassConfrim(): boolean {
		const confrimed = this.confrimPass === this.pass

		this.setState( {
			confrimPassError: confrimed ? "" : "Пароли не совпадают"
		} )

		return confrimed
	}

	async Register() {
		const taken = await this.CheckNameTaken()

		if (
			!this.CheckName() ||
			this.CheckPassConfrim()
		) {
			return
		}

		const passHash = PasswordHash( this.pass )

		console.log( this.pass, passHash, passHash.length )
	}

	render() {
		return (
			<ScreenCenter>
				<form className="auth_form" onKeyPress={this.OnKeyPress.bind( this )}>
					<div className="overlay_header">Регистрация</div>
					<input
						className="input"
						placeholder="Имя"
						maxLength={NAME_LENGTH_MAX}
						onChange={this.OnNameChange.bind( this )}
						onBlur={this.OnNameBlur.bind( this )}
					/>
					<div className="error_warning">{this.state.nameError}</div>
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