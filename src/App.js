import { useEffect, useState } from "react";
import './App.css';
import { TemperatureChart } from "./TemperatureChart";

function App() {

  const [data, setData] = useState([]);

  // fetch temperature data from DB
  useEffect(() => {
    const getData = async () => {
      const request = new Request("http://192.168.1.3:8081/temperature", {method: "GET"})
      try{
        fetch(request)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setData(data.response)
        })
        .catch(err => console.error(err));
      }
      catch(err){
        console.error(err)
      }
    }
    getData();
  }, []);


  return (
    <div className="App">
      {/* {data.map((datum, i) => {
        if(i < 10) console.log(datum)
      })} */}
      {/* <TemperatureChart d={data} /> */}
    </div>
  );
}

export default App;
