import React from "react"
import ScreenCenter from "./patterns/ScreenCenter"
import { Get } from "../util/http"
import "../styles/components/donate.css"

interface DonateState {
	history: Array<{
		name: string
		sum: number
		comment: string
	}>
}

class Donate extends React.Component {
	private mounted: boolean = false
	public state: DonateState = {
		history: []
	}

	async InitHistory() {
		const history = await Get( "/api/donate_history" )

		if ( this.mounted ) {
			this.setState( { history: history } )
		}
	}

	componentDidMount() {
		this.mounted = true
		this.InitHistory()
	}

	componentWillUnmount() {
		this.mounted = false
	}

	render() {
		return (
			<ScreenCenter className="donate">
				<div className="text_overlay red">Испытательный полигон платежной системы Payssion. Возможно оно никогда не заработает</div>
				<div className="content">
					<form className="default_overlay donate_form">
						<div className="input">
							<input
								className="implict_input"
								type="text"
								placeholder="Имя"
								maxLength={24}
								spellCheck={false}
							/>
						</div>
						<div className="input">
							<textarea
								className="implict_input donate_comment"
								placeholder="Комментарий"
								rows={6}
								autoComplete="list"
								maxLength={300}
								spellCheck={false}
							/>
						</div>
						<div className="input">
							<input
								className="implict_input"
								type="number"
								placeholder="Рубли"
								spellCheck={false}
							/>
						</div>
						<button className="end_button" type="button" >Отправить</button>
					</form>
					<div className="default_overlay">
						<div>История</div>
						{
							this.state.history.map( ( d, i ) => ( 
								<div>
									<div>{d.name + " - " + d.sum}</div>
									<div>{d.comment}</div>
								</div>
							) )
						}
					</div>
				</div>
			</ScreenCenter>
		)
	}
}

export default Donate