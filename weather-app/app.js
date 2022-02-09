const weather = require('./utils.js')
weather.getWeather('臺中市',(data)=>{
    console.log(data)
})
weather.getWeather('臺南市',(data)=>{
    console.log(data)
})