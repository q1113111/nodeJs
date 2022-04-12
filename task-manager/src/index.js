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

// 獲取task關聯的用戶
const Task = require('./model/task');
const { User } = require('./model/user.js');

const main = async()=>{
    // 顯示owner 關聯的用戶ID全部資料
    // const task = await Task.findById('620b3274041f4624e9a80112').populate('owner')
    // console.log(task.owner)
    // 在user.js使用視圖關聯
    const user = await User.findById('620b324d041f4624e9a80105').populate('tasks')
    console.log(user.tasks)
}
// main()
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

