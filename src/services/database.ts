import mysql from "mysql2/promise"

const server_settings = require( "../../server_settings.js" ) as ServerSettings

const init = ( settings: ServiceSettings ) => {
	settings.db = mysql.createPool( {
		host: server_settings.db_host,
		user: server_settings.db_user,
		password: server_settings.db_pass,
		database: server_settings.db_name
	} )
}

export { init }