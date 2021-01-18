import https from "https"
import { Request, Response } from "express"

interface ListAnime {
	score: number
	title: string
	mal: string
	image: string
}

const create_anime_list = async ( settings: ServiceSettings ) => {
	https.get( "https://api.jikan.moe/v3/user/shesmu/animelist", ( res ) => {
		let body = ""

		res.on( "data", ( chunk ) => {
			body += chunk
		} )
	
		res.on( "end", () => {
			const data = JSON.parse( body )
			const list: ListAnime[] = []

			for ( let anime of data.anime ) {
				if ( anime.score ) {
					list.push( {
						score: anime.score,
						title: anime.title,
						mal: anime.url,
						image: anime.image_url
					} )
				}
			}

			list.sort( ( a: ListAnime, b: ListAnime ) => {
				return b.score - a.score
			} )

			settings.animeList = list
		} )
	} )
}

const init = ( settings: ServiceSettings ) => {
	settings.animeList = []

	create_anime_list( settings )

	setInterval( () => create_anime_list( settings ), 300000 )

	settings.express.get( "/api/anime", ( req: Request, res: Response ) => {
		res.send( settings.animeList )
	} )
}

export {
	init
}