import React from "react"
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
	<div className="W">
		<a href={props.mal} rel="nofollow noopener noreferrer" target="_blank">
			<img src={props.image} alt="" />
		</a>
		<div>{props.title}</div>
		<div>{props.score}</div>
	</div>
)

class Anime extends React.Component {
	public state: AnimeState = {
		list: []
	}

	async InitList() {
		const res = await fetch( "/api/anime" )
		const list = await res.json()

		this.setState( { list: list } )
	}

	componentDidMount() {
		this.InitList()
	}

	render() {
		return (
			<div>
				<div className="anime">Мои оценочки с myanimelist.net</div>
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