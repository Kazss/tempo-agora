import styles from './styles.module.scss';
import { WiThermometer, WiStrongWind } from 'react-icons/wi';
import { RiCalendarEventFill } from 'react-icons/ri';

interface IForeCast {
  day: string;
  temperature: string;
  wind: string;
}[]

interface IWeatherData {
  city: string;
  temperature: string;
  wind: string;
  description: string;
  forecast: IForeCast[];
}
interface WeatherProps {
  weatherData: IWeatherData;
}

export function WeatherData({ weatherData }: WeatherProps) {
  return (
    <>
      <div className={styles.weatherNow}>
        <h1>{weatherData.city}</h1>
        <span>Weather Now</span>
        <span>{weatherData.temperature}</span>
        <span>{weatherData.description}</span>
      </div>
      <div className={styles.weatherForeCast}>
        <h2>Forecast</h2>
        {weatherData.forecast.map(data => (
          <div key={data.day} className={styles.forecastContainer}>
            <div>
              <span><RiCalendarEventFill/> {data.day}</span>
              <span><WiThermometer />{data.temperature}</span>
              <span><WiStrongWind />{data.wind}</span>
            </div>

          </div>
        ))}
      </div>

    </>
  )
}