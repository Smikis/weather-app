import {options} from './API_OPTIONS';

export const getCitiesByQuery = async (query: string) => {
  const resp = await fetch(
    `https://spott.p.rapidapi.com/places/autocomplete?type=CITY&skip=0&limit=10&q=${query}`,
    options,
  );
  const data = await resp.json();
  const cities = data.map((city: any) => {
    return {
      id: city.id,
      name: city.name,
      country: city.country.name,
    };
  });

  return cities;
};

export const getCities = async (query: string) => {
  const resp = await fetch(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&sort=name&facet=cou_name_en`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await resp.json();
  const cities = data.records.map((city: any) => {
    return {
      id: city.fields.geonameid,
      name: city.fields.name,
      country: city.fields.cou_name_en,
    };
  });
  return cities;
};
