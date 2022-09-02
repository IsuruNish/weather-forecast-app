import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9d98d05b9005fbf9533b9d30bb3fc292`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=colombo&appid=9d98d05b9005fbf9533b9d30bb3fc292`;

  const searchLoocation = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data);
    });

    setLocation("");
  };

  return (
    <div className="bodyHeight">
      <div className="container pt-5">
        <div className="row centerDiv">
          <div className="col-3">
            <input type="email" className="form-control" placeholder="Enter city name" />
          </div>

          <div className="col-2">
            <button type="button" class="btn btn-primary btn" onClick={searchLoocation}>
              Search
            </button>
          </div>
        </div>

        <h1> {data.name} </h1>
        {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
        {data.weather ? <h1>{data.weather[0].main}</h1> : null}
        {data.main ? <h1>{data.main.feels_like.toFixed()} °F</h1> : null}
        {data.main ? <h1>{data.main.humidity} %</h1> : null}
        {data.wind ? <h1>{data.wind.speed.toFixed()} MPH</h1> : null}
      </div>
    </div>
  );
}

export default App;
