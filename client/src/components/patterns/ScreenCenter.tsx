import React from "react"

interface ScreenCenterProps {
	className?: string
	children?: React.ReactNode
}

const ScreenCenter: React.FC<ScreenCenterProps> = props => (
	<div className="screen_center">
		<div className={ ( props.className ? "center " + props.className : "center" ) }>
			{ props.children }
		</div>
	</div>
)

export default ScreenCenter