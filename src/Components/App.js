import React,{useState} from 'react'
import WeatherTabs from './WeatherTabs'
import Header from './Header'
import {getGeoWeatherData,getLocWeatherData} from './Utils'
import Areamap from './Map'
import Footer from './footer'


const App = ()=>{

const [location,setlocation] = useState('')
const [loading,setloading] = useState(true)
const [disableButtons,setdisableButtons] = useState(false)
const [Error,setError] = useState(false)
const [WeatherData,setWeatherData] = useState([])
const [FullweatherData,setFullweatherData]= useState()

const Locate = (e)=>{
  e.preventDefault()
  setError(false)
  setloading(true)
  setdisableButtons(true)
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getGeoWeatherData(position.coords.longitude,position.coords.latitude).then((data)=>{
        setFullweatherData(data)
        setWeatherData(data.daily)
        setloading(false)
        setdisableButtons(false)
      }).catch((e)=>{
        console.log(e)
        setdisableButtons(false)
      })
    });
  } else {
    alert("your Browser doesn't support geolocation" )
    setdisableButtons(false)
  }
}

const submit = (e)=>{

  e.preventDefault()
  setdisableButtons(true)
  setloading(true)
  if (location.trim()) {
    getLocWeatherData(location).then(data=>{
      setError(false)
      if (!data.error) {
        setFullweatherData(data)
        setWeatherData(data.daily)
        setloading(false)
        setdisableButtons(false)
      }else{
        setError(true)
        setdisableButtons(false)
      }

    })
  }else{
    setdisableButtons(false)
  }
  
}

return(
  <div className = 'container'>
  <Header/>
  <svg className='app-bg' id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Cloud_1_"><g><path d="m421 406h-330c-24.05 0-46.794-9.327-64.042-26.264-17.384-17.069-26.958-39.705-26.958-63.736s9.574-46.667 26.958-63.736c13.614-13.368 30.652-21.995 49.054-25.038-.008-.406-.012-.815-.012-1.226 0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.132 9.838 25.865 22.443 34.587 37.043 14.079-8.733 30.318-13.406 47.219-13.406 44.886 0 82.202 33.026 88.921 76.056 18.811 2.88 36.244 11.581 50.122 25.208 17.383 17.069 26.957 39.704 26.957 63.736s-9.574 46.667-26.957 63.736c-17.249 16.937-39.993 26.264-64.043 26.264zm-330-150c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.146 15.858-8.315-21.049c-13.689-34.651-46.482-57.042-83.544-57.042-49.626 0-90 40.374-90 90 0 3.544.556 7.349 1.144 11.378l2.687 18.622z"/></g></g>
  </svg>
  
  <form className='input-form' onSubmit={submit}>
  <input className='input-form__input' value={location} onChange={e=>setlocation(e.target.value)} placeholder='City Name'/>
  <button disabled={disableButtons} className='input-form__button'  type="button" onClick = {Locate}>
  <svg className='gps-svg' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Find My Location</title><path d="M256,0C138.37,0,42.67,95.7,42.67,213.33c0,158.93,193.27,289.59,201.5,295.08a21.33,21.33,0,0,0,23.67,0c8.23-5.49,201.5-136.16,201.5-295.08C469.33,95.7,373.63,0,256,0Zm0,106.67A106.67,106.67,0,1,1,149.33,213.33,106.79,106.79,0,0,1,256,106.67ZM192,213.33a64,64,0,1,1,64,64A64.07,64.07,0,0,1,192,213.33Z"/></svg></button>
  <button disabled={disableButtons} className='input-form__button' ><svg className='search-svg'  fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><title>Search Location</title><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg></button>
  </form>
  {Error && <p className = 'errorMsg'>Location not Found ! Please enter a valid location</p>}
  {disableButtons&& <p>Loading .......</p>}
  {!loading &&
     <div className = 'container'>
     <h2 className = 'time-zone'>Time Zone {FullweatherData.timezone}</h2>
     <h3>Currently its {FullweatherData.current.temp}°C in {FullweatherData.timezone}</h3>
    <WeatherTabs WeatherData={WeatherData}/>
    <Areamap long={FullweatherData.lon} lat={FullweatherData.lat}/>
  </div>}
    <Footer/>
  </div>
)

}
export default App
