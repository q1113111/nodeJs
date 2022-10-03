const { calculateSum,asyncAdd } = require('../src/math')

test('math', () => {
    const sum = calculateSum(1, 1)
    expect(sum).toBe(2)
})
 
test('Async test demo', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done() // 非同步執行test
    }, 2000)
})

// test('Async add demo', (done) => {
//     asyncAdd(1,1).then((sum)=>{
//         expect(sum).toBe(2)
//         done()
//     })
// })

test('Async add demo', async() => {
    const sum = await asyncAdd(1,1)
    expect(sum).toBe(2)
})