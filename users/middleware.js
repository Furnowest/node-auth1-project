function restrict() {
	// Create a middleware function that restricts routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next)=> {
		try{
			const { usernmae, password } = req.headers
			if (!usernmae || !password){
				return res.status(401).json({
					message: "Invalid creds"
				})
			}

		}catch(err){
			next(err)
		}
	}
}

module.exports = {
	restrict,
}