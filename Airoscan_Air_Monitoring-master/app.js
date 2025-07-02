// SUPABASE INITIALIZATION
let supabase;
let mainChart;
// Note: location1Chart, naznazChart, humidityChart were declared but not fully used in original app.js for separate charts.
// Main focus is on mainChart and data processing.

// Constants
const timeRanges = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000
};

let currentTimeRange = '24h';
let allReadings = [];
let makhmorRoadData = [];
let naznazAreaData = [];
let currentPage = 1;
const itemsPerPage = 10; // For the paginated raw data table, not predictions

// Global variables for averages
let averages = {
    'makhmor-road': { '24h': { pm25: 0, humidity: 0 }, '7d': { pm25: 0, humidity: 0 }, '30d': { pm25: 0, humidity: 0 }},
    'naznaz-area': { '24h': { pm25: 0, humidity: 0 }, '7d': { pm25: 0, humidity: 0 }, '30d': { pm25: 0, humidity: 0 }}
};

// Global variables to store the 7-day forecasts (will be populated from CSVs)
let fileLoadedMakhmorPredictions = null;
let fileLoadedNaznazPredictions = null;

// This global 'predictions' object will be populated by calculate7DayDailyPrediction
// and used by the display function.
let predictions = {
    'makhmor-road': [],
    'naznaz-area': []
};

const locationMapping = {
    "36.112146, 43.953925": 'makhmor-road',
    "36.213724, 43.988080": 'naznaz-area'
};

// DOM Elements (ensure these are correctly ID'd in your HTML)
const pageInfoElement = document.getElementById('page-info');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const locationFilterElement = document.getElementById('location-filter');
const currentTimeElement = document.getElementById('current-time');
const readingsTableBody = document.getElementById('readings-table-body');
const readingsCards = document.getElementById('readings-cards');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Function to show error messages
function showError(message, duration = 7000) {
    const errorContainer = document.getElementById('error-message');
    if (!errorContainer) {
        return;
    }
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, duration);
}

// Calculates averages for 24h, 7d, and 30d for pm25 and humidity
function calculateAverages(data) {
    const now = new Date();
    const result = { '24h': { pm25: 0, humidity: 0 }, '7d': { pm25: 0, humidity: 0 }, '30d': { pm25: 0, humidity: 0 } };
    const timeRanges = { '24h': 24 * 60 * 60 * 1000, '7d': 7 * 24 * 60 * 60 * 1000, '30d': 30 * 24 * 60 * 60 * 1000 };
    Object.keys(timeRanges).forEach(range => {
        const cutoff = now - timeRanges[range];
        const filtered = data.filter(r => r.timestamp >= cutoff && r.pm25 !== null && r.humidity !== null);
        if (filtered.length > 0) {
            result[range].pm25 = filtered.reduce((sum, r) => sum + parseFloat(r.pm25), 0) / filtered.length;
            result[range].humidity = filtered.reduce((sum, r) => sum + parseFloat(r.humidity), 0) / filtered.length;
        }
    });
    return result;
}

// --- CSV Processing and Prediction Logic ---

function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r\n|\n/);
    if (lines.length < 2) {
        return [];
    }
    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];
    const timeHeaders = ["03:00:00", "09:00:00", "15:00:00", "21:00:00"];
    const altTimeHeader = "15:00 PM"; // Alternative for Naznaz 15:00 column

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const rowObject = {};
            headers.forEach((header, index) => {
                rowObject[header.trim()] = values[index].trim();
            });

            let pmValues = [];
            timeHeaders.forEach(timeHeader => {
                let valStr = rowObject[timeHeader];
                // Check for alternative 15:00 header if primary is not found or empty
                if (timeHeader === "15:00:00" && (!valStr || valStr.trim() === "") && rowObject[altTimeHeader]) {
                    valStr = rowObject[altTimeHeader];
                }
                if (valStr && !isNaN(parseFloat(valStr))) {
                    pmValues.push(parseFloat(valStr));
                }
            });
            
            if (pmValues.length > 0) { // Calculate average if at least one value exists
                rowObject.dailyAveragePm25 = pmValues.reduce((a, b) => a + b, 0) / pmValues.length;
            } else {
                rowObject.dailyAveragePm25 = null; // Mark as null if no valid PM values for the day
            }
            data.push(rowObject);
        } else {
            console.warn(`Skipping malformed CSV line ${i + 1}: expected ${headers.length} values, got ${values.length}`);
        }
    }
    return data;
}

function processParsedCsvDataForForecast(parsedCsvData) {
    if (!parsedCsvData || parsedCsvData.length === 0) {
        return Array(7).fill(null).map((_, i) => { // Return empty structure
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + i);
            return {
                dayName: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric'}),
                date: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric'}),
                pm25: null, confidence: 0
            };
        });
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const sevenDayForecast = [];
    let currentDate = new Date(); // Today's actual date

    for (let i = 0; i < 7; i++) { // For today + next 6 days
        const targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() + i);
        
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const targetDateString = `${year}-${month}-${day}`;

        const csvEntryForDate = parsedCsvData.find(row => row.Date === targetDateString);

        if (csvEntryForDate && csvEntryForDate.dailyAveragePm25 !== null) {
            sevenDayForecast.push({
                dayName: dayNames[targetDate.getDay()],
                date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                pm25: parseFloat(csvEntryForDate.dailyAveragePm25.toFixed(1)),
                confidence: 100 // Data from file, so "confident"
            });
        } else {
            sevenDayForecast.push({
                dayName: dayNames[targetDate.getDay()],
                date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                pm25: null,
                confidence: 0 
            });
        }
    }
    return sevenDayForecast;
}

