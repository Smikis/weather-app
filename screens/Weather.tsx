import {Location, Weather, Forecast} from '../interfaces';

import CurrentDayWeather from '../components/currentDay';
import HourlyForecast from '../components/hourlyForecast';
import {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';

const fetchCurrentWeather = async (location: string) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=4ae3983d9e38444093e173142222912&q=${location}&days=5`,
  );
  const data = await response.json();
  return data;
};

const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState<Weather | undefined>(
    undefined,
  );
  const [forecast, setForecast] = useState<Forecast | undefined>(undefined);
  const navigation = useNavigation();
  const route = useRoute();

  const {location} = route.params as {location: Location};

  useEffect(() => {
    const fetchWeather = async () => {
      const new_data = await fetchCurrentWeather(location.name);

      setCurrentWeather({current: new_data.current});
      setForecast(new_data.forecast);
    };
    fetchWeather();
  }, [location]);

  return (
    <View
      style={{
        backgroundColor: '#70BAFF',
        flex: 1,
      }}>
      <StatusBar animated backgroundColor="#70BAFF" barStyle="light-content" />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          backgroundColor: '#70BAFF',
          paddingTop: 20,
          flexWrap: 'wrap',
        }}>
        <TouchableHighlight
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          underlayColor="#529be0"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="menu" size={40} color="white" />
        </TouchableHighlight>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <Icon name="map-marker" size={25} color="white" />
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginLeft: 10,
              width: 200,
            }}>
            {location.name} - {location.country}
          </Text>
        </View>
      </View>
      <CurrentDayWeather weatherData={currentWeather} />
      <HourlyForecast weatherData={forecast} />
    </View>
  );
};

export default WeatherScreen;
