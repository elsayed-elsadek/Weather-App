import searchicon from './Assets/search.png';
import humidity from './Assets/humidity.png';
import wind from './Assets/wind.png';
import drizzle from './Assets/drizzle.png';
import rain from './Assets/rain.png';
import clear from './Assets/clear.png';
import cloud from './Assets/cloud.png';
import snow from './Assets/snow.png';
import './Weather.css';
import { useEffect, useRef, useState } from 'react';

function Weather() {
  const [weatherdata, setweatherdata] = useState(null);
const inputref =useRef();

  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": clear,
    "02n": clear,
    "03d": clear,
    "03n": clear,
    "04d": drizzle,
    "04n": drizzle,
    "09d": cloud,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === ''){
      alert("enter city name")
      return ;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

if(!response.ok){
  alert(data.message)
     inputref.current.value('')
}
      const icon = allicons[data.weather[0].icon] || clear;

      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

    } catch (error) {
     setweatherdata(false);
     console.error(`error in fetching weather data ${error}`)
    }
    inputref.current.value="" ;
  };
  
  useEffect(() => {
    search("london");
    
  }, []);

  return (
    <>
      <div className="weather">  
        <div className='search-bar'>
          <input ref={inputref} type="text" placeholder='Search' />
          <img className='search' src={searchicon} alt="Search-icon" onClick={()=>{search(inputref.current.value)}} />
        </div>

        <div className="col">
          {weatherdata && (
            <>
              <img className='state' src={weatherdata.icon} alt="Weather icon" />
              <h1 className='degree'>{weatherdata.temperature}°C</h1>
              <p className='city'>{weatherdata.location}</p>
            </>
          )}
        </div>



  <div className="info">
          <div className="info1">
            <img src={humidity} alt="Humidity icon" />
            <p>{weatherdata ? weatherdata.humidity + "%" : "N/A"}</p>
            <span>Humidity</span>
          </div>

          <div className="info2">
            <img src={wind} alt="Wind icon" />
            <p>{weatherdata ? weatherdata.windspeed + " Km/h" : "N/A"}</p>
            <span>Wind speed</span>
          </div>
        </div>



   
      </div>
    </>
  );
}

export default Weather;
