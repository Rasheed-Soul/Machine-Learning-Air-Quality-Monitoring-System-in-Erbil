import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import os

# Load the data
df = pd.read_csv('sensor_data_rows_new.csv')


print(f"\nDataset size after filtering: {len(df)} rows")
print(f"PM2.5 range: {df['pm25'].min():.2f} to {df['pm25'].max():.2f} µg/m³")

# Convert timestamp to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Extract features from timestamp
df['hour'] = df['timestamp'].dt.hour
df['day'] = df['timestamp'].dt.day
df['month'] = df['timestamp'].dt.month
df['year'] = df['timestamp'].dt.year
df['day_of_week'] = df['timestamp'].dt.dayofweek

# Extract latitude and longitude from Location
df[['latitude', 'longitude']] = df['Location'].str.split(',', expand=True).astype(float)

# Get unique locations
unique_locations = df['Location'].unique()
print(f"\nNumber of unique locations: {len(unique_locations)}")

# Create location name mapping
location_names = {
    '36.112146, 43.953925': 'Makhmor',
    '36.213724, 43.988080': 'Naznaz'
}

# Prepare features
features = ['hour', 'day', 'month', 'year', 'day_of_week', 'latitude', 'longitude']

# Dictionary to store results for each location
location_results = {}

# Train models for each location
for location in unique_locations:
    location_name = location_names[location]
    print(f"\nProcessing location: {location_name}")
    
    # Filter data for this location
    location_data = df[df['Location'] == location]
    print(f"Number of data points: {len(location_data)}")
    
    X = location_data[features]
    y = location_data['pm25']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Initialize and train Random Forest model
    print("Training Random Forest...")
    model = RandomForestRegressor(n_estimators=200, max_depth=10, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test_scaled)
    
    # Calculate metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mse)
    
    # Store results
    location_results[location] = {
        'name': location_name,
        'model': model,
        'scaler': scaler,
        'metrics': {
            'MSE': mse,
            'R2 Score': r2,
            'RMSE': rmse
        }
    }
    
    # Print results for this location
    print(f"\nResults for {location_name}:")
    print(f"R2 Score: {r2:.4f}")
    print(f"MSE: {mse:.4f}")
    print(f"RMSE: {rmse:.4f} µg/m³")

# Generate future predictions for each location
print("\nGenerating future predictions for each location:")
print("-" * 50)

# Generate future dates (2 months = ~60 days, 4 times per day)
last_date = df['timestamp'].max()
future_dates = pd.date_range(start=last_date + timedelta(hours=6), periods=60*4, freq='6h')  # 60 days * 4 times per day

# Create a figure for all locations
plt.figure(figsize=(20, 10))

# Assign colors: invert previous (blue for Naznaz, orange for Makhmor)
location_colors = {
    'Makhmor': 'orange',
    'Naznaz': 'blue'
}

for location in location_results.keys():
    location_name = location_results[location]['name']
    # Get the model and scaler for this location
    model = location_results[location]['model']
    scaler = location_results[location]['scaler']
    
    # Extract latitude and longitude for this location
    lat, lon = map(float, location.split(','))
    
    # Prepare future features
    future_data = pd.DataFrame({
        'timestamp': future_dates,
        'hour': future_dates.hour,
        'day': future_dates.day,
        'month': future_dates.month,
        'year': future_dates.year,
        'day_of_week': future_dates.dayofweek,
        'latitude': lat,
        'longitude': lon
    })
    
    # Scale future features
    future_features = future_data[features]
    future_features_scaled = scaler.transform(future_features)
    
    # Make predictions
    future_predictions = model.predict(future_features_scaled)
    
    # Plot predictions for this location with inverted color
    plt.plot(future_dates, future_predictions, label=f'Location: {location_name}', linestyle='--', color=location_colors[location_name])
    
    # Print predictions (grouped by day, 4 times per day)
    print(f"\n6-hour interval predictions for {location_name}:")
    for date, pred in zip(future_dates, future_predictions):
        print(f"{date}: {pred:.2f} µg/m³")

# Add historical data for reference
plt.plot(df['timestamp'][-100:], df['pm25'][-100:], label='Historical PM2.5', alpha=0.3)

plt.title('PM2.5 Predictions for Next 2 Months by Location')
plt.xlabel('Date')
plt.ylabel('PM2.5 (µg/m³)')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45)
plt.tight_layout()

# Save the plot with absolute path
plot_path = os.path.join(os.getcwd(), 'pm25_predictions_2months.png')
plt.savefig(plot_path, bbox_inches='tight', dpi=300)
print(f"\nPlot saved as: {plot_path}")
plt.close()

# Print summary of results for each location
print("\nSummary of Results by Location:")
print("-" * 50)
for location, result in location_results.items():
    print(f"\nLocation: {result['name']}")
    print(f"R2 Score: {result['metrics']['R2 Score']:.4f}")
    print(f"MSE: {result['metrics']['MSE']:.4f}")
    print(f"RMSE: {result['metrics']['RMSE']:.4f} µg/m³")
