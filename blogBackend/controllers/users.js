const userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
//const logger = require("../utils/logger")

userRouter.get("/", async (req, res) => {
    const users = await User
        .find({})
        .populate(
            "blogs",
            {
                title: 1,
                likes: 1
            }
        )
    res.json(users)
})

userRouter.get("/:userName", async (req, res) => {
    const userName = req.params.userName
    const user = await User
        .findOne({ userName })
        .populate(
            "blogs",
            {
                title: 1,
                likes: 1
            }
        )
    res.json(user)
})

userRouter.post("/", async (req, res, next) => {
    const { userName, name, password } = req.body

    if (!userName) {
        res.status(400).json({error: "Username is empty"})
    }
    else if (!password) {
        res.status(400).json({error: "Password is empty"})
    }
    else if (userName.length < 3) {
        res.status(400).json({error: "UserName should contain at least 3 characters"})
    }
    else if (password.length < 3) {
        res.status(400).json({error: "Password should contain at least 3 characters"})
    }
    else if (userName.includes(" ")) {
        res.status(400).json({error: "Username should not contain whitespaces"})
    }
    
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = User({
            userName,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    }
    catch(ex) {
        next(ex)
    }
})

module.exports = userRouter
