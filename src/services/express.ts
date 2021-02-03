import express from "express"
import body_parser from "body-parser"

const init = ( settings: ServiceSettings ) => {
	settings.express = express()
	settings.express.use( body_parser.json() )
	settings.express.use( body_parser.urlencoded( { extended: true } ) )
}

export { init }