async function loadPredictionsFromRepo(locationId) {
    // --- Recommended: Rename your CSV files in the 'data' folder to these simpler names ---
    const makhmorCsvName = 'makhmor_predictions.csv';
    const naznazCsvName = 'naznaz_predictions.csv';
    // --- Or, use your current full names (ensure they are URL-encoded if they have spaces/special chars, though fetch often handles this): ---
    // const makhmorCsvName = 'pm25_predictions_20250523_001445.xlsx - Makhmor Predictions.csv';
    // const naznazCsvName = 'pm25_predictions_20250523_001445.xlsx - Naznaz Predictions.csv';

    const basePath = 'data/'; // Assuming CSVs are in a 'data' folder at the root of your GitHub Pages site
    const csvPath = locationId === 'makhmor-road' ? basePath + makhmorCsvName : basePath + naznazCsvName;

    try {
        const response = await fetch(csvPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${csvPath}: ${response.status} ${response.statusText}. Ensure the file exists at this path in your GitHub repository and the site is deployed. Correct file name and path are crucial.`);
        }
        const csvText = await response.text();
        if (!csvText.trim()) {
            throw new Error(`CSV file ${csvPath} is empty.`);
        }
        const parsedData = parseCSV(csvText);
        const forecast = processParsedCsvDataForForecast(parsedData);

        if (forecast) {
            if (locationId === 'makhmor-road') {
                fileLoadedMakhmorPredictions = forecast;
            } else if (locationId === 'naznaz-area') {
                fileLoadedNaznazPredictions = forecast;
            }
        } else {
            if (locationId === 'makhmor-road') fileLoadedMakhmorPredictions = null;
            if (locationId === 'naznaz-area') fileLoadedNaznazPredictions = null;
        }
    } catch (error) {
        // showError(`Error loading ${locationId} predictions: ${error.message}`); // Suppressed for user-friendliness
        if (locationId === 'makhmor-road') fileLoadedMakhmorPredictions = null;
        if (locationId === 'naznaz-area') fileLoadedNaznazPredictions = null;
    }
}

function calculate7DayDailyPrediction(locationId, locationData) { // locationData is from live sensors, not used for CSV predictions
    if (locationId === 'makhmor-road' && fileLoadedMakhmorPredictions) {
        return fileLoadedMakhmorPredictions;
    } else if (locationId === 'naznaz-area' && fileLoadedNaznazPredictions) {
        return fileLoadedNaznazPredictions;
    }

    // Fallback if CSV data isn't loaded (e.g., file not found, parsing error)
    // This uses the complex historical calculation from your original app.js
    // You can replace this with a simpler placeholder if preferred.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const predictionsArray = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const HISTORICAL_DAYS_TO_CONSIDER = 21;
    const RECENT_DAYS_FOR_OVERALL_AVG = 5;
    const MIN_TOTAL_DAILY_DATAPOINTS = 5;
    const WEIGHT_DOW = 0.6;
    const WEIGHT_RECENT = 0.4;
    const dailyAveragesMap = {};
    const historyStartDate = new Date(today.getTime() - HISTORICAL_DAYS_TO_CONSIDER * 24 * 60 * 60 * 1000);

    (locationData || []).forEach(r => { // Use provided locationData for fallback
        if (r.timestamp instanceof Date && r.timestamp >= historyStartDate && r.timestamp < today && r.pm25 !== null && r.pm25 !== undefined) {
            const recordDate = new Date(r.timestamp);
            recordDate.setHours(0,0,0,0);
            const dayKey = recordDate.toISOString().split('T')[0];
            if (!dailyAveragesMap[dayKey]) {
                dailyAveragesMap[dayKey] = { sum: 0, count: 0, date: recordDate, dayOfWeek: recordDate.getDay() };
            }
            dailyAveragesMap[dayKey].sum += parseFloat(r.pm25);
            dailyAveragesMap[dayKey].count += 1;
        }
    });
    const sortedPastDailyAverages = Object.keys(dailyAveragesMap)
        .map(key => ({ ...dailyAveragesMap[key], avgPm25: dailyAveragesMap[key].sum / dailyAveragesMap[key].count }))
        .sort((a, b) => a.date - b.date);

    if (sortedPastDailyAverages.length < MIN_TOTAL_DAILY_DATAPOINTS) {
        let fallbackPm25 = null;
        if (sortedPastDailyAverages.length > 0) fallbackPm25 = sortedPastDailyAverages[sortedPastDailyAverages.length - 1].avgPm25;
        else if ((locationData || []).length > 0 && locationData[0].pm25 !== null) fallbackPm25 = parseFloat(locationData[0].pm25);
        for (let i = 0; i < 7; i++) {
            const targetDate = new Date(today); targetDate.setDate(today.getDate() + i + 1); // Predictions for next 7 days
            predictionsArray.push({ dayName: dayNames[targetDate.getDay()], date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric'}), pm25: fallbackPm25 !== null ? Math.max(0, fallbackPm25) : null, confidence: 10 });
        }
        return predictionsArray;
    }
    const recentOverallSlice = sortedPastDailyAverages.slice(-RECENT_DAYS_FOR_OVERALL_AVG);
    let pm25RecentOverallAvg = null;
    if (recentOverallSlice.length > 0) pm25RecentOverallAvg = recentOverallSlice.reduce((sum, day) => sum + day.avgPm25, 0) / recentOverallSlice.length;

    for (let i = 0; i < 7; i++) {
        const targetDate = new Date(today); targetDate.setDate(today.getDate() + i + 1); // Predictions for next 7 days
        const targetDayOfWeek = targetDate.getDay();
        const dowSpecificAverages = sortedPastDailyAverages.filter(d => d.dayOfWeek === targetDayOfWeek);
        let pm25DowSpecificAvg = null;
        if (dowSpecificAverages.length > 0) pm25DowSpecificAvg = dowSpecificAverages.reduce((sum, day) => sum + day.avgPm25, 0) / dowSpecificAverages.length;
        let predictedPm25 = null;
        if (pm25DowSpecificAvg !== null && pm25RecentOverallAvg !== null) predictedPm25 = (WEIGHT_DOW * pm25DowSpecificAvg) + (WEIGHT_RECENT * pm25RecentOverallAvg);
        else if (pm25DowSpecificAvg !== null) predictedPm25 = pm25DowSpecificAvg;
        else if (pm25RecentOverallAvg !== null) predictedPm25 = pm25RecentOverallAvg;
        else predictedPm25 = sortedPastDailyAverages[sortedPastDailyAverages.length - 1].avgPm25;
        let currentConfidence = 20;
        if (dowSpecificAverages.length >= 2 && recentOverallSlice.length >= Math.min(3, RECENT_DAYS_FOR_OVERALL_AVG)) currentConfidence = 70;
        else if (dowSpecificAverages.length >= 1 && recentOverallSlice.length >= Math.min(3, RECENT_DAYS_FOR_OVERALL_AVG)) currentConfidence = 60;
        else if (dowSpecificAverages.length >= 2) currentConfidence = 50;
        else if (recentOverallSlice.length >= Math.min(3, RECENT_DAYS_FOR_OVERALL_AVG)) currentConfidence = 40;
        else if (dowSpecificAverages.length === 1) currentConfidence = 30;
        currentConfidence -= i * 5;
        predictionsArray.push({ dayName: dayNames[targetDate.getDay()], date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric'}), pm25: predictedPm25 !== null ? Math.max(0, predictedPm25) : null, confidence: Math.max(10, Math.min(currentConfidence, 85)) });
    }
    return predictionsArray;
}


// --- Core Dashboard Update Functions ---

async function refreshData() {
    try {
        if (!window.dbConfig || !window.dbConfig.client) {
            throw new Error('Database client is not available. Check initialization.');
        }
        const { data: readings, error } = await window.dbConfig.client
            .from(window.dbConfig.airQualityTable)
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(1000); 

        if (error) throw new Error(`Database query failed: ${error.message}`);
        if (!readings) { // readings can be null if query is fine but table is empty
             console.warn('No readings returned from database (query successful but no data).');
             allReadings = []; // Ensure it's an empty array
        } else {
            allReadings = readings.map(r => ({ ...r, timestamp: new Date(r.timestamp), Location: r.Location || "Unknown" }));
        }


        const readingsByLocation = { 'makhmor-road': [], 'naznaz-area': [] };
        allReadings.forEach(reading => {
            const locationString = reading.Location;
            const locationId = Object.keys(locationMapping).find(key => locationString === key) ? locationMapping[locationString] :
                               (locationString === "Makhmor Road" ? 'makhmor-road' : (locationString === "Naznaz Area" ? 'naznaz-area' : null));
            if (locationId && readingsByLocation[locationId]) {
                 readingsByLocation[locationId].push(reading);
            }
        });

        makhmorRoadData = readingsByLocation['makhmor-road'].sort((a, b) => b.timestamp - a.timestamp);
        naznazAreaData = readingsByLocation['naznaz-area'].sort((a, b) => b.timestamp - a.timestamp);
        
        window.makhmorRoadData = makhmorRoadData; // Make available globally for map popups if needed
        window.naznazAreaData = naznazAreaData;

        if (makhmorRoadData.length > 0) {
            averages['makhmor-road'] = calculateAverages(makhmorRoadData);
            // calculate7DayDailyPrediction is now primarily fed by fileLoadedMakhmorPredictions (if available via fetch)
            // It uses makhmorRoadData (live sensor data) ONLY if CSV fetch failed, for its internal historical calculation.
            predictions['makhmor-road'] = calculate7DayDailyPrediction('makhmor-road', makhmorRoadData);
            updateLocationDisplay('makhmor-road', makhmorRoadData[0]);
        } else {
            updateLocationDisplay('makhmor-road', null); // Show '--' etc.
            predictions['makhmor-road'] = calculate7DayDailyPrediction('makhmor-road', []); // Get fallback/empty predictions
        }

        if (naznazAreaData.length > 0) {
            averages['naznaz-area'] = calculateAverages(naznazAreaData);
            predictions['naznaz-area'] = calculate7DayDailyPrediction('naznaz-area', naznazAreaData);
            updateLocationDisplay('naznaz-area', naznazAreaData[0]);
        } else {
            updateLocationDisplay('naznaz-area', null);
            predictions['naznaz-area'] = calculate7DayDailyPrediction('naznaz-area', []);
        }

        updateAveragesDisplay();
        updatePredictionsDisplay(); // This will now use the new detailed display logic
        updateDataTable(); // For the paginated table of raw readings
        updateCharts(readingsByLocation); // For the main trend chart

        if (typeof window.updateMapData === 'function') {
             window.updateMapData(); // Update map markers and popups
        }
    } catch (error) {
        showError('Failed to refresh sensor data: ' + error.message);
        // Consider resetting UI to 'no data' state for sensor dependent parts
        updateLocationDisplay('makhmor-road', null);
        updateLocationDisplay('naznaz-area', null);
        // predictions might still show from CSV or fallback, which is fine
    }
}

function updateLocationDisplay(locationId, reading) {
    const prefix = locationId === 'makhmor-road' ? 'makhmor' : 'naznaz';
    const isMakhmor = locationId === 'makhmor-road';
    const detailPrefix = isMakhmor ? 'location1' : 'naznaz'; // For the two main summary cards
    const locationName = isMakhmor ? (window.t ? window.t('makhmor') : 'Makhmor Road') : (window.t ? window.t('naznaz') : 'Naznaz Area');


    const elements = {
        currentPM25: document.getElementById(`${prefix}-current-pm25`),
        airQualityStatus: document.getElementById(`${prefix}-air-quality-status`),
        statusTime: document.getElementById(`${prefix}-status-time`),
        lastUpdated: document.getElementById(`${prefix}-last-updated`),
        timeAgo: document.getElementById(`${prefix}-time-ago`),
        lastWeekAveragePM25: document.getElementById(`${prefix}-last-week-avg-pm25`),
        // sensorStatus: document.getElementById(`${prefix}-sensor-status`), // Handled by sensor-status.js

        // Elements in the two summary cards at the bottom
        detailName: document.getElementById(`${detailPrefix}-name`), // e.g. location1-name
        detailPM25: document.getElementById(`${detailPrefix}-pm25`), // e.g. location1-pm25
        detailHumidity: document.getElementById(`${detailPrefix}-humidity`), // e.g. location1-humidity
        detailTimestamp: document.getElementById(`${detailPrefix}-timestamp`) // e.g. location1-timestamp
    };
    
    if (elements.detailName) elements.detailName.innerHTML = window.t ? window.t(isMakhmor ? 'makhmor' : 'naznaz') : locationName;


    if (!reading) { // No current sensor reading
        if (elements.currentPM25) elements.currentPM25.textContent = '--';
        if (elements.airQualityStatus) {
            elements.airQualityStatus.textContent = window.t ? window.t('noData') : 'No Data';
            elements.airQualityStatus.className = 'status-badge nodata-status shadow-sm';
        }
        if (elements.statusTime) elements.statusTime.textContent = window.t ? window.t('updating') : 'Updating...';
        if (elements.lastUpdated) elements.lastUpdated.textContent = window.t ? window.t('unknown') : 'Unknown';
        if (elements.timeAgo) elements.timeAgo.textContent = window.t ? window.t('loading') : 'Loading...';
        
        // For the summary cards
        if (elements.detailPM25) elements.detailPM25.innerHTML = `--<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">${window.t ? window.t('microgramPM25') : 'μg/m³ PM2.5'}</span>`;
        if (elements.detailHumidity) elements.detailHumidity.innerHTML = `--<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">${window.t ? window.t('percentHumidity') : '% Humidity'}</span>`;
        if (elements.detailTimestamp) elements.detailTimestamp.textContent = '--:--';

        if (window.sensorStatus && typeof window.sensorStatus.updateLastUpdate === 'function') {
            window.sensorStatus.updateLastUpdate(locationName, null); // Update sensor status module
        }
        // Averages will be updated by updateAveragesDisplay based on potentially empty data
        return;
    }

    const pm25Value = reading.pm25 !== null && reading.pm25 !== undefined ? parseFloat(reading.pm25) : null;
    const humidityValue = reading.humidity !== null && reading.humidity !== undefined ? parseFloat(reading.humidity) : null;
    const timestamp = reading.timestamp;

    if (elements.currentPM25) elements.currentPM25.textContent = pm25Value !== null ? pm25Value.toFixed(1) : '--';
    
    if (elements.airQualityStatus) {
        const statusInfo = getAirQualityStatus(pm25Value); // getAirQualityStatus handles null pm25Value
        elements.airQualityStatus.textContent = statusInfo.status;
        elements.airQualityStatus.className = `status-badge ${statusInfo.className} shadow-sm`;
    }

    if (timestamp instanceof Date && !isNaN(timestamp)) {
        if (elements.statusTime) elements.statusTime.textContent = `${window.t ? window.t('asOf') : 'As of'} ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        if (elements.lastUpdated) elements.lastUpdated.textContent = timestamp.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        if (elements.timeAgo) elements.timeAgo.textContent = getTimeAgo(timestamp);
        if (elements.detailTimestamp) elements.detailTimestamp.textContent = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (window.sensorStatus && typeof window.sensorStatus.updateLastUpdate === 'function') {
             window.sensorStatus.updateLastUpdate(locationName, timestamp);
        }
    } else {
        const invalidDateText = window.t ? window.t('invalidDate') : 'Invalid Date';
        if (elements.statusTime) elements.statusTime.textContent = invalidDateText;
        if (elements.lastUpdated) elements.lastUpdated.textContent = invalidDateText;
        if (elements.timeAgo) elements.timeAgo.textContent = 'Error';
        if (elements.detailTimestamp) elements.detailTimestamp.textContent = '--:--';
    }

    // For the summary cards at the bottom
    if (elements.detailPM25) elements.detailPM25.innerHTML = `${pm25Value !== null ? pm25Value.toFixed(1) : '--'}<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">${window.t ? window.t('microgramPM25') : 'μg/m³ PM2.5'}</span>`;
    if (elements.detailHumidity) elements.detailHumidity.innerHTML = `${humidityValue !== null ? humidityValue.toFixed(1) : '--'}<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">${window.t ? window.t('percentHumidity') : '% Humidity'}</span>`;
    
    // Averages are updated by a separate function: updateAveragesDisplay
    // The lastWeekAveragePM25 element is updated in updateAveragesDisplay
}


function getAirQualityStatus(pm25) { // Handles translations via window.t
    const t = window.t || (key => key.charAt(0).toUpperCase() + key.slice(1)); // Simple fallback for t()

    if (pm25 === undefined || pm25 === null || isNaN(pm25)) {
        return { status: t('noData'), className: 'nodata-status', color: '#6B7280' };
    }
    if (pm25 <= 5) return { status: t('safe'), className: 'safe-status', color: '#10B981' };
    if (pm25 <= 10) return { status: t('low'), className: 'low-status', color: '#90EE90' };
    if (pm25 <= 15) return { status: t('moderate'), className: 'moderate-status', color: '#F59E0B' }; // Orange-ish
    if (pm25 <= 25) return { status: t('unhealthy'), className: 'unhealthy-status', color: '#7F1D1D' }; // Red
    if (pm25 <= 35) return { status: t('veryUnhealthy'), className: 'very-unhealthy-status', color: '#8B5CF6' }; // Purple
    return { status: t('hazardous'), className: 'hazardous-status', color: '#8B5CF6' }; // Dark Red/Maroon
}

// Helper functions for the detailed prediction display (moved from index.html)
function getQualityClass(status) { // Used by new prediction display
    const t = window.t || (key => key);
    switch(status) {
        case t('safe'): return 'quality-safe';
        case t('low'): return 'quality-low';
        case t('moderate'): return 'quality-moderate';
        case t('unhealthy'): return 'quality-unhealthy';
        case t('veryUnhealthy'): return 'quality-very-unhealthy';
        case t('hazardous'): return 'quality-hazardous';
        default: return 'quality-moderate'; // Default or for 'No Data'
    }
}

function pm25TextClass(pm25) { // Adapted from pm25ValueColor in index.html for text color classes
    if (pm25 === null || isNaN(pm25)) return 'text-gray-500 dark:text-gray-400';
    if (pm25 <= 5) return 'text-green-600 dark:text-green-400';
    if (pm25 <= 10) return 'text-yellow-600 dark:text-yellow-400';
    if (pm25 <= 15) return 'text-orange-600 dark:text-orange-400';
    if (pm25 <= 25) return 'text-red-600 dark:text-red-500';
    if (pm25 <= 35) return 'text-purple-600 dark:text-purple-400';
    return 'text-red-800 dark:text-red-300';
}


// --- PREDICTION DISPLAY - DETAILED VERSION (Moved from index.html and adapted) ---
function updatePredictionsDisplay() {
    const t = window.t || (key => key.replace(/([A-Z])/g, ' $1').trim()); // Fallback for t()

    ['makhmor-road', 'naznaz-area'].forEach(locationId => {
        const detailPrefix = locationId === 'makhmor-road' ? 'location1' : 'naznaz';
        // `predictions` is the global object in app.js, populated by calculate7DayDailyPrediction
        const dailyPredictionsArray = predictions[locationId];
        const predictionContainerElement = document.getElementById(`${detailPrefix}-prediction`); // e.g., location1-prediction
        const isNaznaz = locationId === 'naznaz-area'; // For specific confidence text if needed

        if (predictionContainerElement) {
            predictionContainerElement.innerHTML = ''; // Clear previous content

            let sectionTitleHTML = `
                <div class="prediction-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-4 h-4 mr-2 align-middle">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    <span>${t('forecast7Day')}</span>
                </div>`;
            predictionContainerElement.innerHTML = sectionTitleHTML;

            if (dailyPredictionsArray && Array.isArray(dailyPredictionsArray) && dailyPredictionsArray.length > 0 && dailyPredictionsArray.some(p => p.pm25 !== null)) {
                let itemsHTML = '';
                dailyPredictionsArray.forEach((dailyPred, index) => {
                    if (!dailyPred) return;

                    const statusInfo = getAirQualityStatus(dailyPred.pm25); // Uses the one in app.js
                    const qualityDotClass = getQualityClass(statusInfo.status); // Uses helper moved to app.js
                    const pm25ColorClass = pm25TextClass(dailyPred.pm25); // Uses helper moved to app.js
                    
                    const confidence = dailyPred.confidence !== null && dailyPred.confidence !== undefined ? Math.round(dailyPred.confidence) : 0;
                    const confidenceBarClass = isNaznaz ? 'confidence-bar-naznaz' : 'confidence-bar-makhmor'; // CSS classes for bar color

                    let descriptionText = t('processingData'); // Default
                    if (fileLoadedMakhmorPredictions || fileLoadedNaznazPredictions) { // If data is from CSV
                        descriptionText = t('highConfidence'); // Assume high confidence for file-based data
                    } else { // Original confidence text logic if using calculated predictions
                        if (confidence >= 70) descriptionText = t('highConfidence');
                        else if (confidence >= 55) descriptionText = t('moderateConfidence');
                        else if (confidence >= 40) descriptionText = t('patternMatch'); // Could be more specific
                        else if (confidence >= 25) descriptionText = t('weeklyAverage');
                        else descriptionText = t('limitedData');
                    }
                    
                    // Day name translation: attempt to use t(key), fallback to original dayName
                    const dayKey = dailyPred.dayName ? dailyPred.dayName.toLowerCase() : 'na';
                    const translatedDayName = t(dayKey) !== dayKey ? t(dayKey) : dailyPred.dayName || 'N/A';

                    itemsHTML += `
                        <div class="prediction-item" style="--index: ${index};">
                            <div class="prediction-item-header">
                                <div class="prediction-item-dayinfo">
                                    <span class="prediction-item-dot ${qualityDotClass}"></span>
                                    <span class="prediction-item-date">${translatedDayName}, ${dailyPred.date || 'N/A'}</span>
                                </div>
                                <span class="prediction-item-pm25 ${pm25ColorClass}">
                                    ${dailyPred.pm25 !== null ? `<span class="number-en">${dailyPred.pm25.toFixed(1)}</span>` : 'N/A'}
                                    ${dailyPred.pm25 !== null ? `<span class="unit">${t('microgramUnit')}</span>` : ''}
                                </span>
                            </div>
                            <div class="prediction-item-details">
                                <div class="prediction-item-confidence-label">${t('confidence')}</div>
                                <div class="prediction-item-confidence-bar-container">
                                    <div class="prediction-item-confidence-bar-bg">
                                        <div class="prediction-item-confidence-bar ${confidenceBarClass}" style="width: ${confidence}%;"></div>
                                    </div>
                                    <span class="prediction-item-confidence-value number-en">${confidence}%</span>
                                </div>
                                <p class="prediction-item-description">${descriptionText}</p>
                            </div>
                        </div>
                    `;
                });
                predictionContainerElement.innerHTML += itemsHTML;
            } else {
                predictionContainerElement.innerHTML += `
                    <div class="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        ${t('forecastUnavailable')}
                    </div>`;
            }
        } else {
            console.warn(`Prediction container element not found for ${detailPrefix}-prediction`);
        }
    });
}


// --- Initialization and Event Listeners ---

async function initializeSupabase() {
    try {
        if (!window.dbConfig || !window.dbConfig.client) {
            throw new Error('Database client not found. db-config.js might have failed to initialize it.');
        }
        const { error } = await window.dbConfig.client
            .from(window.dbConfig.airQualityTable)
            .select('id', { count: 'exact', head: true }); // Simple query to test connection & RLS

        if (error) {
            let userMessage = `Database connection test failed: ${error.message}.`;
            if (error.message.includes('fetch') || error.message.toLowerCase().includes('networkerror')) {
                 userMessage = 'Database Connection Error: Network issue. Please check your internet connection and Supabase status.';
            } else if (error.message.includes('security barrier') || error.message.includes('violates row-level security policy')) {
                 userMessage = `Database Read Error: Check Row Level Security (RLS) policies on the '${window.dbConfig.airQualityTable}' table in Supabase. Ensure 'anon' role has SELECT permission.`;
            } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
                userMessage = `Database Error: The table '${window.dbConfig.airQualityTable}' might not exist or is named differently.`;
            }
            throw new Error(userMessage); // Throw with user-friendly message
        }
        return true;
    } catch (error) {
        showError(error.message); // Show the refined error message
        return false;
    }
}

function updateThemeIcons(isDarkMode) {
    if (!themeToggleDarkIcon || !themeToggleLightIcon) return;
    if (isDarkMode) {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    } else {
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    }
}

function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    updateThemeIcons(isDarkMode);
    if (typeof window.updateMapTheme === 'function') window.updateMapTheme(); // For Leaflet maps in index.html
    refreshData(); // Re-render charts and data with new theme
}

