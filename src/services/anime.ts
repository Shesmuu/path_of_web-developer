import { Request, Response } from "express"
import https from "https"

interface ListAnime {
	score: number
	title: string
	mal: string
	image: string
}

const create_anime_list = async ( settings: ServiceSettings ) => {
	try {
		const request = https.get( "https://api.jikan.moe/v3/user/shesmu/animelist", ( res ) => {
			let body = ""

			res.on( "data", ( chunk: string ) => {
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

				settings.anime_list = list
			} )
		} ).on( "error", ( err ) => {
			console.log( err ) 
		} )
	} catch ( error: unknown ) {
		console.log( "Bad api.jikan.moe request" )
	}
}

const init = ( settings: ServiceSettings ) => {
	settings.anime_list = []

	create_anime_list( settings )

	setInterval( () => create_anime_list( settings ), 30 * 60 * 1000 )

	settings.express.get( "/api/anime_list", ( req: Request, res: Response ) => {
		res.send( settings.anime_list )
	} )
}

export {
	init
}