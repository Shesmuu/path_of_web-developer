import { createHash } from "crypto"

export const RandomInt = ( min: number, max: number ): number => {
	const d = max - min + 1
	const i = Math.random() * d

	return min + Math.floor( i )
}

export const PasswordHash = ( str: string ): string => {
	return createHash( "sha512" ).update( str + "q2e4t53f4" ).digest( "hex" )
}