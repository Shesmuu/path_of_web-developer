import React from "react"
import { Link } from "react-router-dom"
import "../styles/components/header.css"

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
				<Link to="/register">Зарегистрироваться</Link>
			</div>
		</div>
	</div>
) 

 export default Header