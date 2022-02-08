console.log('hello node.js')

const fs = require('fs')
// fs.writeFileSync('note.txt','hello node.js') //寫入檔案
fs.appendFileSync('note.txt','hello two') //追加檔案內容

const obj = require('./utils')
console.log(obj.add(1,1))
console.log(obj.sub(1,1))

const validator = require('validator')
console.log(validator.isEmail('q11@ww.cs'))