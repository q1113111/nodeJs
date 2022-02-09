const fs = require('fs')
/**
 * 使用debugger 需搭配 node inspect app.js
 * chrome://inspect/#devices 輸入該網址執行
 * 使用restart重複執行
 */
const addNote = (title, body) => {
    const notes = loadNote()
    // const repeat = notes.filter(item => item.title === title)
    const repeat = notes.find(item=>item.title===title)
    debugger
    if (!repeat) {
        notes.push({
            title,
            body
        })
        saveNote(notes)
        console.log('add new data')
    } else {
        console.log('title is repeat')
    }

}

const removeNote = (title) => {
    const note = loadNote()
    const noteFilter = note.filter(item => item.title !== title)
    if (note.length > noteFilter.length) {
        console.log('delete success')
        saveNote(noteFilter)
    } else {
        console.log('not find')
    }
}

const saveNote = (note) => {
    const dataJson = JSON.stringify(note)
    fs.writeFileSync('note.json', dataJson)
}
const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('note.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const readNote = (title)=>{
    const note = loadNote()
    const findNote = note.find(item=>item.title===title)
    if(findNote){
        console.log(findNote.title)
        console.log(findNote.body)
    }else{
        console.log('not find')
    }
}
const listNode = ()=>{
    const note = loadNote()
    console.log('list:')
    note.forEach(item=>{
        console.log(item.title)
    })
}

module.exports = {
    addNote,
    removeNote,
    listNode,
    readNote
}