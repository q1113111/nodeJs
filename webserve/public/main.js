const search = document.querySelector('input')
const btn = document.querySelector('button')
const message = document.querySelector('#message')
btn.addEventListener('click', async () => {
    const local = encodeURI(search.value)
    try {
        const data = await (await fetch(`http://localhost:3000/weather?city=${local}`)).json()
        console.log(data)
        if(data.error){
           return  message.textContent=data.error
        }
        message.textContent=data.datasetDescription
    } catch (error) {
        console.log(error)
        message.textContent=error.error
    }
})