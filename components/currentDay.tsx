import {Weather} from '../interfaces';

import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useOptions} from '../contexts/OptionsContext';

const CurrentDayWeather = ({
  weatherData,
}: {
  weatherData: Weather | undefined;
}) => {
  const {temp_units, wind_units, precip_units} = useOptions();

  if (!weatherData) {
    return null;
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: '#529be0',
            width: 150,
            height: 150,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {temp_units === 'celsius'
              ? Math.round(weatherData.current.temp_c)
              : Math.round(weatherData.current.temp_f)}{' '}
            {temp_units === 'celsius' ? '°C' : '°F'}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {weatherData?.current?.condition?.text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#529be0',
                width: 75,
                height: 75,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Icon name={'weather-windy'} size={30} color="white" />
              <Text>
                {wind_units === 'kmh'
                  ? Math.round(weatherData?.current?.wind_kph)
                  : Math.round(weatherData?.current?.wind_mph)}{' '}
                {wind_units === 'kmh' ? 'kmh' : 'mph'}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#529be0',
                width: 75,
                height: 75,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'compass'} size={30} color="white" />
              <Text>{weatherData?.current?.wind_dir}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#529be0',
                width: 75,
                height: 75,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Icon name={'water-percent'} size={30} color="white" />
              <Text>{Math.round(weatherData?.current?.humidity)}%</Text>
            </View>
            <View
              style={{
                backgroundColor: '#529be0',
                width: 75,
                height: 75,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <Icon name={'weather-rainy'} size={30} color="white" />
              <Text>
                {precip_units === 'mm'
                  ? weatherData?.current?.precip_mm
                  : weatherData?.current?.precip_in}{' '}
                {precip_units === 'mm' ? 'mm' : 'in'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentDayWeather;
