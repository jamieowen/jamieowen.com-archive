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
import { Grid } from "./containers";

const footerStyle: ThemeUIStyleObject = {
  // position: "absolute",
  bottom: "4rem",
  marginTop: "2rem",
  fontSize: "8px",
  // width: ["calc( 100% - 4rem )", "calc( 100% - 8rem )"],
  fontFamily: "heading",
  textTransform: "uppercase",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
};

/** Content Area. */
export const FooterCopyright: FC<
  ComponentProps<any> & {
    copyright?: boolean;
    fullwidth?: boolean;
  }
> = ({ children, copyright = true, fullwidth = false, ...props }) => {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Container sx={footerStyle} className={`maxw-medium`} {...props}>
      <div>
        {copyright && (
          <Text as="div" className="align-left">
            XX / © {year} Jamie Owen
          </Text>
        )}
      </div>
      <div className="align-right">
        <WeatherDisplay />
      </div>
    </Container>
  );
};

/**
 *
 * Weather
 *
 */
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
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          location: "London",
          weather: data.main.temp.toFixed(0) + "°c",
        });
        // setVisible(true);
      })
      .catch(console.warn);
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
      <Text as="span">
        YY / {data.location} / {data.weather}
      </Text>
    </div>
  );
};
