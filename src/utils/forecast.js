const request = require ('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=faac66e5e3b1b3236167df8912943a1f/' + latitude + ',' + longitude

    request({url, json:true},(error, {body})  => {
if(error){
    callback('unabled to connect to weather service',undefined)
}
else if (body.error){
    callback('unable to find location', undefined)
}
else{
    callback(undefined,body.city.name + ' ' + body.city.coord.lat + ' '+ body.city.coord.lang)
}

    })

}
module.exports=forecast