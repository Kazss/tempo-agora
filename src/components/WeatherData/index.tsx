import styles from './styles.module.scss';


interface IForeCast {
  day: string;
  temperature: string;
  wind: string;
}[]

interface IWeatherData {
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
        <h3>Weather now</h3>
        <h1>{weatherData.temperature}</h1>
        <h2>{weatherData.description}</h2>
      </div>
      <div className={styles.weatherForeCast}>
        <h3>Forecast</h3>
        {weatherData.forecast.map(data => (

          <div key={data.day}>
            <span>{data.day}</span>
            <span>{data.temperature}</span>
            <span>{data.wind}</span>
          </div>
        ))}
      </div>

    </>
  )
}