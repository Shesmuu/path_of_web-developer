import { init as express } from "./services/express"
import { init as database } from "./services/database"
import { init as auth } from "./services/auth"
import { init as server } from "./services/server"
import http from "http"
import bodyParser from "body-parser"
import mySql from "mysql2"

import { init_services as init } from "./utils/init_services"

init( [
	express,
	database,
	auth,
	server
] )