import React from 'react';
import {Text, View} from 'react-native';
import {Forecast} from '../interfaces';
import {ScrollView} from 'react-native-gesture-handler';

import {LineChart} from 'react-native-svg-charts';

import {Dots} from './Dot';
import {useOptions} from '../contexts/OptionsContext';

import {ICONS} from '../constants/ICONS';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimeFormatter = Intl.DateTimeFormat('lt', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

const HourlyForecast = ({weatherData}: {weatherData: Forecast | undefined}) => {
  const {temp_units} = useOptions();

  let currentTime: any = new Date().getHours();

  if (currentTime < 10) {
    currentTime = `0${currentTime}:00`;
  } else {
    currentTime = `${currentTime}:00`;
  }

  if (!weatherData) {
    return null;
  }

  let allTemps: number[] = [];
  let allTimes: string[] = [];
  let allCodes: number[] = [];

  weatherData.forecastday.forEach(item => {
    item.hour.forEach(hour => {
      temp_units === 'celsius'
        ? allTemps.push(Math.round(hour.temp_c))
        : allTemps.push(Math.round(hour.temp_f));
      allTimes.push(hour.time);
      allCodes.push(hour.condition.code);
    });
  });

  const timeIdx = allTimes.findIndex(item => {
    return TimeFormatter.format(new Date(item)) === currentTime;
  });

  const temps = allTemps.slice(timeIdx, timeIdx + 12);
  const times = allTimes.slice(timeIdx, timeIdx + 12);
  const codes = allCodes.slice(timeIdx, timeIdx + 12);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#529be0',
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          color: 'white',
        }}>
        Hourly forecast
      </Text>
      <ScrollView
        style={{
          backgroundColor: '#529be0',
        }}
        scrollEnabled={true}
        horizontal={true}
        fadingEdgeLength={100}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {times.map(item => {
              const time = TimeFormatter.format(new Date(item));
              return (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                  }}
                  key={item}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {time}
                  </Text>
                </View>
              );
            })}
          </View>
          <LineChart
            style={{
              height: 50,
              width: temps.length * 55.5,
            }}
            data={temps}
            svg={{
              stroke: 'rgb(255, 255, 255)',
            }}
            contentInset={{top: 20, bottom: 20, left: 5, right: 5}}>
            <Dots />
          </LineChart>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {temps.map((item, index) => {
              return (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                  }}
                  key={index}>
                  <Icon
                    name={ICONS[codes[index] as keyof typeof ICONS]}
                    size={30}
                    color="white"
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {Math.round(item)}
                    {temp_units === 'celsius' ? '°C' : '°F'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HourlyForecast;
