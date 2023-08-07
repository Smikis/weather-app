import React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {NavigationContainer} from '@react-navigation/native';

import OptionsProvider from './contexts/OptionsContext';
import LocationProvider from './contexts/LocationContext';
import {MenuProvider} from 'react-native-popup-menu';

const ProvidedApp = () => {
  return (
    <MenuProvider>
      <OptionsProvider>
        <LocationProvider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </LocationProvider>
      </OptionsProvider>
    </MenuProvider>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedApp);
