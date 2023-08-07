import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getCitiesByQuery, getCities} from '../api/CityApi';
import {useNavigation} from '@react-navigation/native';

import {useLocation} from '../contexts/LocationContext';

const SearchLocation = () => {
  const {mainLocation, addLocation} = useLocation();

  const [input, setInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [timer, setTimer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onChange = (text: string) => {
    setInput(text);
    setLocations([]);

    setLoading(true);

    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      getCities(input).then(setLocations);

      setLoading(false);
    }, 300);
    setTimer(newTimer);
  };

  return (
    <View
      style={{
        backgroundColor: '#70BAFF',
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={'#70BAFF'} />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#70BAFF',
          paddingTop: 20,
          paddingRight: 20,
          paddingBottom: 20,
          borderBottomColor: '#529be0',
          borderBottomWidth: 1,
        }}>
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}
          underlayColor="#70BAFF"
          onPress={() => {
            setInput('');
            navigation.navigate('ManageLocations');
          }}>
          <Icon name="chevron-left" color={'white'} size={30} />
        </TouchableHighlight>
        <TextInput
          placeholder="Search for a location"
          onChangeText={onChange}
          value={input}
          style={{
            width: '80%',
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            marginLeft: 50,
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          backgroundColor: '#70BAFF',
          flex: 1,
        }}>
        {input.length > 0 ? (
          loading ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={50} color="white" />
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}>
                Loading...
              </Text>
            </View>
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({item}: any) => (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    backgroundColor: '#70BAFF',
                    marginVertical: 10,
                  }}>
                  <TouchableHighlight
                    style={{
                      width: '90%',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      backgroundColor: '#529be0',
                    }}
                    underlayColor="rgba(255, 255, 255, 0.2)"
                    onPress={() => {
                      addLocation(item);
                      navigation.navigate('ManageLocations');
                      setInput('');
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'flex-start',
                          flexDirection: 'column',
                          padding: 20,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: 'white',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                          }}>
                          {item.country}
                        </Text>
                      </View>
                      {mainLocation.id === item.id ? (
                        <Icon
                          name="bookmark"
                          color={'white'}
                          size={30}
                          style={{
                            position: 'absolute',
                            right: 20,
                          }}
                        />
                      ) : null}
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              keyExtractor={(item: any) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}>
                No results
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}>
              Enter a location
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchLocation;
