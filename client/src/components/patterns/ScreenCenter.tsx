import React from "react"

const ScreenCenter: React.FC = props => (
	<div className="screen_center">
		<div className="center">
			{ props.children }
		</div>
	</div>
)

export default ScreenCenter