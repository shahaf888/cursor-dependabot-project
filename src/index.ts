#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { WeatherCommands } from './cli/commands';
import { WeatherConfig } from './types/weather';

const program = new Command();

// Set up the main program
program
  .name('weather-cli')
  .description('A CLI tool for fetching weather information')
  .version('1.0.0');

// Configuration
const config: WeatherConfig = {
  apiKey: process.env.WEATHER_API_KEY,
  units: 'metric',
  defaultLocation: 'London',
};

// Set up commands
const weatherCommands = new WeatherCommands(config);
weatherCommands.setupCommands(program);

// Add a default command
program
  .command('default')
  .description('Get weather for default location')
  .action(async () => {
    try {
      const weatherCommands = new WeatherCommands(config);
      const tempProgram = new Command();
      weatherCommands.setupCommands(tempProgram);
      
      // Simulate the current command
      const weatherService = new (await import('./services/weatherService')).WeatherService(config);
      const weatherData = await weatherService.getWeatherData(config.defaultLocation);
      const { WeatherFormatter } = await import('./utils/formatter');
      const summary = WeatherFormatter.createWeatherSummary(weatherData, config.units);
      
      console.log(chalk.blue.bold(`\n🌤️  Weather for ${config.defaultLocation}\n`));
      console.log(summary);
    } catch (error) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red(`Error: Unknown command ${program.args.join(' ')}`));
  console.log(chalk.yellow('See --help for a list of available commands.'));
  process.exit(1);
});

// Parse arguments
program.parse(); 