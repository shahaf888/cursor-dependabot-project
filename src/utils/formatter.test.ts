import { WeatherFormatter } from './formatter';
import { WeatherData } from '../types/weather';

describe('WeatherFormatter', () => {
  describe('formatTemperature', () => {
    it('should format temperature in metric units', () => {
      const result = WeatherFormatter.formatTemperature(25.5, 'metric');
      expect(result).toBe('25.5°C');
    });

    it('should format temperature in imperial units', () => {
      const result = WeatherFormatter.formatTemperature(77.9, 'imperial');
      expect(result).toBe('77.9°F');
    });
  });

  describe('formatHumidity', () => {
    it('should format humidity with percentage', () => {
      const result = WeatherFormatter.formatHumidity(65);
      expect(result).toBe('65%');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format wind speed in metric units', () => {
      const result = WeatherFormatter.formatWindSpeed(5.2, 'metric');
      expect(result).toBe('5.2 m/s');
    });

    it('should format wind speed in imperial units', () => {
      const result = WeatherFormatter.formatWindSpeed(12.5, 'imperial');
      expect(result).toBe('12.5 mph');
    });
  });

  describe('formatWeatherDescription', () => {
    it('should capitalize weather description', () => {
      const result = WeatherFormatter.formatWeatherDescription('partly cloudy');
      expect(result).toBe('Partly cloudy');
    });
  });

  describe('createWeatherSummary', () => {
    it('should create a formatted weather summary', () => {
      const mockWeatherData: WeatherData = {
        location: 'London',
        temperature: 20.5,
        humidity: 65,
        description: 'partly cloudy',
        windSpeed: 5.2,
        pressure: 1013,
        timestamp: new Date('2023-12-01T12:00:00Z'),
      };

      const result = WeatherFormatter.createWeatherSummary(mockWeatherData, 'metric');
      
      expect(result).toContain('📍 Location: London');
      expect(result).toContain('🌡️  Temperature: 20.5°C');
      expect(result).toContain('💧 Humidity: 65%');
      expect(result).toContain('🌬️  Wind Speed: 5.2 m/s');
      expect(result).toContain('📊 Pressure: 1013 hPa');
      expect(result).toContain('☁️  Conditions: Partly cloudy');
    });
  });
}); 