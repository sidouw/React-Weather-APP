
// API KEY f81d7020da47e45a50fb7073c68d6955 in a real world scenarion this should be in an envirement variable
//afetr waiting almosy two houres for the api key to be activated it didn't work with most of thr Apis so i used mapbox instead
const getGeoWeatherData =async (long,lat)=>{
    
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude={minutely}&units=metric&appid=f81d7020da47e45a50fb7073c68d6955'
    const data = await fetch(url)
    return data.json()
}


const geocode = async (adress)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoic2lkb3V3IiwiYSI6ImNrNjhlM2o5cjAzeGczbXBtc21ia21wYnUifQ.D4oF_WIvlWhdKa4r98kEGg&limit=1'
    
    const data = await fetch(url)
    const js = await data.json()
    try {
        console.log(js)
        return {Alt : js.features[0].center[1],
                Long : js.features[0].center[0],
                location:js.features[0].place_name
            }
    } catch (error) {
        return{error:'Location Not Found'}
    }
    
    }

const getLocWeatherData = async (loc)=>{

    const {Alt,Long,error} = await geocode(loc)    
    if(error){
        return {error}
    }
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Alt+'&lon='+Long+'&exclude={minutely,hourly}&units=metric&appid=f81d7020da47e45a50fb7073c68d6955'
    const data = await fetch(url)
    return data.json()
}

export {getGeoWeatherData,getLocWeatherData}