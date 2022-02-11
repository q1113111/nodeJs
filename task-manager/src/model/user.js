const mongoose = require('mongoose');
const validator = require('validator')
const User = mongoose.model('User', {
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
    email:{
        type:String,
        validate(v){
            if(!validator.isEmail(v)){
                throw new Error('is not email format')
            }
        }
    }
})

module.exports = {
    User
}