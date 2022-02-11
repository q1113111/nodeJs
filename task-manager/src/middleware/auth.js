const jwt = require('jsonwebtoken')//驗證
const { User } = require('../model/user')
const auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization')
        const decode = jwt.verify(token,'isMyToken')
        console.log(decode,'defined')
        const user = await User.findOne({_id:decode._id,'tokens.token':token})
        // console.log(user)
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error:'please token'})
    }
}
module.exports = auth 