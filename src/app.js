

const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express ()

const port =process.env.PORT || 3000

const PublicDirectoryPath = path.join( __dirname , '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(PublicDirectoryPath))


//route handler
app.get('',(req,res)=> {
    res.render ('index',{
        tittle:'weather',
        name:'komal yadav'
    })
})

//route handler
app.get('/about',(req,res)=> {
    res.render ('about',{
        tittle:'About me',
        name:'pramod yadav'
    })
})


//route handler
app.get('/help',(req,res)=> {
    res.render ('help',{
        HelpText:'help me',
        tittle:'help page',
        name:'sudhakar yadav'
    })
})





app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({

            error:"you must provide an address"

        })    }


        geocode(req.query.address,(error , { latitude, longitude, location  }={} )=> {

            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=>{

                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })

            })

        })

    })

    app.get('/help/*',(req,res) => {

        res.render('404',{
    
            tittle:'404',
            name:'unknown help',
            errorMessage:'help not found.'
        })
    
    })







app.get('*',(req,res) => {

    res.render('404',{

        tittle:'404',
        name:'unknown',
        errorMessage:'page not found.'
    })

})


app.listen(port,() => {
    console.log('server is up on port '+ port)
})