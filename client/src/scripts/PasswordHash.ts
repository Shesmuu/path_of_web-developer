import md5 from "md5"

const PasswordHash = ( str: string ): string => {
	return md5( str + "q2e4t53f4" )
}

export default PasswordHash