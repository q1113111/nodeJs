const calculateSum = (a, b) => a + b

const asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) return reject('number must be non-negative')
            resolve(a + b)
        }, 2000)
    })
}
module.exports = {
    calculateSum,
    asyncAdd
}