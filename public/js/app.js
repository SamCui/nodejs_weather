

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    let url='/weather?address='+location
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(url).then((response)=>{
        //console.log(response)
        response.json().then((data)=>{
            //console.log(error)
            //console.log(data)
            if(data.error)
            {
                messageOne.textContent=data.error
            }
            else{
                messageOne.textContent=data.temperature
                messageTwo.textContent=data.feelslike
            }
        })
    })
})