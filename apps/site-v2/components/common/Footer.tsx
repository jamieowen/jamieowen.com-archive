import {
  FC,
  createContext,
  useState,
  useEffect,
  useContext,
  ComponentProps,
  useMemo,
} from "react";
import { Container, ThemeUIStyleObject, Text } from "theme-ui";
import { BodyHeader, BodyText } from "./Common";
import { Weather } from "./Weather";

const footerStyle: ThemeUIStyleObject = {
  position: "absolute",
  bottom: "4rem",
  width: ["calc( 100% - 4rem )", "calc( 100% - 8rem )"],
  display: "flex",
  fontFamily: "heading",
  textTransform: "uppercase",
  ".aleft": {
    position: "absolute",
    left: "0px",
  },
  ".aright": {
    position: "absolute",
    right: "0px",
  },
};

/** Content Area. */
export const Footer: FC<
  ComponentProps<any> & {
    copyright?: boolean;
  }
> = ({ children, copyright = true, ...props }) => {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Container as="footer" sx={footerStyle} {...props}>
      {copyright && <Text className="aleft">XX / © {year} Jamie Owen</Text>}
      <WeatherDisplay className="aright" />
    </Container>
  );
};

interface WeatherData {
  weather: string;
  location: string;
}
export const WeatherContext = createContext<WeatherData>(null);

export const WeatherProvider: FC<{}> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData>({
    location: "London",
    weather: "0°c",
  });

  useEffect(() => {
    const key = "a131a6647fa956c084e49306d8d33b4e";
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          location: "London",
          weather: data.main.temp.toFixed(0) + "°c",
        });
        // setVisible(true);
      });
  }, []);

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

export const WeatherDisplay: FC<ComponentProps<"div">> = (props) => {
  const data = useContext(WeatherContext);
  return (
    <div {...props}>
      <Text>
        YY / {data.location} / {data.weather}
      </Text>
    </div>
  );
};
