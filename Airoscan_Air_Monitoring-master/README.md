# Air Quality Dashboard

A real-time air quality monitoring dashboard that displays PM2.5 concentration data from monitoring stations in Kurdistan, Iraq. The dashboard provides detailed visualizations and analysis of air quality measurements from two locations: Makhmor Road and Namaz Area.

## Features

- Real-time PM2.5 concentration monitoring
- Interactive map showing monitoring stations
- Historical data visualization with customizable time ranges (24h, 7d, 30d)
- Air quality status indicators and trends
- Sensor status monitoring
- Mobile-responsive design

## Technologies Used

- HTML5/CSS3 with Tailwind CSS
- JavaScript
- Chart.js for data visualization
- Leaflet.js for maps
- Supabase for real-time database

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd air-quality-dashboard
```

2. Configure the database:
   - Create a Supabase account and project
   - Set up the required tables
   - Update the Supabase URL in `db-config.js`

3. Open `index.html` in a web browser or serve using a local server.

## Configuration

The application requires a Supabase API key for database access. When you first run the application, you'll be prompted to enter your API key.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 