import { ServiceSettings } from "../types/service_settings"
import express from "express"
import bodyParser from "body-parser"

const init = ( settings: ServiceSettings ) => {
	settings.express = express()
	settings.express.use( bodyParser.json() )
	settings.express.use( bodyParser.urlencoded( { extended: true } ) )
}

export { init }