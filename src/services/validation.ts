import { Request, Response } from "express"
import { request_error } from "../util/common"

const is_number_pattern = ( p: ValidatePattern ): p is NumberPattern => p.type === "number"
const is_string_pattern = ( p: ValidatePattern ): p is StringPattern => p.type === "string"
const is_array_pattern = ( p: ValidatePattern ): p is ArrayPattern => p.type === "array"
const is_kv_pattern = ( p: ValidatePattern ): p is KVPattern => p.type === "kv"

const validate = ( pattern: ValidatePattern, something: any, res: Response, my_paranoia: any[] ) => {
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

	if ( is_number_pattern( pattern ) ) {
		if ( t !== "number" ) {
			request_error( res, invalid_type_msg, 400 )
		} else if ( pattern.length !== -1 && something.toString().length > pattern.length ) {
			request_error( res, "Invalid number length, number: " + something, 400 )
		}
	} else if ( is_string_pattern( pattern ) ) {
		if ( t !== "string" ) {
			request_error( res, invalid_type_msg, 400 )
		} else if ( pattern.length !== -1 && something.length > pattern.length ) {
			request_error( res, "Invalid string length, string: " + something, 400 )
		}
	} else if ( is_array_pattern( pattern ) ) {
		if ( !Array.isArray( something ) ) {
			request_error( res, invalid_type_msg, 400 )
		}

		if ( my_paranoia.includes( something ) ) {
			request_error( res, "It was not paranoia", 500 )
		}

		my_paranoia.push( something )

		something.forEach( ( s: any ) => validate( pattern.content_pattern, s, res, my_paranoia ) )
	} else if ( is_kv_pattern( pattern ) ) {
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
	const validations: { [key: string]: ValidatePattern } = {}

	settings.validate = ( url: string, pattern: ValidatePattern ) => {
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