// Supabase configuration
const SUPABASE_URL = 'https://gyrcemnqauyoxkjwprjg.supabase.co';

// --- PASTE YOUR PUBLIC ANON KEY HERE ---
// This key is safe to include in your frontend code for read-only access.
// Get it from your Supabase Project > Settings > API > Project API Keys
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cmNlbW5xYXV5b3hrandwcmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjgxOTMsImV4cCI6MjA1NzY0NDE5M30.x48M-AQjLMYwUA_aPNvlNnnkYrOfmexbYj8gX-RNtnA";
// --- END OF KEY ---

// Database table name
const AIR_QUALITY_TABLE_NAME = 'sensor_data';

// Expected table structure comment (for reference)
/*
  CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    pm25 NUMERIC NOT NULL,
    "Location" VARCHAR(255) NOT NULL, // Make sure this column exists and stores the location string
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    humidity NUMERIC, // Optional: Add if you track humidity
    notes TEXT
  );
*/

// Database configuration object
const dbConfig = {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY, // Store the key
    airQualityTable: AIR_QUALITY_TABLE_NAME,
    client: null, // Supabase client instance

    // Method to initialize the Supabase client
    initClient: function() {
        // Check if the key was actually pasted in
        if (!this.supabaseAnonKey || this.supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY_HERE") {
            // Optionally, show an error to the user here as well,
            // because the dashboard won't work without the key.
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.textContent = 'Configuration Error: Missing database key. Site cannot load data.';
                errorDiv.style.display = 'block';
            }
            return false; // Indicate failure
        }

        try {
            // Check if the Supabase library is loaded
            if (typeof supabase === 'undefined' || typeof supabase.createClient !== 'function') {
                throw new Error('Supabase library (supabase-js) not loaded correctly.');
            }

            // Create the Supabase client using the hardcoded anon key
            // This single line replaces the old logic that used localStorage
            this.client = supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
            return true; // Indicate success

        } catch (error) {
            // Optionally, show an error to the user here as well,
            // because the dashboard won't work without the key.
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.textContent = `Error initializing database connection: ${error.message}`;
                errorDiv.style.display = 'block';
            }
            return false; // Indicate failure
        }
    }
    // Removed the old setApiKey function as it's not needed for public view
};

// Make dbConfig accessible globally
if (typeof window !== 'undefined') {
    window.dbConfig = dbConfig;

    // --- Automatically initialize the client when this script loads ---
    // This ensures the connection is ready when app.js runs.
    dbConfig.initClient();
    // We no longer rely on localStorage or init-db.html for the public dashboard.
}

// Note: All the old code reading from localStorage or related to setApiKey is removed.
// This version ONLY uses the hardcoded SUPABASE_ANON_KEY above.