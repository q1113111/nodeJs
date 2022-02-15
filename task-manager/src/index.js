const express = require('express')
require('./db/mongoose.js')
const bcrypt = require('bcrypt');
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// 測試bcrypt
const bcryptFn = async()=>{
    const password = 'Red12345'
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password,hashedPassword)
    console.log(isMatch)
}

// 測試token 
const tokeFn = async()=>{
    // sing (帳號,加密代碼,有效期限)
    const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
    console.log(token)

    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

app.listen(port, () => {
    console.log('Server is' + port)
})