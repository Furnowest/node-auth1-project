const express = require("express")
const bcrypt = require("bcrypt")
const Users = require("./model")
const { restrict } = require("./middleware")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password,10)     //
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
	
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		// this will check for hush to match
		const passwordValid = await bcrypt.compare(password, user.password)
          if (!passwordValid){
			return res.status(401).json({
				message: "Invalid Credentials",
			})

		  }
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/users",restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})
module.exports = router