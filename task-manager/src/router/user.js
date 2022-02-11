const express = require('express')
const { User } = require('../model/user')
const router = new express.Router()
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
        // send返回值
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/user/:id', async (req, res) => {
    const updateArr = Object.keys(req.body)
    const updateAllow = ['name','age','__v']
    const state = updateArr.every(update=>updateAllow.includes(update))
    if(!state) return res.status(400).send({error:'is not find key'})
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
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