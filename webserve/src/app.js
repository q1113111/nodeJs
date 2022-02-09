const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const { getWeather } = require('./utils')
//設置首頁資訊 
// app.get('/',(req,res)=>{
//     res.send('hello express')
// })

// 使用 nodemon scr/app.js -e js,hbs 監聽兩個副檔案


//hbs模板設置
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
//使用header.hbs
hbs.registerPartials(partialsPath, function (err) { });

app.get('', (req, res) => {
    res.render('index', {
        author: 'Sam',
        content: 'Hello hbs'
    })
})

// 靜態頁面路徑設定
const pathPublic = path.join(__dirname, '../public')
app.use(express.static(pathPublic))
// 控制網址傳入參數
app.get('/weather', (req, res) => {
    const city = req.query.city
    if(!city){
        return res.send({
            error:'請填入縣市'
        })
    }
    getWeather(city,(data)=>{
        //JSON格式
        res.send(data)
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        author: 'Sam',
        content: 'Hello hbs'
    })
})

//help 子頁 not find 
app.get('/help/*', (req, res) => {
    res.render('404', {
        author: 'Sam',
        content: 'Hello hbs',
        errorMessage: 'help subs not find page'
    })
})


//404 not find 
app.get('*', (req, res) => {
    res.render('404', {
        author: 'Sam',
        content: 'Hello hbs',
        errorMessage: 'not find page'
    })
})





app.listen(3000)