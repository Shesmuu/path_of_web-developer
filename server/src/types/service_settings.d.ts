import { Application } from "express"
import { Connection } from "mysql2"

export interface ServiceSettings {
	express: Application
	db: Connection
	anime_list: ListAnime[]
	validate: ( url: string, pattern: ValidatePattern ) => void
}