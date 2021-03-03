import { Request, Response } from "express"
import { Connection } from "mysql2"
import validate from "../validation/auth"

interface LoggedData {
	is_logged: boolean
	error?: unknown
}

interface AuthData {
	name?: string
	pass_hash?: string
}

const init = ( settings: ServiceSettings ) => {
	const { express, db } = settings

	const is_name_taken = async ( name: string ) => {
		const [[taken]] = await db.query( "select count(1) as 'count' from `users` where lower(name)=lower(?)", [name] )
		return taken.count > 0
	}

	const get_logged = async ( client_key: string | undefined, res: Response ) => {
		let logged: LoggedData = {
			is_logged: false
		}

		if ( client_key ) {
			const [[auth]] = await db.query( "select userid from `users` where auth_hash=(?)", [client_key] )
				
			if ( auth ) {
				const [[user]] = await db.query( "select * from `users` where userid=(?)", [auth] )
				logged = user
				logged.is_logged = true
			}
		}

		res.send( logged )
	}

	express.post( "/api/auth/is_name_taken", async ( req: Request, res: Response ) => {
		const taken = await is_name_taken( req.body.name )
		res.send( { name: req.body.name, taken: taken } )
	} )

	express.post( "/api/auth/login", () => {
		
	} )

	express.post( "/api/auth/register", async ( req: Request, res: Response ) => {
		if ( is_name_taken( req.body.name ) ) {

		} else {
			await db.query(
				"insert into `users` ( `name`, `pass_hash`, `permissions` ) --\
				values ( ?, ?, 0 ) --\
				on duplicate key ignore `name` = `name`"
				[req.body.name, req.body.pass_hash]
			)
		}
	} )

	express.post( "/api/auth/logout", () => {} )

	express.get( "/api/auth/get_logged", ( req: Request, res: Response ) => {
		const cookies = req.get( "Cookie" ) as Cookies
		const client_key = cookies ? cookies.client_key : undefined

		res.send( {} )
		
		//get_logged( client_key, db, res )
	} )

	validate( settings )
}

export { init }