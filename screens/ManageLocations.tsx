import {useNavigation} from '@react-navigation/native';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLocation} from '../contexts/LocationContext';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ManageLocations = () => {
  const {mainLocation, otherLocations, removeLocation, setNewMainLocation} =
    useLocation();
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#70BAFF',
        flex: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#70BAFF',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: '#70BAFF',
            paddingTop: 20,
            paddingBottom: 20,
            marginBottom: 20,
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
            underlayColor="#529be0"
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={'white'} size={30} />
          </TouchableHighlight>
          <Text
            style={{
              fontSize: 30,
              color: 'white',
            }}>
            Manage Locations
          </Text>
          <TouchableHighlight
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}
            underlayColor="#529be0"
            onPress={() => navigation.navigate('SearchLocation')}>
            <Icon name="plus" color={'white'} size={30} />
          </TouchableHighlight>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginBottom: 20,
              marginLeft: 20,
              textTransform: 'uppercase',
            }}>
            Main location
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              backgroundColor: '#70BAFF',
              marginBottom: 20,
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
                navigation.navigate('Weather', {
                  location: mainLocation,
                });
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
                    {mainLocation.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {mainLocation.country}
                  </Text>
                </View>
                <Icon
                  name="bookmark"
                  color={'white'}
                  size={30}
                  style={{
                    position: 'absolute',
                    right: 20,
                  }}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              width: '100%',
              borderBottomColor: '#529be0',
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginBottom: 20,
              marginLeft: 20,
              textTransform: 'uppercase',
            }}>
            Other locations
          </Text>
          <FlatList
            data={otherLocations}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  backgroundColor: '#70BAFF',
                  marginBottom: 20,
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
                    navigation.navigate('Weather', {
                      location: item,
                    });
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
                    <Menu
                      name={`${item.id}`}
                      style={{
                        position: 'absolute',
                        right: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MenuTrigger
                        customStyles={{
                          triggerWrapper: {
                            borderRadius: 100,
                          },
                          triggerOuterWrapper: {
                            borderRadius: 100,
                          },
                        }}
                        children={
                          <Icon
                            name="dots-vertical"
                            color={'white'}
                            size={30}
                          />
                        }
                      />
                      <MenuOptions
                        customStyles={{
                          optionsContainer: {
                            borderRadius: 5,
                            width: 120,
                          },
                        }}>
                        <MenuOption
                          onSelect={() => {
                            removeLocation(item);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Icon name="delete" color={'black'} size={30} />
                            <Text style={{color: 'black'}}>Delete</Text>
                          </View>
                        </MenuOption>
                        <View
                          style={{
                            width: '100%',
                            borderBottomColor: '#000',
                            borderBottomWidth: 1,
                          }}
                        />
                        <MenuOption
                          onSelect={() => {
                            setNewMainLocation(item);
                            navigation.navigate('Weather', {
                              location: item,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Icon name="bookmark" color={'black'} size={30} />
                            <Text style={{color: 'black'}}>Set as main</Text>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default ManageLocations;
