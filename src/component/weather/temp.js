import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import "./style.css";

const Temp = () => {
    const [searchValue, setSearchValue] = useState("Kanpur");
    const [tempInfo, setTempInfo] = useState({});
    const getweatherinfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1085031b8d93fb6d8a0fa4d81a96b983`;
            let res = await fetch(url);
            let data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getweatherinfo();
    }, []);
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="searchButton"
                        type="button"
                        onClick={getweatherinfo}>
                        Search
                    </button>
                </div>
            </div>


            <Weathercard tempInfo={tempInfo} />
        </>
    )
}

export default Temp
