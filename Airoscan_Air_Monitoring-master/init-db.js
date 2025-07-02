// Database Initialization Script
// This script will create the necessary tables and populate them with sample data
// Run this script once to set up your database

// Constants for database configuration
const SUPABASE_URL = 'https://gyrcemnqauyoxkjwprjg.supabase.co';
const OFFLINE_THRESHOLD = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Function to initialize the database connection
async function initializeDatabase() {
    try {
        // Check if API key exists in localStorage
        let apiKey = localStorage.getItem('supabase_api_key');
        
        if (!apiKey) {
            // If no API key is found, prompt the user
            apiKey = prompt('Please enter your Supabase API key:');
            if (!apiKey) {
                throw new Error('API key is required to connect to the database.');
            }
        }

        // Set the API key and initialize the client
        const success = window.dbConfig.setApiKey(apiKey);
        if (!success) {
            throw new Error('Failed to initialize database client.');
        }

        // Test the connection
        const { data, error } = await window.dbConfig.client
            .from('sensor_data')
            .select('id')
            .limit(1);

        if (error) {
            throw new Error(`Database connection test failed: ${error.message}`);
        }

        console.log('Database initialized successfully');
        return true;
    } catch (error) {
        // Clear the invalid API key
        localStorage.removeItem('supabase_api_key');
        return false;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeDatabase);

// Helper to create the SQL function for table creation (only needs to be run once)
async function createSqlFunction(supabase) {
    const { error } = await supabase.rpc('exec_sql', {
        sql_statement: `
            CREATE OR REPLACE FUNCTION create_air_quality_table(table_name text) RETURNS void AS $$
            BEGIN
                EXECUTE format('
                    CREATE TABLE IF NOT EXISTS %I (
                        id SERIAL PRIMARY KEY,
                        pm25 NUMERIC NOT NULL,
                        "Location" VARCHAR(255) NOT NULL,
                        timestamp TIMESTAMPTZ DEFAULT NOW(),
                        notes TEXT
                    )', table_name);
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
        `
    });
    
    if (error) {
        console.error('Error creating SQL function:', error);
    } else {
        console.log('SQL function created successfully');
    }
} 