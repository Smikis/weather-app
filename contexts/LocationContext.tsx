import {createContext, PropsWithChildren, useContext, useState} from 'react';

import {Location} from '../interfaces';

const locationContext = createContext({
  mainLocation: {} as Location,
  setMainLocation: (location: Location) => {},
  otherLocations: [] as Location[],
  addLocation: (locations: Location) => {},
  removeLocation: (locations: Location) => {},
  setNewMainLocation: (locations: Location) => {},
});

const LocationProvider = ({children}: PropsWithChildren) => {
  const [mainLocation, setMainLocation] = useState({
    name: 'São Paulo',
    country: 'Brazil',
    id: '3448439',
  });
  const [otherLocations, setOtherLocations] = useState<Location[]>([]);

  const addLocation = (location: Location) => {
    setOtherLocations([...otherLocations, location]);
  };

  const removeLocation = (location: Location) => {
    setOtherLocations(otherLocations.filter(l => l.id !== location.id));
  };

  const setNewMainLocation = (location: Location) => {
    setMainLocation(location);
    removeLocation(location);
  };

  return (
    <locationContext.Provider
      value={{
        mainLocation,
        setMainLocation,
        otherLocations,
        addLocation,
        removeLocation,
        setNewMainLocation,
      }}>
      {children}
    </locationContext.Provider>
  );
};

export default LocationProvider;

export const useLocation = () => useContext(locationContext);
