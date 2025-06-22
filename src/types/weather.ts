export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
  pressure: number;
  timestamp: Date;
}

export interface WeatherApiResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
  dt: number;
}

export interface WeatherConfig {
  apiKey?: string;
  units: 'metric' | 'imperial';
  defaultLocation: string;
} 