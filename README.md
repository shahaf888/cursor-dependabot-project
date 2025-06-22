# Weather CLI Tool

A TypeScript CLI tool for fetching and displaying weather information from OpenWeatherMap API.

## Features

- 🌤️ Get current weather for any location
- 🌍 Compare weather across multiple locations
- 📊 Detailed weather information display
- 🎨 Colored output with emojis
- 📏 Support for metric and imperial units
- 🚀 Built with TypeScript and modern Node.js

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-cli-tool
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. (Optional) Set up your OpenWeatherMap API key:
```bash
export WEATHER_API_KEY=your_api_key_here
```

## Usage

### Get current weather for a location:
```bash
npm start current "New York"
```

### Compare weather for multiple locations:
```bash
npm start compare "London" "Paris" "Tokyo"
```

### Get detailed weather information:
```bash
npm start detailed "Berlin"
```

### Use different units:
```bash
npm start current "Miami" --units imperial
```

### Get weather for default location:
```bash
npm start default
```

## Available Commands

- `current <location>` - Get current weather for a location
- `compare <locations...>` - Compare weather for multiple locations
- `detailed <location>` - Get detailed weather information
- `default` - Get weather for default location (London)

## Options

- `-u, --units <units>` - Units (metric or imperial), default: metric

## Development

### Scripts

- `npm run build` - Build the TypeScript project
- `npm run dev` - Run in development mode
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build directory

### Project Structure

```
src/
├── types/          # TypeScript interfaces
├── services/       # API services
├── utils/          # Utility functions
├── cli/           # CLI command handlers
└── index.ts       # Main entry point
```

## Dependencies

### Production Dependencies
- `axios` - HTTP client for API requests
- `commander` - CLI framework
- `chalk` - Terminal styling
- `dayjs` - Date manipulation
- `lodash` - Utility functions

### Development Dependencies
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing framework

## API Key

This tool uses the OpenWeatherMap API. You can get a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).

Set your API key as an environment variable:
```bash
export WEATHER_API_KEY=your_api_key_here
```

## License

MIT 