import { useEffect, useState } from "react";
import './App.css';
import { DailyForecast } from "./components/DailyForecast";
// import { TemperatureChart } from "./TemperatureChart";

function App() {

  const [data, setData] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [greenhouseTemp, setGreenhouseTemp] = useState("")

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


  return (
    <div className="App">
      <div>

        <h3>Current Clotch Temp:</h3> {greenhouseTemp}F
      </div>
      <DailyForecast dailyWeather={dailyWeather} />
      {/* <TemperatureChart d={data} /> */}
    </div>
  );
}

export default App;