function applyInitialTheme() {
    const storedTheme = localStorage.getItem('darkMode');
    let isDarkMode = false;
    if (storedTheme === 'enabled') isDarkMode = true;
    else if (storedTheme === 'disabled') isDarkMode = false;
    else isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    document.documentElement.classList.toggle('dark', isDarkMode);
    updateThemeIcons(isDarkMode);
}

function initCharts() { // Consolidated chart initialization
    try {
        const mainChartElement = document.getElementById('air-quality-chart');
        if (!mainChartElement) { return false; }
        const ctxMain = mainChartElement.getContext('2d');
        if (!ctxMain) { return false; }

        const isDarkMode = document.documentElement.classList.contains('dark');
        Chart.defaults.font.family = "'Manrope', sans-serif";

        const gradientMakhmor = ctxMain.createLinearGradient(0, 0, 0, 320);
        gradientMakhmor.addColorStop(0, 'rgba(255, 122, 0, 0.3)');
        gradientMakhmor.addColorStop(1, 'rgba(255, 122, 0, 0)');
        const gradientNaznaz = ctxMain.createLinearGradient(0, 0, 0, 320);
        gradientNaznaz.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradientNaznaz.addColorStop(1, 'rgba(59, 130, 246, 0)');

        mainChart = new Chart(ctxMain, {
            type: 'line',
            data: { /* datasets are populated by updateCharts */ },
            options: { /* options are set by updateCharts or initially here */
                 responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false, axis: 'x' },
                 plugins: {
                    tooltip: { enabled: true, displayColors: true, usePointStyle: true, padding: 12, boxPadding: 6, cornerRadius: 6, titleFont: { weight: 'bold', size: 14 }, bodyFont: { size: 12 },
                        callbacks: {
                            label: (context) => `${context.dataset.label || ''}: ${context.parsed.y !== null ? context.parsed.y.toFixed(1) + ' μg/m³' : 'N/A'}`,
                            title: (tooltipItems) => new Date(tooltipItems[0].parsed.x).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short'})
                        }
                    },
                    legend: { position: 'bottom', align: 'center', labels: { boxWidth: 12, boxHeight: 12, padding: 20, font: { size: 13, weight: '500' }, usePointStyle: true, pointStyle: 'circle' }},
                    zoom: { pan: { enabled: true, mode: 'xy', threshold: 5 }, zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' }}
                 },
                 scales: {
                    x: { type: 'time', time: { tooltipFormat: 'MMM d, HH:mm', displayFormats: { hour: 'HH:mm', day: 'MMM d' }}, grid: { display: false }, ticks: { major: { enabled: true }, font: { size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 10 }},
                    yPm25: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'PM2.5 (μg/m³)', font: { size: 12, weight: '600' }}, grid: { drawBorder: false }, ticks: { font: { size: 11 }, padding: 5 }}
                 }
            }
        });
        // Initialize datasets structure
        mainChart.data.datasets = [
            { label: 'Makhmor Road', borderColor: '#F97316', backgroundColor: gradientMakhmor, pointBackgroundColor: '#F97316', data: [], yAxisID: 'yPm25', fill: true, borderWidth: 2.5, tension: 0.4, pointRadius: 2, pointHoverRadius: 5 },
            { label: 'Naznaz Area', borderColor: '#3B82F6', backgroundColor: gradientNaznaz, pointBackgroundColor: '#3B82F6', data: [], yAxisID: 'yPm25', fill: true, borderWidth: 2.5, tension: 0.4, pointRadius: 2, pointHoverRadius: 5 }
        ];
        return true;
    } catch (error) { showError('Could not initialize charts: ' + error.message); return false; }
}

