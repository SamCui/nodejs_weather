const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request= require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index', {
        //title: 'Weather app',
        name: 'sam'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about',
        name: 'sam'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'help',
        name: 'sam'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search)
    {
        return res.send(
            {
                error: "You must provide a search term"
            }
        )
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send(
            {
                error: "You must provide an address"
            }
        )
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            //console.log(error)
            return res.send({error: error})
        }
     
        forecast(latitude, longitude, (error, forcastData)=>{
            if(error)
            {
                return res.send({error: error})
            }
            //console.log(data.location)
            return res.send(forcastData)
        })
    })

 /*    console.log(req.query.address)
    const data ={forecast: 'it\s raining all day', location: req.query.address}
    console.log(data)
    res.send({
        data
    }) */
})

app.get('/help/*', (req,res)=>{
    res.render('404page', {
        title: 'help article not found',
        name: 'sam'
    })
})

app.get('*', (req,res)=>{
    res.render('404page', {
        title: 'page not found',
        name: 'sam'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})