interface ServerSettings {
	port: number
	db_host: string
	db_port: number
	db_user: string
	db_pass: string
	db_name: string
}

interface ServiceSettings {
	express: Application
	db: Connection
	anime_list: ListAnime[]
	validate: ( url: string, pattern: ValidatePattern ) => void
}

interface ListAnime {
	score: number
	title: string
	mal: string
	image: string
}

type Cookies = undefined | {
	client_key: string | undefined
}

interface AuthData {
	login?: string
	password?: string
	confrim_password?: string
}

declare const enum AuthEnum {
	name_len = 24,
	pass_hash_len = 256
}