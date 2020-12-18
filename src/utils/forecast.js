const request = require('request')
/*
const url='http://api.weatherstack.com/current?access_key=73af31c9e2b6a1864c543db24a6c503a&query=knoxville&units=f'
request({url: url, json: true}, (error, response)=>{
    //console.log(response)
    if(error){
        console.log('cannot connect to service')
    }
    else if(response.body.error)
    {
        console.log(response.body.error.type)
        console.log(response.body.error.info)
        console.log(response.body.error.code)
    }
    else {
        const data = response.body
        console.log(data.current.temperature)
        console.log(data.current.feelslike)
    }
})  
*/


const forecast = (latitude, longitude, cb) =>{
    const url='http://api.weatherstack.com/current?access_key=73af31c9e2b6a1864c543db24a6c503a&query='+ latitude+','+longitude+'&units=f'
    //console.log(url)
    request({url: url, json: true}, (error, response)=>{
        if (error){
            cb('unable to connect to weather services')
        }
        else if (response.body.error)
        {
            cb(
                //{
                // errortype: response.body.error.type,
                // errorinfo: response.body.error.info,
                // errorcode: response.body.error.code   
                //}
                'unable to find location'
            , undefined)
        }
        else{
            cb(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                windspeed: response.body.current.wind_speed
            })
        }
    })
}

module.exports= forecast

