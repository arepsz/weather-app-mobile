import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type GetWeatherProps = {
    city: string;
}

export function useGetForecast({city}: GetWeatherProps) {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    return useQuery({
        queryKey: ['getForecast', city],
        queryFn: async () => {
            const data = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&aqi=yes`)
            return data.data;
        },
        retry: false
    });
}