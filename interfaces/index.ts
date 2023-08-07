export interface Location {
  id: string;
  name: string;
  country: string;
}

export interface Weather {
  current: {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

export interface Hour {
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  precip_mm: number;
  precip_in: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
}

export interface Forecast {
  forecastday: [
    {
      day: Day;
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: Hour[];
    },
  ];
}
