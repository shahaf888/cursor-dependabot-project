import { Command } from 'commander';
import chalk from 'chalk';
import { WeatherService } from '../services/weatherService';
import { WeatherFormatter } from '../utils/formatter';
import { WeatherConfig } from '../types/weather';

export class WeatherCommands {
  private weatherService: WeatherService;
  private config: WeatherConfig;

  constructor(config: WeatherConfig) {
    this.config = config;
    this.weatherService = new WeatherService(config);
  }

  setupCommands(program: Command): void {
    // Current weather command
    program
      .command('current <location>')
      .description('Get current weather for a location')
      .option('-u, --units <units>', 'Units (metric or imperial)', 'metric')
      .action(async (location: string, options: { units: string }) => {
        try {
          const weatherData = await this.weatherService.getWeatherData(location);
          const summary = WeatherFormatter.createWeatherSummary(
            weatherData,
            options.units as 'metric' | 'imperial'
          );
          console.log(chalk.blue.bold('\n🌤️  Current Weather\n'));
          console.log(summary);
        } catch (error) {
          console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
          process.exit(1);
        }
      });

    // Multiple locations command
    program
      .command('compare <locations...>')
      .description('Compare weather for multiple locations')
      .option('-u, --units <units>', 'Units (metric or imperial)', 'metric')
      .action(async (locations: string[], options: { units: string }) => {
        try {
          const weatherDataArray = await this.weatherService.getWeatherForMultipleLocations(locations);
          const table = WeatherFormatter.createTableFormat(
            weatherDataArray,
            options.units as 'metric' | 'imperial'
          );
          console.log(chalk.blue.bold('\n🌍 Weather Comparison\n'));
          console.log(table);
        } catch (error) {
          console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
          process.exit(1);
        }
      });

    // Detailed weather command
    program
      .command('detailed <location>')
      .description('Get detailed weather information')
      .option('-u, --units <units>', 'Units (metric or imperial)', 'metric')
      .action(async (location: string, options: { units: string }) => {
        try {
          const weatherData = await this.weatherService.getWeatherData(location);
          console.log(chalk.blue.bold(`\n📊 Detailed Weather for ${location}\n`));
          console.log(chalk.cyan(`Location: ${weatherData.location}`));
          console.log(chalk.yellow(`Temperature: ${WeatherFormatter.formatTemperature(weatherData.temperature, options.units as 'metric' | 'imperial')}`));
          console.log(chalk.blue(`Humidity: ${WeatherFormatter.formatHumidity(weatherData.humidity)}`));
          console.log(chalk.green(`Wind Speed: ${WeatherFormatter.formatWindSpeed(weatherData.windSpeed, options.units as 'metric' | 'imperial')}`));
          console.log(chalk.magenta(`Pressure: ${WeatherFormatter.formatPressure(weatherData.pressure)}`));
          console.log(chalk.white(`Conditions: ${WeatherFormatter.formatWeatherDescription(weatherData.description)}`));
          console.log(chalk.gray(`Last Updated: ${WeatherFormatter.formatDateTime(weatherData.timestamp)}`));
        } catch (error) {
          console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
          process.exit(1);
        }
      });
  }
} 