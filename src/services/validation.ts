import { Request, Response } from "express"
import { request_error } from "../util/common"

const validate = ( pattern: Pattern, something: any, res: Response, my_paranoia: any[] ) => {
	if ( pattern.optional && ( something === undefined || something === null ) ) {
		return
	}

	const t = typeof( something )
	const invalid_type_msg = (
		"Invalid type, pattern type: " +
		pattern.type +
		", sent type: " +
		t +
		", sent something: " +
		( something.toString ? something.toString() : "unknown" )
	)

	if ( pattern.type === PatternType.number ) {
		if ( t !== "number" ) {
			request_error( res, invalid_type_msg, 400 )
		} else if ( pattern.max_length !== -1 && something.toString().length > pattern.max_length ) {
			request_error( res, "Invalid number length, number: " + something, 400 )
		}
	} else if ( pattern.type === PatternType.string ) {
		if ( t !== "string" ) {
			request_error( res, invalid_type_msg, 400 )
		} else if (
			( pattern.max_length !== -1 && something.length > pattern.max_length ) ||
			( pattern.min_length && something.length < pattern.min_length )
		) {
			request_error( res, "Invalid string length, string: " + something, 400 )
		}
	} else if ( pattern.type === PatternType.array ) {
		if ( !Array.isArray( something ) ) {
			request_error( res, invalid_type_msg, 400 )
		}

		if ( my_paranoia.includes( something ) ) {
			request_error( res, "It was not paranoia", 500 )
		}

		my_paranoia.push( something )

		something.forEach( ( s: any ) => validate( pattern.content_pattern, s, res, my_paranoia ) )
	} else if ( pattern.type === PatternType.kv ) {
		if ( t !== "object" || Array.isArray( something ) ) {
			request_error( res, invalid_type_msg, 400 )
		}

		if ( my_paranoia.includes( something ) ) {
			request_error( res, "It was not paranoia", 500 )
		}

		my_paranoia.push( something )

		for ( let key in something as object ) {
			if ( !pattern.kv[key] ) {
				request_error( res, "Unknown key of values", 400 )
			}

			validate( pattern.kv[key], something[key], res, my_paranoia )
		}
	}
}

const init = ( settings: ServiceSettings ) => {
	const validations: { [key: string]: Pattern } = {}

	settings.validate = ( url: string, pattern: Pattern ) => {
		validations[url] = pattern
	}

	settings.express.use( ( req: Request, res: Response, next: () => void ) => {
		const pattern = validations[req.url]
		
		if ( pattern ) {
			validate( pattern, req.body, res, [] )
		}

		next()
	} )
}

export { init }