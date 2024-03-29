const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/model/task')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            description: 'From my test'
        })
        .expect(200)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

//test ideas
//Should not create task with invalid description/completed
//Should not update task with invalid description/completed
//Should delete user task
//Should not delete task if unauthenticated
//Should not update other users task
//Should fetch user task by id 
//Should not fetch user task by id if unauthenticated