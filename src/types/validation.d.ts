type PatternType = "number" | "string" | "array" | "kv"

interface ValidatePattern {
	type: PatternType
	optional?: true
}

interface NumberPattern extends ValidatePattern {
	length: number
}

interface StringPattern extends ValidatePattern {
	length: number
	pattern?: RegExp
	min_length?: number
}

interface ArrayPattern extends ValidatePattern {
	length: number
	content_pattern: ValidatePattern
}

interface KVPattern extends ValidatePattern {
	kv: { [key: string]: ValidatePattern }
}