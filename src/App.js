import React, { useState, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Alert } from "react-bootstrap";

import svgPic from "./nocity.svg";
import svgFind from "./find.svg";

function App() {
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(0);
  const [show, setShow] = useState(0);
  const [started, setStarted] = useState(0);
  const inputRef = useRef(null);

  const searchLocation = () => {
    let found = 0;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + inputRef.current.value + "&appid=9d98d05b9005fbf9533b9d30bb3fc292";

    if (inputRef.current.value != "") {
      axios
        .get(url)
        .then((res) => {
          setSuccess(1);
          setData(res.data);
          found = 1;

          if (started == 0 && found == 1) {
            setStarted(1);
          }
        })
        .catch((error) => {
          setSuccess(0);

          setShow(true);

          setTimeout(() => {
            setShow(false);
          }, 2500);
        });
    } else {
      setSuccess(0);
    }

    inputRef.current.value = "";
  };

  return (
    <div className="bodyHeight">
      <div className="container pt-5">
        <div className={started ? "row centerDiv" : "row start centerDiv"}>
          <div className="col-3 ">
            <input type="email" className="form-control" placeholder="Enter city name" ref={inputRef} />
          </div>

          <div className="col-1">
            <button type="button" className="btn btn-primary btn" onClick={searchLocation}>
              Search
            </button>
          </div>
        </div>

        {success ? (
          <>
            <div className="row centerDiv mt-5">
              <div className="col-3 centerDiv">
                <h1 className="display-4">{data.name}</h1>
              </div>
            </div>

            <div className="row centerDiv">
              <div className="col-3 mt-4 centerDiv">
                {data.main ? (
                  <span className="badge p-3" style={{ backgroundColor: "rgba(131, 131, 131, 0.562)" }}>
                    <h1 className="display-1 fw-bold" style={{ fontSize: "80px" }}>
                      {data.main.temp.toFixed()} °F
                    </h1>
                  </span>
                ) : null}
              </div>
            </div>

            <div className="row centerDiv">
              <div className="col-3 mt-4 centerDiv">
                {data.main ? (
                  <h1 className="display-1 fw-bold" style={{ fontSize: "80px" }}>
                    {data.weather ? <h1>{data.weather[0].main}</h1> : null}
                  </h1>
                ) : null}
              </div>
            </div>

            <div className="centerDiv ">
              <div className="card shadow p-3 mb-5 bg-body rounded" style={{ width: " 45rem", marginTop: "2.9rem" }}>
                <div className="card-body">
                  <div className="row centerDiv">
                    <div className="col-3 mt-3">
                      <h5 className="card-title"> {data.main ? <h1>{data.main.feels_like.toFixed()} °F</h1> : null}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Feels Like</h6>
                    </div>

                    <div className="col-3 mt-3">
                      <h5 className="card-title"> {data.main ? <h1>{data.main.humidity} %</h1> : null}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Humidity</h6>
                    </div>

                    <div className="col-3 mt-3">
                      <h5 className="card-title"> {data.wind ? <h1>{data.wind.speed.toFixed()} MPH</h1> : null}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Wind Speed</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="centerDiv" style={{ position: "absolute", bottom: "0px", width: "90vw" }}>
            <Alert style={{ display: "flex", justifyContent: "center", fontWeight: "bold", color: "black" }} variant="warning " show={show} className="p-3 w-50 my-5">
              Couldn't find the given city
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
