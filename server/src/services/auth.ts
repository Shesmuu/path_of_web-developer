import { Request, Response } from "express"

const init = ( settings: ServiceSettings ) => {
	const { express, db } = settings

	express.post( "/api/auth/check_name", ( req: Request, res: Response ) => {
		db.query(
			"select count(1) from `users` where lower(name)=lower(?)",
			[req.body.name],
			( err: string | undefined, data: any[] ) => {
				if ( err ) {
					res.status( 601 ).send( { error: err } )

					return
				}

				if ( data[0]["count(1)"] ) {
					res.send( { name: req.body.name, taken: true } )
				} else {
					res.send( { name: req.body.name, taken: false } )
				}
			}
		)
	} )
}

export {
	init
}