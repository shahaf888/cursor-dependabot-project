import axios from 'axios';
import { WeatherData, WeatherApiResponse, WeatherConfig } from '../types/weather';

export class WeatherService {
  private config: WeatherConfig;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(config: WeatherConfig) {
    this.config = config;
  }

  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${this.baseUrl}/weather`,
        {
          params: {
            q: location,
            appid: this.config.apiKey || 'demo',
            units: this.config.units,
          },
        }
      );

      return this.transformApiResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Weather API error: ${error.response?.data?.message || error.message}`);
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  private transformApiResponse(apiData: WeatherApiResponse): WeatherData {
    return {
      location: apiData.name,
      temperature: apiData.main.temp,
      humidity: apiData.main.humidity,
      description: apiData.weather[0]?.description || 'Unknown',
      windSpeed: apiData.wind.speed,
      pressure: apiData.main.pressure,
      timestamp: new Date(apiData.dt * 1000),
    };
  }

  async getWeatherForMultipleLocations(locations: string[]): Promise<WeatherData[]> {
    const promises = locations.map(location => this.getWeatherData(location));
    return Promise.all(promises);
  }
} 