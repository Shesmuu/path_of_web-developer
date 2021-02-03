import { Response } from "express"

const init_services = ( services: Array<( settings: ServiceSettings ) => void> ) => {
	const settings = {} as ServiceSettings

	for ( let init of services ) {
		init( settings )
	}
}

const request_error = ( res: Response, message: string, status?: number ) => {
	res.status( 500 || status ).send( message )

	throw( message )
}

export {
	init_services,
	request_error
}