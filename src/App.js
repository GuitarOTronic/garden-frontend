import { useEffect, useState } from "react";
import './App.css';
import { DailyForecast } from "./components/DailyForecast";
import { getCurrentTime, timedFunctionCall } from "./clockService";
import { getGreenhouseTemp } from "./services/temperatureService";
// import { TemperatureChart } from "./TemperatureChart";

function App() {

  const [data, setData] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [greenhouseTemp, setGreenhouseTemp] = useState("")


  const [currentTime, setCurrentTime] = useState("")
  const getCurrentTime = () => {
    let currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return setCurrentTime(`${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
  }
  const ONE_MINUTE = 60000;
  const TEN_MINUTES = 600000;

  // fetch temperature data from DB
  useEffect(() => {
    const getData = async () => {
      const request = new Request("http://192.168.1.3:8081/temperature", { method: "GET" })
      try {
        fetch(request)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setData(data.response)
          })
          .catch(err => console.error(err));
      }
      catch (err) {
        console.error(err)
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const getDailyWeatherData = async () => {
      const request = new Request("http://192.168.1.3:8081/temperature/dailyForecast")
      try {
        fetch(request)
          .then(res => {
            return res.json()
          })
          .then(({ data }) => {
            setDailyWeather(data.daily)
          })
      }
      catch (err) {
        console.error(err);
      }
    }
    getDailyWeatherData()
  }, [])

  useEffect(() => {
    const getGreenhouseTemp = async () => {
      const request = new Request("http://192.168.1.3:8081/temperature/current")
      try {
        fetch(request)
          .then(res => {
            return res.json()
          })
          .then((data) => {
            setGreenhouseTemp(data.currentTemp)
          })
      }
      catch (err) {
        console.error(err);
      }
    }
    getGreenhouseTemp()
  }, [])



  useEffect(() => {
    const startClockRoutine = () => {
      timedFunctionCall(ONE_MINUTE, getCurrentTime);
    }
    startClockRoutine();
  }, [])

  useEffect(() => {
    const startCurrentTempRoutine = () => {
      timedFunctionCall(TEN_MINUTES, () => getGreenhouseTemp(setGreenhouseTemp))
    }
    startCurrentTempRoutine()
  }, [])

  return (
    <div className="App">
      <div className="current-time">{currentTime}</div>
      <div className="data-container">
        <div className="left-column">
          <h3>Current Clotch Temp:</h3>
          <div>{greenhouseTemp} <sup>ºF</sup></div>
        </div>
        <div className="right-column">
          <DailyForecast dailyWeather={dailyWeather} />
        </div>
      </div>
      {/* <TemperatureChart d={data} /> */}
    </div>
  );
}

export default App;
