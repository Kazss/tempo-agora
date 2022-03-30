import { useState } from 'react';
import { api } from '../../services/api';
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
interface SearchProps {
  handleAddWeatherData: (value: IWeatherData) => void;
}

export function SearchInput({ handleAddWeatherData }: SearchProps) {
  const [city, setCity] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleSearchCity(e: { preventDefault: () => void; }) {
    e.preventDefault();

    if (!city) {
      return setInputError('Digite o nome da cidade corretamente.');
    }

    try {
      const { data } = await api.get(`${city}`);

      handleAddWeatherData(data);
      setCity('');
      setInputError('');
    } catch (error) {
      return setInputError('Erro ao buscar esta cidade.')
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
          <button type="submit">Pesquisar Cidade</button>
        </div>
      </form>
      {inputError && (
        <span>Teste INPUT</span>
      )}
    </>
  )
}