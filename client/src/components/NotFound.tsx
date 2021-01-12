import React from "react"
import ScreenCenter from "./patterns/ScreenCenter"

const NotFound: React.FC = () => (
	<ScreenCenter>
		<div className="text_overlay img3 red">
			<div className="not_found404">404</div>
			<div>Нету такой странички</div>
		</div>
	</ScreenCenter>
)

export default NotFound