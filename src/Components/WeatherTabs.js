import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment'

const WeatherTabs = ({WeatherData})=>{
    return (
        <Tabs>
        <TabList>
        {
            WeatherData.map((Data,index)=>{
                return (
                    <Tab key={index}>{index ===0 ? 'Today': moment.unix(Data.dt).format("ddd")} </Tab>
                )
            })
        }
        </TabList>
        {
            WeatherData.map((Data,index)=>{
                return (
                    <TabPanel key={index}>
                    <div className = 'weather-description'>
                    <img className = 'weather-description__icon' src={'http://openweathermap.org/img/wn/'+Data.weather[0].icon+'@2x.png'}/>
                    <p className = 'weather-description__text'>{Data.weather[0].description },with humidity of {Data.humidity}% and a max temperture of {Data.temp.max}°C</p>
                    </div> 
                    <div className ='weather-info'>
                    <div className ='weather-info__ilem'>
                    <p>Day</p>
                    <p >Feels like : {Data.feels_like.day}°C</p>
                    <p>Temp : {Data.temp.day}°C</p>
                    <p>Humidity : {Data.humidity}%</p>
                    </div>
                    <div className ='weather-info__ilem'>
                    <p>Evening</p>
                    <p >Feels like : {Data.feels_like.day}°C</p>
                    <p>Temp : {Data.temp.day}°C</p>
                    <p>Humidity : {Data.humidity}%</p>
                    </div>
                    <div className ='weather-info__ilem'>
                    <p>Morning</p>
                    <p >Feels like : {Data.feels_like.day}°C</p>
                    <p>Temp : {Data.temp.day}°C</p>
                    <p>Humidity : {Data.humidity}%</p>
                    </div>
                    <div className ='weather-info__ilem'>
                    <p>Night</p>
                    <p >Feels like : {Data.feels_like.day}°C</p>
                    <p>Temp : {Data.temp.day}°C</p>
                    <p>Humidity : {Data.humidity}%</p>
                    </div>
                    </div>
                    </TabPanel>
                )
            })
        }
        </Tabs>
    )
}

export default WeatherTabs