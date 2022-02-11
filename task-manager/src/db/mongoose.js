const mongoose = require('mongoose');
const { User } = require('../model/user')
// 後面為數據庫名稱
mongoose.connect('mongodb://localhost:27017/task-manager-api');


// const me = new User({
//     name:'Sam',
//     age:30,
//     email:'q1113111@gmail.com'
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// });