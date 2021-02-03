interface ServerSettings {
	PORT: number
	DB_HOST: string
	DB_PORT: number
	DB_USER: string
	DB_PASS: string
	DB_NAME: string
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