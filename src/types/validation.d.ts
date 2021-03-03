declare const enum PatternType {
	number = 0
	string = 1
	array = 2
	kv = 3
}

interface ValidatePattern {
	optional?: true
}

interface NumberPattern extends ValidatePattern {
	type: PatternType.number
	max_length: number
	min_length?: number
	min?: number
	max?: number
}

interface StringPattern extends ValidatePattern {
	type: PatternType.string
	max_length: number
	pattern?: RegExp
	min_length?: number
}

interface ArrayPattern extends ValidatePattern {
	type: PatternType.array
	max_length: number
	content_pattern: Pattern
}

interface KVPattern extends ValidatePattern {
	type: PatternType.kv
	kv: { [key: string]: Pattern }
}

type Pattern = NumberPattern | StringPattern | ArrayPattern | KVPattern