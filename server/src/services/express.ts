import express from "express"
import bodyParser from "body-parser"

const init = ( settings: ServiceSettings ) => {
	settings.express = express()
	settings.express.use( bodyParser() )
}

export {
	init
}