const request = require('supertest')
const app = require('../src/app')
const { User } = require('../src/model/user')

const { userOneId, userOne, setupDatabase } = require('./fixtures/db')
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'mike',
    email: 'mike@gmail.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

//執行測試前 刪除所有資料
beforeEach(setupDatabase)

test('sing up a new user', async () => {
  const response =   await request(app).post('/user').send({
        name: 'andrew',
        email: 'tatas@gamil.com',
        password: '123132'
    }).expect(200)
    const user = await User.findById(response._body.newUser._id)
    //獲得詳細資訊
    expect(user).not.toBe(null)
    expect(response._body).toMatchObject({
        newUser: {
            name: 'andrew'
        }
    })
})

test('Should login existing user', async () => {
   await request(app).post('/user/login').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    }).expect(200)

})

test('Should not login nonexistent user', async () => {
    await request(app).post('/user/login').send({
        name: userOne.name,
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    // console.log(`Bearer ${userOneId},${userOne.tokens[0].token}},`)
    await request(app)
        .get('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200)
})
test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/user/me')
        .send()
        .expect(401)
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/user/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    // attach 圖片上傳
    await request(app)
        .post('/user/me/avatar')
        .set('Authorization', userOne.tokens[0].token)
        .attach('avatar', 'test/fixtures/view.jpeg')
        .expect(200)
    const user = await User.findById(userOneId)
    // toEqual 比較物件類型 Buffer類型
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() => {
    await request(app)
        .patch('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async() => {
    await request(app)
        .patch('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})
//執行測試後
afterEach(async () => {
    // console.log('after is done')
})