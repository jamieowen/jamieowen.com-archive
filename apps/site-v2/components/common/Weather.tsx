import React, { FC, useEffect, useState } from "react";
import { Text } from "theme-ui";
import { WiDayRainMix } from "react-icons/wi";
export const Weather: FC<any> = () => {
  const [weather, setWeather] = useState("0°c");
  // const [visible, setVisible] = useState(false);
  useEffect(() => {
    const key = "a131a6647fa956c084e49306d8d33b4e";
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.main.temp.toFixed(0) + "°c");
        // setVisible(true);
      });
  }, []);
  // sx={{ visibility: visible ? "visible" : "hidden" }}
  return (
    <Text sx={{ display: "inline-block" }}>
      {weather}
      {/* <WiDayRainMix /> */}
    </Text>
  );
};

const getTime = () => {
  const time = new Date();
  const hours = time.getUTCHours();
  const mins = time.getUTCMinutes();
  return `${hours}:${`0${mins}`.slice(-2)}`;
};

export const Time: FC<any> = () => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    let timeoutID: any;
    const tick = () => {
      setTime(getTime());
      timeoutID = setTimeout(tick, 10000);
    };
    tick();
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return <Text sx={{ display: "inline-block" }}>{time}</Text>;
};
