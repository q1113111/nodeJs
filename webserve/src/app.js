const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
//設置首頁資訊 
// app.get('/',(req,res)=>{
//     res.send('hello express')
// })

// 使用 nodemon scr/app.js -e js,hbs 監聽兩個副檔案


//hbs模板設置
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
//使用header.hbs
hbs.registerPartials(partialsPath, function (err) {});

app.get('',(req,res)=>{
    res.render('index',{
        author:'Sam',
        content:'Hello hbs'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        author:'Sam',
        content:'Hello hbs'
    })
})

//help 子頁 not find 
app.get('/help/*',(req,res)=>{
    res.render('404',{
        author:'Sam',
        content:'Hello hbs',
        errorMessage:'help subs not find page'
    })
})


//404 not find 
app.get('*',(req,res)=>{
    res.render('404',{
        author:'Sam',
        content:'Hello hbs',
        errorMessage:'not find page'
    })
})




// help.html路徑設定
const pathPublic = path.join(__dirname,'../public')
app.use(express.static(pathPublic))
app.get('/weather',(req,res)=>{
    //JSON格式
    res.send({
        template:'30度',
        location:'台中市'
    })
})
app.listen(3000)