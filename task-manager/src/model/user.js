const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 加密功能
const jwt = require('jsonwebtoken')//驗證
const validator = require('validator')

//要使用  bcrypt 和 Middleware觸發轉換
const userSchema = new mongoose.Schema({
    name: {
        trim: true,
        required: [true, 'you must given'],
        type: String
    },
    age: {
        default: 30,
        // min:10,
        // max:60,
        validate(v) {
            if (v < 18 || v > 65) {
                throw new Error('age is not league!')
            }
        },
        type: Number
    },
    email: {
        type: String,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error('is not email format')
            }
        }
    },
    password: {
        type: String,
        min: 8,
        required: true,
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// 自訂義登入驗證方法
userSchema.statics.findByAccount = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw Error('is not login')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error('is not password')
    return user
}
// userSchema.method('to')
//自訂義 toke驗證
userSchema.method('generateAuthToken', async (user)=> {
    const token = jwt.sign({ _id: user._id.toString() }, 'isMyToken')
    user.tokens =[...user.tokens,{token}]
    await user.save()
    return token
})

userSchema.pre('save', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}