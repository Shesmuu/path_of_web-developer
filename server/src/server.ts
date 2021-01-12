import express, { Request, Response } from "express"
import http from "http"
import bodyParser from "body-parser"
import mySql from "mysql2"

( () => {
	const serverSettings = require( "../server_settings.js" ) as ServerSettings
	const expressApp = express()
	expressApp.use( bodyParser() )

	const databasePool = mySql.createPool( {
		host: serverSettings.DB_HOST,
		user: serverSettings.DB_USER,
		password: serverSettings.DB_PASS,
		database: serverSettings.DB_NAME
	} )

	expressApp.get( "/api/test", ( req: Request, res: Response ) => {
		res.send( "[\"trash\"]" )
		res.end()
	} )

	const server = http.createServer( expressApp )
	server.listen( serverSettings.PORT )
} )()