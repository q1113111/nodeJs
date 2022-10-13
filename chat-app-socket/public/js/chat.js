const socket = io()
console.log(socket,'soket')
document.getElementById('increment').addEventListener('click', () => {
    console.log(456)
    socket.emit('increment')

})
socket.on('connect',()=>{
    console.log('is connenct')
})
const $messageForm = document.getElementById('message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')
const $sendLocationBtn = document.getElementById('send-location')
const $messages = document.getElementById('messages')

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

$messageForm.addEventListener('submit', e => {
    e.preventDefault()

    $messageFormBtn.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value
    console.log(456)
    socket.emit('sendMessage', message, error => {
        console.log('Message delivered')
        $messageFormBtn.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered')
    })
})

$sendLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    $sendLocationBtn.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationBtn.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

socket.on('countUpdated', e => {
    console.log(e)
})
const html = []
socket.on('locationMessage', e => {
    html.push(`<p><a href=${e.text}" target="_blank">${e.text}</a>- ${moment(e.createAt).format('h:mm a')}</p>`)
    $messages.innerHTML = html.join('')
})


socket.on('message', e => {
    console.log(e)
    html.push(`<p>${e.text}-${moment(e.createAt).format('h:mm a')}</p>`)
    $messages.innerHTML = html.join('')
})

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error)
        location.href='/'
    }

})
socket.send((e)=>{
    console.log(args,e,'send')
})