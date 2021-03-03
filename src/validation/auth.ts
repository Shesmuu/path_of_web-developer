const is_name_taken: KVPattern = {
	type: PatternType.kv,
	kv: {
		name: {
			type: PatternType.string,
			max_length: 24
		} as StringPattern
	}
}

const register: KVPattern = {
	type: PatternType.kv,
	kv: {
		name: {
			type: PatternType.string
		} as StringPattern,
		pass_hash: {
			type: PatternType.string,
			min_length: 128,
			max_length: 128
		} as StringPattern
	}
}

export default ( settings: ServiceSettings ) => {
	settings.validate( "/api/auth/is_name_taken", is_name_taken )
	settings.validate( "/api/auth/register", register )
}