// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });


// const command = process.argv[2]
// if (command === 'add') {
//     console.log('adding note')
// } else if (command === 'delete') {
//     console.log('delete note')
// }

const { argv } = require('process')
const yargs = require('yargs')
yargs.version('1.0.2')
// 使用node app.js --help 查看訊息
// 使用node app.js --version 查看訊息
const note = require('./note')

yargs.command({
    command: 'add',
    description: 'Add new note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true, // 為必填
            type: 'string', // 型別
        },
        body: {
            description: 'Note body',
            demandOption: true, // 為必填
            type: 'string', // 型別
        }
    },
    handler(argv) {
       note.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'remove new note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true, // 為必填
            type: 'string', // 型別
        },
    },
    handler(argv) {
        note.removeNote(argv.title)
    }
})


yargs.command({
    command: 'read',
    description: 'read new note',
    handler(argv) {
        note.readNote(argv.title)
    }
})


yargs.command({
    command: 'list',
    description: 'list new note',
    handler() {
       note.listNode()
    }
})

// console.log(yargs.argv)
yargs.parse()
