import React from "react"
import { NavLink, Link } from "react-router-dom"
import "../styles/components/header.css"

class Header extends React.Component {
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
					<div className="auth">
						<NavLink activeClassName="active" to="/login">Войти</NavLink>
						<div className="tab">/</div>
						<NavLink activeClassName="active" to="/registration">Зарегистрироваться</NavLink>
					</div>
				</div>
			</div>
		)
	}
}

/*
const Header: React.FC = () => (
	<div className="header">
		<div className="content">
			<div className="links">
				<Link to="/" className="link_home" >
					<img src="https://i.imgur.com/Gz8Hyu9.png" alt="ZXC" />
				</Link>
				<div className="nav">
					<Link to="/donate">Донат</Link>
					<Link to="/anime">Аниме</Link>
					<Link to="/chat">Чат</Link>
					<Link to="/blog">Блог</Link>
					<Link to="/what">Нечто</Link>
				</div>
			</div>
			<div className="auth">
				<Link to="/login">Войти</Link>
				<div className="tab">/</div>
				<Link to="/registration">Зарегистрироваться</Link>
			</div>
		</div>
	</div>
)
*/

export default Header