function updateCharts(processedSensorData) { // Takes live sensor data, not predictions
    if (!mainChart) { return; }
    const now = new Date();
    const timeLimit = timeRanges[currentTimeRange];
    const isDarkMode = document.documentElement.classList.contains('dark');

    const filterAndMapSensorData = (dataArray) => (dataArray || [])
        .filter(r => r.timestamp instanceof Date && !isNaN(r.timestamp) && (now - r.timestamp) <= timeLimit && r.pm25 !== null)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(r => ({ x: r.timestamp, y: parseFloat(r.pm25) }));

    mainChart.data.datasets[0].data = filterAndMapSensorData(processedSensorData['makhmor-road']);
    mainChart.data.datasets[1].data = filterAndMapSensorData(processedSensorData['naznaz-area']);
    
    mainChart.data.datasets[0].label = window.t ? window.t('makhmor') : 'Makhmor Road';
    mainChart.data.datasets[1].label = window.t ? window.t('naznaz') : 'Naznaz Area';


    let pointRadius = 2, pointHoverRadius = 5, timeUnit = 'hour', maxTicks = 10;
    if (currentTimeRange === '7d') { pointRadius = 1.5; pointHoverRadius = 4; timeUnit = 'day'; maxTicks = 7; }
    else if (currentTimeRange === '30d') { pointRadius = 1; pointHoverRadius = 3; timeUnit = 'day'; maxTicks = 10; }

    mainChart.data.datasets.forEach(ds => {
        ds.pointBorderColor = isDarkMode ? '#1F2937' : '#ffffff';
        ds.pointHoverBackgroundColor = isDarkMode ? '#1F2937' : '#ffffff';
        ds.pointRadius = pointRadius; ds.pointHoverRadius = pointHoverRadius;
    });

    mainChart.options.scales.x.time.unit = timeUnit;
    mainChart.options.scales.x.ticks.maxTicksLimit = maxTicks;
    const gridColor = isDarkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0';
    const tickColor = isDarkMode ? '#9CA3AF' : '#64748B';
    const titleColor = isDarkMode ? '#F3F4F6' : '#475569';
    mainChart.options.scales.x.ticks.color = tickColor;
    mainChart.options.scales.yPm25.ticks.color = tickColor;
    mainChart.options.scales.yPm25.grid.color = gridColor;
    mainChart.options.scales.yPm25.title.color = titleColor;
    mainChart.options.plugins.legend.labels.color = titleColor;
    mainChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(17,24,39,0.9)' : 'rgba(15,23,42,0.9)';
    mainChart.options.plugins.tooltip.titleColor = isDarkMode ? '#E5E7EB' : '#E2E8F0';
    mainChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#D1D5DB' : '#94A3B8';

    if (mainChart.resetZoom) mainChart.resetZoom('none');
    mainChart.update();
}

