export const RandomInt: ( a: number, b: number ) => number = ( min, max ) => {
	const d = max - min + 1
	const i = Math.random() * d

	return min + Math.floor( i )
}