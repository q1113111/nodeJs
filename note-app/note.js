const fs = require('fs')
const addNote = (title, body) => {
    const notes = loadNote()
    const repeat = notes.filter(item => item.title === title)
    if (repeat.length === 0) {
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
    listNode
}