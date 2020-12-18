const request = require('request')

const geocode = (address, cb) =>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FtY3VpMjAxOCIsImEiOiJja2k5Nm9vcGIwY3hqMnhsZzh3Y3NpaGt4In0.DbScc5S9EF8ZqTT5jhIlXw&limit=1'
    //console.log(url)
    request({url: url, json: true}, (error, response)=>{
        //console.log(response.body)
        if (error){
            cb('unable to connect to location services')
        }
        else if (response.body.features.length===0)
        //else if(response.body.features.length===0) //does not work when no address is provided
        {
            cb('unable to find location. try another search')
        }
        else{
            cb(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports= geocode