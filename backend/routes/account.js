const express = require('express');
const { authMiddleware } = require('../authMiddleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const userAccount = await Account.findOne({
        userId: userId
    });

    return res.json({
        balance: userAccount.balance,
    })

});

// Bad solution (does not use transactions)
// router.post('/transfer', authMiddleware, async (req, res) => {
//     const {to, amount} = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if(account.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if(!toAccount){
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     });

//     res.json({
//         message: "Transfer successful"
//     });
// });

// Good solution (uses txns in db)
router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to, amount} = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // Perform the transfer
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    });

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;