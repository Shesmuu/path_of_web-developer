import React from "react"
import { NavLink, Link, Redirect } from "react-router-dom"
import "../styles/components/header.css"

class Header extends React.Component {
	private logged: boolean = false
	private username: string = "kekw"

	render() {
		return (
			<div className="header">
				<div className="content">
					<div className="links">
						<Link to="/" className="link_home" >
							<img src="https://i.imgur.com/Gz8Hyu9.png" alt="ZXC" />
						</Link>
						<div className="nav">
							<NavLink activeClassName="active" to="/donate">Донат</NavLink>
							<NavLink activeClassName="active" to="/anime">Аниме</NavLink>
							<NavLink activeClassName="active" to="/chat">Чат</NavLink>
							<NavLink activeClassName="active" to="/blog">Блог</NavLink>
							<NavLink activeClassName="active" to="/what">Нечто</NavLink>
						</div>
					</div>
					{ this.logged ? (
						<div className="auth">
							{ this.username }
							<Redirect from="/login" to="/" />
							<Redirect from="/registration" to="/" />
						</div>
					) : (
						<div className="auth">
							<NavLink activeClassName="active" to="/login">Войти</NavLink>
							<div className="tab">/</div>
							<NavLink activeClassName="active" to="/registration">Зарегистрироваться</NavLink>
						</div>
					) }
				</div>
			</div>
		)
	}
}

export default Header