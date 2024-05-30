import axios from "axios"
import { useEffect,useState } from "react"

const Weather = ({city}) =>{
    const [weather, setWeather] = useState(null)
    const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY
    

    useEffect(()=>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(res =>{
        setWeather(res.data)
      })  
    },[])

    if(!weather) return 
 
    return(
        
        <div>
            <h2>Weather in {city}</h2>
            <div>temperature: {weather.main.temp}</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <div>wind: {weather.wind.speed}</div>
            
        </div>
    )
}

export default Weather