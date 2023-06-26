const loginRouter = require("express").Router()
const User = require("../models/user")
const config = require("../utils/config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

loginRouter.post("/", async (req, res) => {
    const { userName, password } = req.body

    const user = await User.findOne({ userName })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "invalid userName or password"
        })
    }

    const userForToken = {
        userName: user.userName,
        id: user._id,
    }

    const token = jwt.sign(
        userForToken,
        config.SECRET,
        { expiresIn: 60*60 }
    )

    res
        .status(200)
        .send({ token, userName: user.userName, name: user.name })
})

module.exports = loginRouter
