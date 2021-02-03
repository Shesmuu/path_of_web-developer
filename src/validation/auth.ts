const is_name_taken: KVPattern = {
	type: "kv",
	kv: {
		name: {
			type: "string",
			length: 40
		} as StringPattern
	}
}

export default ( settings: ServiceSettings ) => {
	settings.validate( "/api/auth/is_name_taken", is_name_taken )
}