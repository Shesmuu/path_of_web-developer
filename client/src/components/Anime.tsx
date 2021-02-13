import React from "react"
import ScreenCenter from "./patterns/ScreenCenter"
import { Get } from "../util/http"
import "../styles/components/anime.css"

interface AnimeRowProps {
	score: number,
	title: string,
	image: string,
	mal: string
}

interface AnimeState {
	list: AnimeRowProps[]
}

const AnimeRow: React.FC<AnimeRowProps> = props => (
	<div className="anime_row">
		<a href={props.mal} rel="nofollow noopener noreferrer" target="_blank">
			<img src={props.image} alt="" />
		</a>
		<div className="title">{props.title}</div>
		<div className="score">{props.score}</div>
	</div>
)

class Anime extends React.Component {
	public state: AnimeState = {
		list: []
	}

	async InitList() {
		const list = await Get( "/api/anime_list" )

		this.setState( { list: list } )
	}

	componentDidMount() {
		this.InitList()
	}

	render() {
		return (
			<div className="anime_list screen_scrolling">
				<div>Мои оценочки с myanimelist.net</div>
				{
					this.state.list.map( ( a, i ) => <AnimeRow
						key={i}
						score={a.score}
						title={a.title}
						image={a.image}
						mal={a.mal}
					/> )
				}
			</div>
		)
	}
}



export default Anime