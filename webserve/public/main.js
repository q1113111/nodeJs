const search = document.querySelector('input')
const btn = document.querySelector('button')
btn.addEventListener('click', async () => {
    const local = encodeURI(search.value)
    try {
        const data = await (await fetch(`http://localhost:3000/weather?city=${local}`)).json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})