import React from "react"
import ScreenCenter from "./patterns/ScreenCenter"

interface EmtyProps {}

class Donate extends React.Component {
	render() {
		return (
			<ScreenCenter>
				<div className="text_overlay red">Испытательный полигон платежной системы Payssion. Возможно оно никогда не заработает</div>
				<div>
					<div className="donate_form">
						<form>
							<input
								type="text"
								placeholder="Имя"
								spellCheck={false}
							/>
							<textarea
								className="donate_comment"
								placeholder="Комментарий"
								rows={6}
								autoComplete="list"
								maxLength={300}
								spellCheck={false}
							/>
						</form>
					</div>
					<div className="default_overlay">
						<div>История</div>
					</div>
				</div>
			</ScreenCenter>
		)
	}
}

export default Donate