import React from 'react';
import "./DailyForecast.css"

export const DailyForecast = ({dailyWeather}) => {
  if(!dailyWeather.length){
    return null;
  }

  return (
    <div className="forecast-container">
      <h3>Today</h3>
      <span>High {dailyWeather[0].temp.max} <sup>ºF</sup></span>
      <span>Low {dailyWeather[0].temp.min} <sup>ºF</sup></span>
      <span>{`${dailyWeather[0].weather[0].main}: ${dailyWeather[0].weather[0].description}`}</span>
    </div>
  )
}