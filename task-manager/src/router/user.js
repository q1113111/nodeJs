const express = require('express')
const { User } = require('../model/user')
const auth = require('../middleware/auth')
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
router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/user', async (req, res) => {
    console.log(req.body)
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

router.patch('/user/:id', async (req, res) => {
    const updateArr = Object.keys(req.body)
    const updateAllow = ['name', 'age', 'password', 'email', '__v']
    const state = updateArr.every(update => updateAllow.includes(update))
    if (!state) return res.status(400).send({ error: 'is not find key' })

    const user = await User.findById(req.params.id)
    updateArr.forEach(item => {
        user[item] = req.body[item]
    })
    await user.save()
    if (!user) return res.status(404).send()
    res.send(user)
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
        const user = await User.findByAccount(req.body.email, req.body.password)
        const userToken = new User
        const token = await userToken.generateAuthToken(user)
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }

})
router.delete('/user/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router