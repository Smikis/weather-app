import {createContext, PropsWithChildren, useContext, useState} from 'react';

const OptionsContext = createContext({
  temp_units: 'celsius',
  wind_units: 'kmh',
  precip_units: 'mm',
  setTempUnits: (units: string) => {},
  setWindUnits: (units: string) => {},
  setPrecipUnits: (units: string) => {},
});

const OptionsProvider = ({children}: PropsWithChildren) => {
  const [temp_units, setTempUnits] = useState('celsius');
  const [wind_units, setWindUnits] = useState('kmh');
  const [precip_units, setPrecipUnits] = useState('mm');

  return (
    <OptionsContext.Provider
      value={{
        temp_units,
        wind_units,
        precip_units,
        setTempUnits,
        setWindUnits,
        setPrecipUnits,
      }}>
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsProvider;

export const useOptions = () => useContext(OptionsContext);
