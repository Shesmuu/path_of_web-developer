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
		<div className="anime_image_title margin">
			<a href={props.mal} rel="nofollow noopener noreferrer" target="_blank">
				<img src={props.image} alt="" />
			</a>
			<div className="title">{props.title}</div>
		</div>
		<div className="score margin">
			<div className="score_value">{props.score}</div>
		</div>
	</div>
)

class Anime extends React.Component {
	private mounted: boolean = false
	public state: AnimeState = {
		list: []
	}

	async InitList() {
		const list = await Get( "/api/anime_list" )

		if ( this.mounted ) {
			this.setState( { list: list } )
		}
	}

	componentDidMount() {
		this.mounted = true
		this.InitList()
	}

	componentWillUnmount() {
		this.mounted = false
	}

	render() {
		return (
			<div className="screen_scrolling anime_list">
				<div>
					<div className="head margin">Мои оценочки с myanimelist.net</div>
					<div className="columns_head">
						<div className="anime_head margin">Аниме</div>
						<div className="score_head margin">Оценка</div>
					</div>
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
			</div>
		)
	}
}

export default Anime