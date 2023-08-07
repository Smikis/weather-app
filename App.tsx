import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerItem from './components/DrawerItem';

import WeatherScreen from './screens/Weather';
import LoadingScreen from './screens/Loading';
import ManageLocations from './screens/ManageLocations';
import SearchLocation from './screens/SearchLocation';

import {useLocation} from './contexts/LocationContext';

const Drawer = createDrawerNavigator();

const App = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const {mainLocation, otherLocations} = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Mainlocation"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#6AB4F9',
        drawerInactiveBackgroundColor: '#6AB4F9',
        drawerLabelStyle: {
          fontSize: 15,
        },
        drawerContentContainerStyle: {
          borderRadius: 20,
        },
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
          height: '100%',
          backgroundColor: '#6AB4F9',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
        drawerPosition: 'left',
        drawerAllowFontScaling: false,
      }}
      drawerContent={() => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
            }}>
            <TouchableHighlight
              underlayColor="#529be0"
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
              style={{
                position: 'relative',
                top: 10,
                left: 120,
                marginBottom: 10,
                borderRadius: 50,
              }}>
              <Icon name="close" size={40} color="white" />
            </TouchableHighlight>
            <DrawerItem
              label="Main location"
              iconLeft={<Icon name="bookmark" size={20} color="white" />}
              onPress={() => {
                navigation.navigate('Weather', {
                  location: mainLocation,
                });
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
              labelStyle={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            />
            <DrawerItem
              label={mainLocation.name}
              iconLeft={<Icon name="map-marker" size={20} color="white" />}
              onPress={() => {
                navigation.navigate('Weather', {
                  location: mainLocation,
                });
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
              style={{
                marginLeft: 50,
              }}
              labelStyle={{
                color: 'white',
              }}
            />
            <View
              style={{
                width: '90%',
                height: 1,
                backgroundColor: '#d3d3d3',
                marginTop: 10,
                marginBottom: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            <DrawerItem
              label="Other locations"
              iconLeft={
                <Icon name="map-marker-multiple" size={20} color="white" />
              }
              onPress={() => {
                navigation.navigate('ManageLocations');
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
              labelStyle={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            />
            {otherLocations.map((location, index) => (
              <DrawerItem
                label={location.name}
                key={index}
                iconLeft={<Icon name="map-marker" size={20} color="white" />}
                onPress={() => {
                  navigation.navigate('Weather', {
                    location: location,
                  });
                  navigation.dispatch(DrawerActions.closeDrawer());
                }}
                style={{
                  marginLeft: 50,
                }}
                labelStyle={{
                  color: 'white',
                }}
              />
            ))}
          </View>
        );
      }}
      defaultStatus="closed">
      <Drawer.Screen
        initialParams={{
          location: mainLocation,
        }}
        name="Weather"
        children={() => <WeatherScreen />}
      />
      <Drawer.Screen name="ManageLocations">
        {() => <ManageLocations />}
      </Drawer.Screen>
      <Drawer.Screen name="SearchLocation">
        {() => <SearchLocation />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default App;
