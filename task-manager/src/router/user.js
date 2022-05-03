const express = require('express')
const { User } = require('../model/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = new express.Router()

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token)
        console.log(req.user.tokens)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})
//透過 登入驗證則不能再直接訪問
// router.get('/user/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) res.status(404).send()
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

router.post('/user', async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save() // 儲存資料庫
        const userToken = new User
        const token = userToken.generateAuthToken(newUser)
        // send返回值
        res.status(200).send({ newUser, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/user/me', auth, async (req, res) => {
    const updateArr = Object.keys(req.body)
    const updateAllow = ['name', 'age', 'password', 'email', '__v']
    const state = updateArr.every(update => updateAllow.includes(update))
    if (!state) return res.status(400).send({ error: 'is not find key' })
    //改成me 不需要了
    // const user = await User.findById(req.params.id)
    updateArr.forEach(item => {
        req.user[item] = req.body[item]
    })
    await req.user.save()
    if (!req.user) return res.status(404).send()
    res.send(req.user)
    //無法觸發save()方法
    // try {
    //     const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //     res.status(200).send(data)
    // } catch (error) {
    //     res.status(404).send(error)
    // }
})

router.post('/user/login', async (req, res) => {
    try {
        console.log(req.body, res.body)
        const user = await User.findByAccount(req.body.name, req.body.password)
        const userToken = new User
        const token = await userToken.generateAuthToken(user)
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }

})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fieldSize: 100000 //限制檔案大小
    },
    // 副檔名判斷
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return callback(new Error('please upload a picture!'))
        }
        callback(undefined, true)
    }
})
// 上傳檔案
// single('avatar')的avatar為上傳檔案的key
router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    // 客製錯誤訊息
    res.status(400).send({ error: error.message })
})

// 刪除檔案
router.delete('/user/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
// 透過用戶ID取得頭像
router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

    // :id的code
    // try {
    //     const data = await User.findByIdAndDelete(req.params.id)
    //     res.status(200).send(data)
    // } catch (error) {
    //     res.status(500).send(error)
    // }
})

module.exports = router