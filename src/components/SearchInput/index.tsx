import { format, getMonth, getYear } from 'date-fns';
import { useState } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.scss';


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
interface SearchProps {
  handleAddWeatherData: (value: IWeatherData) => void;
}

export function SearchInput({ handleAddWeatherData }: SearchProps) {
  const [city, setCity] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleSearchCity(e: { preventDefault: () => void; }) {
    e.preventDefault();

    if (!city) {
      return setInputError('Enter the city name correctly!');
    }

    try {
      const { data } = await api.get<IWeatherData>(`${city}`);

      const month = getMonth(new Date());
      const year = getYear(new Date());

      const forecastData = data.forecast.map(forecastData => {
        return {
          day: format(new Date(year, month, Number(forecastData.day)), 'eeee'),
          temperature: forecastData.temperature,
          wind: forecastData.wind
        }
      })


      forecastData[0].day = "Tomorrow";
      data.city = city;
      data.forecast = forecastData;

      handleAddWeatherData(data);
      setCity('');
      setInputError('');
    } catch (error) {
      return setInputError('Error when searching for this city!')
    }
  }
  return (
    <>
      <form className={styles.searchContainer} onSubmit={handleSearchCity}>
        <div className={styles.inputContainer}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ex: São Paulo"
            type="text"
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">Search</button>
        </div>
        {inputError && (
          <div className={styles.errorInput}>
            <span>{inputError}</span>
          </div>
        )}
      </form>

    </>
  )
}