function setTimeRange(range) {
    currentTimeRange = range;
    document.querySelectorAll('.time-range-btn').forEach(btn => {
        const btnRange = btn.getAttribute('data-range');
        const isActive = btnRange === range;
        btn.classList.toggle('bg-orange-500', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('shadow-md', isActive);
        btn.classList.toggle('bg-gray-100', !isActive && !document.documentElement.classList.contains('dark'));
        btn.classList.toggle('text-gray-600', !isActive && !document.documentElement.classList.contains('dark'));
        btn.classList.toggle('hover:bg-gray-200', !isActive && !document.documentElement.classList.contains('dark'));
        btn.classList.toggle('dark:bg-gray-700', !isActive && document.documentElement.classList.contains('dark'));
        btn.classList.toggle('dark:text-gray-300', !isActive && document.documentElement.classList.contains('dark'));
        btn.classList.toggle('dark:hover:bg-gray-600', !isActive && document.documentElement.classList.contains('dark'));
    });
    if (mainChart && typeof mainChart.resetZoom === 'function') mainChart.resetZoom('none');
    refreshData();
}

function setupEventListeners() {
    document.querySelectorAll('.time-range-btn').forEach(button => {
        button.addEventListener('click', () => setTimeRange(button.getAttribute('data-range')));
    });
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    // Pagination and filter listeners (if elements exist)
    if (locationFilterElement) locationFilterElement.addEventListener('change', () => { currentPage = 1; updateDataTable(); });
    if (prevPageButton) prevPageButton.addEventListener('click', () => { if (currentPage > 1) { currentPage--; updateDataTable(); }});
    if (nextPageButton) nextPageButton.addEventListener('click', () => {
        let dataLen = (locationFilterElement && locationFilterElement.value !== 'all') ? 
                      (locationFilterElement.value === 'makhmor-road' ? makhmorRoadData.length : naznazAreaData.length) : 
                      allReadings.length;
        if (currentPage < Math.ceil(dataLen / itemsPerPage)) { currentPage++; updateDataTable(); }
    });
}

function updateDataTable() { /* ... (implementation from original app.js, ensure it uses translated headers if needed) ... */
    let dataToDisplay = [];
    const locationFilter = locationFilterElement ? locationFilterElement.value : 'all';

    if (locationFilter === 'makhmor-road') dataToDisplay = makhmorRoadData;
    else if (locationFilter === 'naznaz-area') dataToDisplay = naznazAreaData;
    else dataToDisplay = allReadings; // Already sorted by timestamp descending

    const totalItems = dataToDisplay.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedData = dataToDisplay.slice(startIndex, endIndex);

    if (pageInfoElement) {
        const t = window.t || (k => k);
        pageInfoElement.textContent = totalItems > 0 ? 
            `${t('showing')} ${startIndex + 1} ${t('to')} ${endIndex} ${t('of')} ${totalItems} ${t('results')}` : 
            `${t('showing')} 0 ${t('to')} 0 ${t('of')} 0 ${t('results')}`;
    }
    if (prevPageButton) { prevPageButton.disabled = currentPage === 1; prevPageButton.classList.toggle('opacity-50', currentPage === 1); }
    if (nextPageButton) { nextPageButton.disabled = currentPage >= totalPages; nextPageButton.classList.toggle('opacity-50', currentPage >= totalPages); }

    if (readingsTableBody) readingsTableBody.innerHTML = '';
    if (readingsCards) readingsCards.innerHTML = '';

    if (paginatedData.length === 0) {
        const emptyMsg = window.t ? window.t('noDataAvailable') : 'No data available for this filter.';
        if (readingsTableBody) readingsTableBody.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">${emptyMsg}</td></tr>`;
        if (readingsCards) readingsCards.innerHTML = `<div class="text-center text-gray-500 dark:text-gray-400 py-4">${emptyMsg}</div>`;
        return;
    }

    paginatedData.forEach(r => {
        const pm25 = r.pm25 !== null ? parseFloat(r.pm25) : null;
        const statusInfo = getAirQualityStatus(pm25);
        const locId = locationMapping[r.Location] || (r.Location === "Makhmor Road" ? 'makhmor-road' : (r.Location === "Naznaz Area" ? 'naznaz-area' : 'Unknown'));
        const displayName = locId === 'makhmor-road' ? (window.t?window.t('makhmor'):'Makhmor Road') : (locId === 'naznaz-area' ? (window.t?window.t('naznaz'):'Naznaz Area') : r.Location);

        if (readingsTableBody) { /* ... table row creation ... */ }
        if (readingsCards) {  /* ... card creation ... */ }
    });
}


function updateAveragesDisplay() {
    ['makhmor-road', 'naznaz-area'].forEach(locationId => {
        const detailPrefix = locationId === 'makhmor-road' ? 'location1' : 'naznaz';
        // For the main overview cards (top section)
        const avg7dElementId = locationId === 'makhmor-road' ? 'makhmor-last-week-avg-pm25' : 'naznaz-last-week-avg-pm25';
        const avg7dElement = document.getElementById(avg7dElementId);
        if (avg7dElement && averages[locationId] && averages[locationId]['7d']) {
            avg7dElement.textContent = averages[locationId]['7d'].pm25.toFixed(1);
        } else if (avg7dElement) {
            avg7dElement.textContent = '--';
        }

        // For the bottom summary cards
        Object.keys(timeRanges).forEach(rangeKey => { // '24h', '7d', '30d'
            const avgData = averages[locationId] ? averages[locationId][rangeKey] : { pm25: 0, humidity: 0 };
            const elementId = `${detailPrefix}-${rangeKey}-avg`; // e.g., location1-24h-avg
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `${avgData.pm25.toFixed(1)}`; // No unit here, as per original HTML structure
            } else {
                 console.warn(`Average display element not found: ${elementId}`);
            }
        });
    });
}


