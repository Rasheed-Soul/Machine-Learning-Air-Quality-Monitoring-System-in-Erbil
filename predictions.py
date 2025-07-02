import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from ml import location_results, df, features

# Generate future dates (2 months = ~60 days, 4 times per day)
last_date = df['timestamp'].max()
future_dates = pd.date_range(start=last_date + timedelta(hours=6), periods=60*4, freq='6h')

# Create DataFrames for each location
makhmor_predictions = []
naznaz_predictions = []

for location in location_results.keys():
    location_name = location_results[location]['name']
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
    
    # Ensure predictions don't go below 10 µg/m³
    future_predictions = np.maximum(future_predictions, 10)
    
    # Create DataFrame for this location
    location_df = pd.DataFrame({
        'Date': future_dates,
        'PM2.5 (µg/m³)': future_predictions
    })
    
    # Reshape the data to show 4 predictions per day in columns
    location_df['Time'] = location_df['Date'].dt.strftime('%H:%M')
    location_df['Date'] = location_df['Date'].dt.date
    location_df = location_df.pivot(index='Date', columns='Time', values='PM2.5 (µg/m³)')
    
    # Reset index to make 'Date' a column
    location_df = location_df.reset_index()
    # Reorder columns so 'Date' is first
    cols = location_df.columns.tolist()
    cols = ['Date'] + [col for col in cols if col != 'Date']
    location_df = location_df[cols]
    location_df = location_df.round(2)
    
    if location_name == 'Makhmor':
        makhmor_predictions = location_df
    else:
        naznaz_predictions = location_df

# Save predictions to Excel file
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
excel_filename = f'pm25_predictions_{timestamp}.xlsx'
with pd.ExcelWriter(excel_filename, engine='openpyxl') as writer:
    makhmor_predictions.to_excel(writer, sheet_name='Makhmor Predictions', index=False)
    naznaz_predictions.to_excel(writer, sheet_name='Naznaz Predictions', index=False)
    
    # Adjust column widths for better readability
    for sheet_name in writer.sheets:
        worksheet = writer.sheets[sheet_name]
        worksheet.column_dimensions['A'].width = 20
        worksheet.column_dimensions['B'].width = 15
        worksheet.column_dimensions['C'].width = 15
        worksheet.column_dimensions['D'].width = 15
        worksheet.column_dimensions['E'].width = 15

print(f"\nPredictions have been saved to {excel_filename}") 