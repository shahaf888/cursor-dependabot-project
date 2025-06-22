import dayjs from 'dayjs';
import { chunk, capitalize } from 'lodash';
import { WeatherData } from '../types/weather';

export class WeatherFormatter {
  static formatTemperature(temp: number, units: 'metric' | 'imperial'): string {
    const symbol = units === 'metric' ? '°C' : '°F';
    return `${temp.toFixed(1)}${symbol}`;
  }

  static formatDateTime(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static formatRelativeTime(date: Date): string {
    return dayjs(date).fromNow();
  }

  static formatWeatherDescription(description: string): string {
    return capitalize(description);
  }

  static formatWindSpeed(speed: number, units: 'metric' | 'imperial'): string {
    const unit = units === 'metric' ? 'm/s' : 'mph';
    return `${speed.toFixed(1)} ${unit}`;
  }

  static formatPressure(pressure: number): string {
    return `${pressure} hPa`;
  }

  static formatHumidity(humidity: number): string {
    return `${humidity}%`;
  }

  static createWeatherSummary(weatherData: WeatherData, units: 'metric' | 'imperial'): string {
    const lines = [
      `📍 Location: ${weatherData.location}`,
      `🌡️  Temperature: ${this.formatTemperature(weatherData.temperature, units)}`,
      `💧 Humidity: ${this.formatHumidity(weatherData.humidity)}`,
      `🌬️  Wind Speed: ${this.formatWindSpeed(weatherData.windSpeed, units)}`,
      `📊 Pressure: ${this.formatPressure(weatherData.pressure)}`,
      `☁️  Conditions: ${this.formatWeatherDescription(weatherData.description)}`,
      `🕐 Updated: ${this.formatRelativeTime(weatherData.timestamp)}`,
    ];

    return lines.join('\n');
  }

  static createTableFormat(weatherDataArray: WeatherData[], units: 'metric' | 'imperial'): string {
    const headers = ['Location', 'Temp', 'Humidity', 'Wind', 'Conditions'];
    const rows = weatherDataArray.map(data => [
      data.location,
      this.formatTemperature(data.temperature, units),
      this.formatHumidity(data.humidity),
      this.formatWindSpeed(data.windSpeed, units),
      this.formatWeatherDescription(data.description),
    ]);

    const maxLengths = headers.map((_, index) => {
      const columnValues = [headers[index], ...rows.map(row => row[index])];
      return Math.max(...columnValues.map(val => val.length));
    });

    const formatRow = (row: string[]) => {
      return row.map((cell, index) => cell.padEnd(maxLengths[index])).join(' | ');
    };

    const separator = maxLengths.map(length => '-'.repeat(length)).join('-+-');

    return [
      formatRow(headers),
      separator,
      ...rows.map(formatRow),
    ].join('\n');
  }
} 