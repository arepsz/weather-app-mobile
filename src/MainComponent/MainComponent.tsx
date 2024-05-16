import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/index.scss';
import React, {useEffect, useState} from 'react';
import {useGetWeather} from '../_query/useGetWeather.ts';
import Geolocation from 'react-native-geolocation-service';
import {useGetForecast} from '../_query/useGetForecast.ts';
import {getBackgroundImage, requestLocationPermission} from '../utils.ts';
import {ForecastScroll} from '../ForecastScroll';
import {DailyData} from '../DailyData';
import SplashScreen from 'react-native-splash-screen';

export function MainComponent() {
  const [location, setLocation] = useState('');
  const [renderCity, setRenderCity] = useState('');
  const [icon, setIcon] = useState('');
  const [condition, setCondition] = useState(0);
  const [renderWeather, setRenderWeather] = useState('');
  const [humidiy, setHumidiy] = useState('');
  const [isItDay, setIsItDay] = useState(false);
  const [wind, setWind] = useState('');
  const [uv, setUV] = useState('');
  const [pressure, setPressure] = useState('');
  const [cloud, setCloud] = useState(0);

  const {
    data: weather,
    refetch,
    isLoading: isLoadingWeather,
  } = useGetWeather({
    city: location,
  });
  const {
    data: forecast,
    refetch: refetchForecast,
    isLoading: isLoadingForecast,
  } = useGetForecast({
    city: location,
  });

  const isLoading = isLoadingWeather && isLoadingForecast;

  const [temps, setTemps] = useState<Array<string>>([]);
  const [tempIcons, setTempIcons] = useState<Array<string>>([]);

  const getData = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          setLocation(latitude + ',' + longitude);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const refetchWeather = () => {
    refetch();
    refetchForecast();
  };

  useEffect(() => {
    if(!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  useEffect(() => {
    async function fetchMyAPI() {
      await getData();
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (weather && weather.current && weather.location) {
      setRenderCity(weather.location.name);
      setRenderWeather(weather.current.temp_c);
      setCondition(Number(weather.current.condition.code));
      setIcon(weather.current.condition.icon);
      setCloud(weather.current.cloud);
      setIsItDay(weather.current.is_day);
      setHumidiy(weather.current.humidity);
      setPressure(weather.current.pressure_mb);
      setWind(weather.current.gust_kph);
      setUV(weather.current.uv);
    }
  }, [weather]);

  useEffect(() => {
    if (forecast && forecast.forecast && forecast.forecast.forecastday[0]) {
      let temps: string[] = [];
      let icons: string[] = [];
      forecast.forecast.forecastday[0].hour.forEach((hour: any) => {
        temps.push(hour.temp_c);
        icons.push(hour.condition.icon);
      });

      setTempIcons(icons);
      setTemps(temps);
    }
  }, [forecast]);

  return (
    <ImageBackground
      source={getBackgroundImage(condition, isItDay, cloud)}
      resizeMode="stretch"
      style={styles.img}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.content}>
        <View style={styles.content__top}>
          <View style={styles.content__top__temp}>
            <Text style={styles.title}>{renderCity ?? ''}</Text>
            <View style={styles.content__top__temp__row}>
              <Text style={styles.title}>{renderWeather + '°' ?? ''}</Text>
              {icon && (
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'contain',
                  }}
                  source={{uri: 'https:' + icon}}
                />
              )}
            </View>
          </View>
        </View>
        <ForecastScroll temps={temps} tempIcons={tempIcons} />
        <DailyData uv={uv} humidity={humidiy} pressure={pressure} wind={wind} />
        <TouchableOpacity
          onPress={() => refetchWeather()}
          style={styles.refresh}>
          <Text style={styles.refresh__text}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
