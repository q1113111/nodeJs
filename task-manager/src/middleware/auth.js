const jwt = require('jsonwebtoken')//驗證
const { User } = require('../model/user')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        // const decode = jwt.verify(token,'isMyToken')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) throw new Error()
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'please token' })
    }
}
module.exports = auth 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJjMDdkMDdmNTYxNzBjYWU3NzI3MzMiLCJpYXQiOjE2NjM4Mjk5Njh9.FS8aqCtYix_3GIVmekIaK_w7kTVP2nqJ-IlVF2mqwuk