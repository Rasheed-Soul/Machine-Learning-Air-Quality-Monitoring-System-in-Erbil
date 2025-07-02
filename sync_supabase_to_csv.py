from supabase import create_client, Client
import pandas as pd
import os

# Supabase credentials
url = "https://gyrcemnqauyoxkjwprjg.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cmNlbW5xYXV5b3hrandwcmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjgxOTMsImV4cCI6MjA1NzY0NDE5M30.x48M-AQjLMYwUA_aPNvlNnnkYrOfmexbYj8gX-RNtnA"

supabase: Client = create_client(url, key)

# Fetch all data from the 'sensor_data' table
response = supabase.table('sensor_data').select('*').execute()
data = response.data

if not data:
    print("No data found in the 'sensor_data' table.")
else:
    # Convert to DataFrame and save as CSV
    df = pd.DataFrame(data)
    output_path = os.path.join("ML_air_quality", "sensor_data_rows_new.csv")
    df.to_csv(output_path, index=False)
    print(f"CSV updated from Supabase! Saved to {output_path}")
