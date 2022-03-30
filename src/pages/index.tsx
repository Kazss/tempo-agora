import Head from 'next/head';
import { useEffect, useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { WeatherData } from '../components/WeatherData';

import styles from "../styles/home.module.scss"

interface IForeCast {
  day: string;
  temperature: string;
  wind: string;
}[]

interface WeatherDataProps {
  temperature: string;
  wind: string;
  description: string;
  forecast: IForeCast[];
}


export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();


  function handleAddWeatherData(value: WeatherDataProps) {
    setWeatherData(value);
  }


  return (
    <>
      <Head>
        <title> Início | Tempo Agora</title>
      </Head>

      <main className={styles.contentContainer}>
        <SearchInput handleAddWeatherData={setWeatherData} />
        {weatherData && (
          <WeatherData weatherData={weatherData} />
        )}
      </main>


    </>
  )
}