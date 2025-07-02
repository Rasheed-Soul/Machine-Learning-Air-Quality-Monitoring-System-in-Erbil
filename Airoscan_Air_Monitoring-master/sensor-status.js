// Modifications for sensor-status.js to support multiple languages

// Constants
const OFFLINE_THRESHOLD = 21610; // 21610 seconds = ~6 hours
const STATUS_CHECK_INTERVAL = 5000; // Check status every 5 seconds

// Store the last update time for each sensor
let sensorLastUpdate = {
    'Makhmor Road': null,
    'Naznaz Area': null
};

// Function to update sensor status display in the OVERVIEW cards
function updateSensorStatus(locationName) {
    const lastUpdate = sensorLastUpdate[locationName];

    // Determine the correct element ID prefix based on the display name
    let elementPrefix;
    if (locationName === 'Makhmor Road') {
        elementPrefix = 'makhmor';
    } else if (locationName === 'Naznaz Area') {
        elementPrefix = 'naznaz';
    } else {
        console.warn(`updateSensorStatus called with unknown location name: ${locationName}`);
        return;
    }

    // Find the corresponding sensor status element in the overview cards
    const statusElement = document.getElementById(`${elementPrefix}-sensor-status`);

    if (!statusElement) {
        return;
    }

    const now = new Date();
    const timeDiff = (lastUpdate instanceof Date && !isNaN(lastUpdate))
                     ? Math.floor((now - lastUpdate) / 1000)
                     : Infinity;

    const isOnline = timeDiff < OFFLINE_THRESHOLD;

    // Update status text with translation
    statusElement.textContent = isOnline ? (window.t ? window.t('online') : 'Online') : (window.t ? window.t('offline') : 'Offline');
    
    // Update styling
    if (isOnline) {
        statusElement.className = 'text-xl font-bold text-green-600';
    } else {
        statusElement.className = 'text-xl font-bold text-red-600';
    }
}

// Function called by app.js to update the last known timestamp for a location
function updateSensorLastUpdate(locationName, timestamp) {
    if (locationName === 'Naznaz Area' || locationName === 'Makhmor Road') {
        if (timestamp instanceof Date && !isNaN(timestamp)) {
            sensorLastUpdate[locationName] = timestamp;
        } else {
            sensorLastUpdate[locationName] = null;
            console.warn(`Received invalid timestamp for ${locationName}. Setting status to Offline.`);
        }
        updateSensorStatus(locationName);
    } else {
        console.warn(`Attempted to update last update for unknown location name: ${locationName}`);
    }
}

// Initialize status checking
function initSensorStatus() {
    // Initial status update based on potentially null timestamps
    updateSensorStatus('Makhmor Road');
    updateSensorStatus('Naznaz Area');

    // Set up periodic status checking (every 5 seconds)
    setInterval(() => {
        updateSensorStatus('Makhmor Road');
        updateSensorStatus('Naznaz Area');
    }, STATUS_CHECK_INTERVAL);
    console.log("Sensor status checker initialized.");
}

// Export functions for use in main app (app.js)
window.sensorStatus = {
    updateLastUpdate: updateSensorLastUpdate,
    init: initSensorStatus
};