import { ServiceSettings } from "../types/service_settings"
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

const is_valid_data = ( auth_data: AuthData, res: Response ) => {
	const check = ( key: keyof AuthData, type: string, len: number, err: string ): boolean => {
		const v = auth_data[key]

		if ( v ) {
			const str = v.toString()

			if (
				typeof( v ) !== type ||
				!str ||
				str.length > len
			) {
				res.status( 400 ).send( { error: err } )

				return true
			}
		}

		return false
	}

	if ( check( "name", "string", AuthEnum.name_len, "Invalid name" ) ) { return }
	if ( check( "pass_hash", "string", AuthEnum.pass_hash_len, "Invalid password hash" ) ) { return }
}

const is_name_taken = async ( name: string, db: Connection ): Promise<boolean> => {
	try {
		const [taken] = await db.query( "select count(1) from `users` where lower(name)=lower(?)", [name] )

		return taken[0]["count(1)"] > 0
	} catch( err: unknown ) {
		return true
	}
}

const get_logged = async ( client_key: string | undefined, db: Connection, res: Response ) => {
	let logged: LoggedData = {
		is_logged: false
	}

	if ( client_key ) {
		try {
			const auth = await db.query( "select userid from `users` where auth_hash=(?)", [client_key] )[0]
			
			if ( auth ) {
				const user = await db.query( "select * from `users` where userid=(?)", [auth] )[0]
				logged = user
				logged.is_logged = true
			}
		} catch( err: unknown ) {
			logged.error = err
		}
	}

	res.send( logged )
}

const init = ( settings: ServiceSettings ) => {
	const { express, db } = settings

	express.post( "/api/auth/is_name_taken", async ( req: Request, res: Response ) => {
		const taken = await is_name_taken( req.body.name, db )

		res.send( { name: req.body.name, taken: taken } )
	} )

	express.post( "/api/auth/login", () => {
		
	} )

	express.post( "/api/auth/register", ( req: Request, res: Response ) => {
		
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

export {
	init
}