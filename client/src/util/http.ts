export const Get = async ( url: string ) => {
	const res = await fetch( url, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
		}
	} )
	const data = await res.json()

	return data
}

export const Post = async ( url: string, body: object | any[] ) => {
	const res = await fetch( url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify( body ),
	} )
	const data = await res.json()

	return data
}