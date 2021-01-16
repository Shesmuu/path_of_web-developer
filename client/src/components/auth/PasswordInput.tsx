import React from "react"

class PasswordInput extends React.Component {
	public passVisible: boolean = false
	public state: { className: string, buttonType: string } = {
		className: "look_pass",
		buttonType: "password"
	}

	TogglePasswordVisible() {
		this.passVisible = !this.passVisible

		this.setState( {
			className: this.passVisible ? "look_pass visible" : "look_pass",
			buttonType: this.passVisible ? "text" : "password"
		} )
	}

	render() {
		return (
			<div className="input">
				<input className="implict_input" placeholder="Пароль" type={this.state.buttonType} />
				<button className={this.state.className} type="button" onClick={this.TogglePasswordVisible.bind(this)} />
			</div>
		)
	}
} 

export default PasswordInput