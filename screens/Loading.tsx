import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6AB4F9',
      }}>
      <ActivityIndicator size={70} color="#529be0" />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;
