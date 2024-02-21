const express = require('express');
const router = express.Router();

const zod = require("zod");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../authMiddleware");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post('/signup', async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;

    // Create new account
    await Account.create({
        userId: userId,
        balance: 1 + Math.floor(Math.random() * 10000),
    })

    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token,
    });
});

router.post('/signin', async (req, res) => {
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs",
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(!user){
        return res.status(411).json({
            message: "Error while logging in",
        })
    }
    const userId = user._id;

    const token = jwt.sign({
        userId: userId,
    }, JWT_SECRET);

    res.status(200).json({
        token: token
    });

});

router.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information",
        });
    }


    await User.updateOne({
        _id: req.userId,
    }, req.body);


    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findOne({
        _id: req.userId
    });

    return res.json({
        user: user
    })
})

module.exports = router;