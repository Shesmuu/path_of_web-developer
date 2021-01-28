import React from "react"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Donate from "./Donate"
import Anime from "./Anime"
import Login from "./auth/Login"
import Registration from "./auth/Registration"
import NotFound from "./NotFound"
import HereWillBe from "./patterns/HereWillBe"
import "../styles/components/auth.css"

const ZXC: React.FC = () => {
	const willBePaths: Array<{path: string, text: string, imgStyle?: TextOverlayImageStyle }> = [
		{ path: "/chat", text: "чат, которым я освою сокеты" },
		{ path: "/blog", text: "блог, просто чтобы был" },
		{ path: "/what", text: "нечто", imgStyle: "img3" },
	]

	return ( 
		<div>
			<div className="background" />
			<Header />
			<Switch>
				<Route exact path="/donate" component={Donate} />
				<Route exact path="/anime" component={Anime} />
				<Route exact path="/" component={Home}  />
				<Route exact path="/login" component={Login} />
				<Route exact path="/registration" component={Registration} />
				{
					willBePaths.map( ( v, i ) => {
						return (
							<Route key={i} exact path={v.path}>
								<HereWillBe text={v.text} imgStyle={v.imgStyle} />
							</Route>
						)
					} )
				}
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default ZXC