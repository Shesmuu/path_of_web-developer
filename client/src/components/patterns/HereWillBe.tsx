import React from "react"
import ScreenCenter from "./ScreenCenter"
import { RandomInt } from "../../util/math"

interface HereWillBeProps {
	text: string,
	imgStyle: TextOverlayImageStyle | undefined
}

const HereWillBe: React.FC<HereWillBeProps> = props => {
	let className = "text_overlay"

	if ( props.imgStyle ) {
		className += " " + props.imgStyle
	} else {
		const r = RandomInt( 0, 3 )
		className += " img" + r
	}

	if ( Math.random() < 0.2 ) {
		className += " red"
	}

	if ( Math.random() > 0.5 ) {
		className += " img_right"
	}

	return (
		<ScreenCenter>
			<div className={className}>Здесь будет {props.text}</div>
		</ScreenCenter>
	)
}

export default HereWillBe