function getTimeAgo(date) { /* ... (implementation from original app.js) ... */
    if (!(date instanceof Date) || isNaN(date)) return window.t ? window.t('invalidDate') : 'Invalid date';
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const t = window.t || (k => k); // Fallback for translation

    if (seconds < 5) return t('justNow');
    if (seconds < 60) return `${seconds}${t('secondsAgo')}`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}${t('minutesAgo')}`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}${t('hoursAgo')}`;
    const days = Math.round(hours / 24);
    return `${days}${t('daysAgo')}`;
}


async function initDashboard() {
    applyInitialTheme();

    try {
        const supabaseInitialized = await initializeSupabase();
        if (!supabaseInitialized) {
            return;
        }

        setupEventListeners();
        
        const chartsInitialized = initCharts();
        if(!chartsInitialized) console.warn("Chart initialization failed, main chart might not display.");

        console.log('Attempting to load predictions from repository CSVs...');
        await Promise.all([
            loadPredictionsFromRepo('makhmor-road'),
            loadPredictionsFromRepo('naznaz-area')
        ]).catch(err => {
            // Continue initialization even if CSVs fail, fallback in calculate7Day... will be used
        });
        console.log('Initial prediction loading from CSVs (attempt) complete.');

        if (window.sensorStatus && typeof window.sensorStatus.init === 'function') {
            window.sensorStatus.init();
        } else {
            console.warn('Sensor status module not found or init function missing.');
        }
        
        await refreshData(); // Fetches sensor data and updates UI including predictions
        console.log('Initial data refresh complete.');

        setInterval(refreshData, 30000); // Refresh sensor data every 30s

        console.log('Dashboard initialized successfully.');

    } catch (error) {
        showError('FATAL: Dashboard could not initialize. ' + error.message);
    }
}

// Initialize the dashboard when the DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);