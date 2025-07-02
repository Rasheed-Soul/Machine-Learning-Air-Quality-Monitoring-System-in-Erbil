// translations.js - Complete version with Historical Data translations
const translations = {
    en: {

        lastWeekAvg: "Last Week Avg",
        avgLast7d: "Average over the last 7 days",
        // Header
        appName: "Airoscan",
        university: "Tishk International University",

        // Main title
        airQualityMonitor: "Air Quality <span class='gradient-text'>Monitor</span>",
        airQuality: "Air Quality",
        monitor: "Monitor",
        subtitle: "Real-time PM2.5 concentration data from monitoring stations in Erbil, Kurdistan Region",

        // Health guide banner
        learnAboutAirQuality: "Learn About Air Quality",
        understandPM25: "Understand how PM2.5 affects your health and how to protect yourself",
        healthGuide: "Health Guide",

        // Navigation
        backToDashboard: "Back to Dashboard",

        // Section titles
        makhmor: "Makhmor Road",
        naznaz: "Naznaz Area",
        sensor: "Sensor",
        trends: "Trends",
        pm25Trends: "PM2.5 Concentration Trends",
        map: "Map",
        makhmorSensorTitle: "Makhmor Road <span class='gradient-text'>Sensor</span>",
        naznazSensorTitle: "Naznaz Area <span class='gradient-text'>Sensor</span>",

        // Card titles
        currentPM25: "Current PM2.5",
        average24hr: "24hr Average",
        lastUpdated: "Last Updated",
        sensorStatus: "Sensor Status",

        // Time ranges
        "24h": "24h",
        "7d": "7d",
        "30d": "30d",

        // Status
        loading: "Loading...",
        updating: "Updating...",
        online: "Online",
        offline: "Offline",
        unknown: "Unknown",
        noData: "No Data",

        // Air quality status
        good: "Good",
        moderate: "Moderate",
        unhealthySensitive: "Unhealthy for Sensitive Groups",
        unhealthy: "Unhealthy",
        veryUnhealthy: "Very Unhealthy",
        hazardous: "Hazardous",
        Safe: "Safe",
        Low: "Low",
        

        // Descriptions
        avgLast24: "Average over the last 24 hours",
        sensorConnection: "Sensor connection status",
        noHealthImpacts: "Air quality is satisfactory - No health impacts expected",

        // Table headers
        id: "ID",
        location: "Location",
        timestamp: "Timestamp",
        status: "Status",

        // Averages section
        averages: "Averages",

        // Prediction section
        forecast7Day: "7-DAY PM2.5 FORECAST WITH CONFIDENCE",
        confidence: "Confidence",
        highConfidence: "High confidence based on recent patterns.",
        moderateConfidence: "Moderate confidence; patterns may vary.",
        patternMatch: "Pattern match with some day last week.",
        similarRecent: "Similar to recent days, less historical data.",
        weeklyAverage: "Based on weekly average patterns.",
        limitedData: "Limited historical data available.",
        processingData: "Prediction data processing or insufficient data.",
        forecastUnavailable: "7-Day PM2.5 Forecast data is currently unavailable. Please check back later.",

        // Units
        microgramUnit: "μg/m³",
        microgramPM25: "μg/m³ PM2.5",
        percentHumidity: "% Humidity",

        // Time
        justNow: "Just now",
        secondsAgo: "s ago",
        minutesAgo: "m ago",
        hoursAgo: "h ago",
        daysAgo: "d ago",
        asOf: "As of",
        invalidDate: "Invalid date",

        // Footer
        copyright: "© 2025 Air Quality Monitoring System - Tishk International University",

        // Days of week
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",

        // Error messages
        errorLoadingData: "Failed to refresh data. Please check the console for details.",
        databaseConfigError: "Database configuration not found. Please reload the page.",
        databaseClientError: "Database client is not available. Check console for initialization errors.",
        databaseQueryFailed: "Database query failed",
        noReadingsFound: "No readings found in database",

        // Pagination
        showing: "Showing",
        of: "of",
        to: "to",
        results: "results",
        prev: "Previous",
        next: "Next",
        noDataAvailable: "No data available for this filter.",

        // Historical Data Navigation
        viewHistoricalData: "View Historical Data",
        analyzeHistoricalTrends: "Analyze air quality trends and patterns from any date since monitoring began",
        historicalData: "Historical Data",

        // Historical Data Page
        historicalDataTitle: "Air Quality History",
        historicalDataSubtitle: "See how the air quality was on any day. Simple and easy to understand.",
        chooseLocation: "Choose Location",
        selectWhichSensor: "Which air quality sensor do you want to see?",
        bothLocations: "Both Locations",
        chooseTime: "Choose Time Period",
        selectTimePeriod: "When do you want to see the air quality data?",
        today: "Today",
        yesterday: "Yesterday",
        lastWeek: "Last Week",
        lastMonth: "Last Month",
        orChooseCustom: "Or choose a specific date:",
        singleDate: "Single Date",
        dateRange: "Date Range",
        selectDate: "Select Date",
        startDate: "Start Date",
        endDate: "End Date",
        day: "Day",
        month: "Month",
        year: "Year",
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
        viewThisDate: "View This Date",
        viewDateRange: "View This Date Range",
        startDateAfterEnd: "Start date cannot be after end date.",
        viewData: "View Air Quality Data",
        loadingData: "Loading air quality data...",
        measurements: "Measurements",
        average: "Average PM2.5",
        totalReadings: "Total Readings",
        averagePM25: "Average PM2.5",
        maxPM25: "Maximum PM2.5",
        minPM25: "Minimum PM2.5",
        overallQuality: "Overall Quality",
        airQualityChart: "Air Quality Over Time",
        recentReadings: "Recent Readings",
        showMore: "Show More Data",
        startOver: "Start Over",
        noDataFound: "No Data Found",
        noDataMessage: "We don't have air quality data for this time period. Try selecting a different date.",
        humidity: "Humidity",
        allLocations: "All Locations",

        // NEW Historical Data List Titles
        selectedData: "Selected Data",
        todayReadings: "Today's Readings",
        yesterdayReadings: "Yesterday's Readings",
        readingsFor: "Readings for",
        readingsFrom: "Readings from",
        lastWeekReadings: "Last Week Readings",
        lastMonthReadings: "Last Month Readings",

        // PM2.5 Effects Page Titles and General Text
        understandingPM25PageTitle: "Understanding <span class='gradient-text'>PM2.5</span> Air Pollution",
        essentialInfo: "Essential information about fine particulate matter and its impact on health",
        whatIsPM25: "What is PM2.5?",
        whyItMatters: "Why It Matters",
        protection: "Protection",
        pm25Description: "Microscopic particles less than 2.5 micrometers in diameter that can penetrate deep into lungs",
        healthProblems: "Can cause serious health problems including heart disease, lung cancer, and respiratory issues",
        protectionMeasures: "Monitor air quality, wear N95 masks when needed, and use air purifiers indoors",
        pm25ScaleTitle: "PM2.5 Concentration <span class='gradient-text'>Scale</span>",
        whoStandards: "Based on WHO Air Quality standards",
        acceptable: "Acceptable - Unusually sensitive people should consider limiting prolonged outdoor exertion",
        sensitiveGroups: "People with heart/lung disease, children, and older adults should limit prolonged outdoor exertion",
        everyoneAffected: "Significant increase in asthma, and early death, wear masks when outside.",
        healthAlert: "Health alert: serious health effects for everyone.",
        healthEmergency: "Health emergency - Everyone should avoid all outdoor activity",
        healthEffectsTitle: "Health <span class='gradient-text'>Effects</span>",
        protectionTitlePage: "Protection <span class='gradient-text-blue'>Measures</span>",
        shortTermExposure: "Short-term Exposure",
        longTermExposure: "Long-term Exposure",
        outdoorProtection: "Outdoor Protection",
        indoorProtection: "Indoor Protection",
        commonSourcesTitle: "Common <span class='gradient-text'>Sources</span> in Kurdistan",
        vehicleEmissions: "Vehicle Emissions",
        industry: "Industry",
        construction: "Construction",
        burning: "Burning",
        stayInformedCTA: "Stay Informed, Stay Safe",
        monitorRealTimeCTA: "Monitor real-time air quality data from our sensors across Erbil",
        viewLiveData: "View Live Air Quality Data",
        referencesTitle: "References & <span class='gradient-text'>Sources</span>",

        // PM2.5 Effects Page Specific Content
        eyeNoseThroatIrritation: "Eye, nose, and throat irritation",
        coughingShortnessBreath: "Coughing and shortness of breath",
        worseningAsthma: "Worsening asthma symptoms",
        increasedRespiratoryInfections: "Increased respiratory infections",
        reducedLungFunction: "Reduced lung function",
        chronicBronchitis: "Development of chronic bronchitis",
        increasedHeartDisease: "Increased risk of heart disease",
        lungCancer: "Lung cancer",
        prematureDeath: "Premature death",
        checkAirQualityOutside: "Check air quality before going outside",
        wearN95Masks: "Wear N95/KN95/FFP2 masks on high pollution days",
        avoidBusyRoads: "Avoid busy roads and industrial areas",
        exerciseIndoorsPM35: "Exercise indoors when PM2.5 is above 35.4 μg/m³",
        keepWindowsClosedPolluted: "Keep windows closed on polluted days",
        useHEPAAirPurifiers: "Use HEPA air purifiers",
        avoidSmokingBurningCandles: "Avoid smoking and burning candles",
        maintainGoodVentilationClean: "Maintain good ventilation on clean days",
        cleanACFilters: "Clean or replace AC filters regularly",
        vehicleExamples: "Cars, trucks, buses",
        industryExamples: "Factories, power plants",
        constructionExamples: "Dust, equipment",
        burningExamples: "Waste, agriculture",
        epaSourceTitle: "U.S. Environmental Protection Agency (EPA)",
        epaSourceDesc: "PM2.5 Air Quality Index (AQI) Breakpoints and Health Guidelines",
        epaSourceLinkText: "EPA PM2.5 Basics →",
        whoSourceTitle: "World Health Organization (WHO)",
        whoSourceDesc: "Global Air Quality Guidelines 2021",
        whoSourceLinkText: "WHO Air Quality Guidelines →",
        alaSourceTitle: "American Lung Association",
        alaSourceDesc: "Health Effects of Particle Pollution",
        alaSourceLinkText: "Particle Pollution Health Effects →",
        cdcSourceTitle: "Centers for Disease Control and Prevention (CDC)",
        cdcSourceDesc: "Air Quality and Health Information",
        cdcSourceLinkText: "CDC Particulate Matter →",
        referencesNote: "<strong>Note:</strong> The PM2.5 concentration ranges shown are based on the WHO Air Quality standards. Different countries may use slightly different breakpoints. The WHO recommends even stricter guidelines with an annual mean of 5 μg/m³ and a 24-hour mean of 15 μg/m³ for optimal health protection."
    },
    ku: {

        lastWeekAvg: "تێکڕای هەفتەی ڕابردوو", // Or a shorter version like "تێکڕای ٧ڕۆژ"
        avgLast7d: "تێکڕا لە ماوەی ٧ ڕۆژی ڕابردوو",
        
        // Kurdish (Sorani) translations
        appName: "ئایرۆسکان",
        university: "زانکۆی نێودەوڵەتی تیشک",

        airQualityMonitor: "<span class='gradient-text'>چاودێری</span> کوالیتی هەوا",
        airQuality: "کوالیتی هەوا",
        monitor: "چاودێری",
        subtitle: "داتای PM2.5 لە کاتی ڕاستەقینەدا لە وێستگەکانی چاودێری لە هەولێر، هەرێمی کوردستان",

        learnAboutAirQuality: "فێربوون دەربارەی کوالیتی هەوا",
        understandPM25: "تێبگە چۆن PM2.5 کاریگەری لەسەر تەندروستیت دەکات و چۆن خۆت بپارێزیت",
        healthGuide: "ڕێنمایی تەندروستی",

        backToDashboard: "بگەڕێوە بۆ داشبۆرد",

        makhmor: "ڕێگای مەخموور",
        naznaz: "ناوچەی نازناز",
        sensor: "هەستەوەر",
        trends: "ڕەوتەکان",
        pm25Trends: "ڕەوتی چڕی PM2.5",
        map: "نەخشە",
        makhmorSensorTitle: "<span class='gradient-text'>هەستەوەری</span> ڕێگای مەخموور",
        naznazSensorTitle: "<span class='gradient-text'>هەستەوەری</span> ناوچەی نازناز",

        currentPM25: "PM2.5ی ئێستا",
        average24hr: "تێکڕای ٢٤ کاتژمێر",
        lastUpdated: "دوایین نوێکردنەوە",
        sensorStatus: "دۆخی هەستەوەر",

        "24h": "٢٤ک",
        "7d": "٧ڕ",
        "30d": "٣٠ڕ",

        loading: "چاوەڕوان بە...",
        updating: "نوێکردنەوە...",
        online: "سەرهێڵ",
        offline: "دەرهێڵ",
        unknown: "نەزانراو",
        noData: "داتا نییە",

        good: "باش",
        moderate: "مامناوەند",
        unhealthySensitive: "نەخۆش بۆ گروپە هەستیارەکان",
        unhealthy: "نەخۆش",
        veryUnhealthy: "زۆر نەخۆش",
        hazardous: "مەترسیدار",
        Safe: "باش",
        Low: "کەم",

        avgLast24: "تێکڕا لە ماوەی ٢٤ کاتژمێری ڕابردوو",
        sensorConnection: "دۆخی پەیوەندی هەستەوەر",
        noHealthImpacts: "کوالیتی هەوا گونجاوە - هیچ کاریگەرییەکی تەندروستی چاوەڕوان ناکرێت",

        id: "ناسنامە",
        location: "شوێن",
        timestamp: "کات",
        status: "دۆخ",

        averages: "تێکڕاکان",

        forecast7Day: "پێشبینی PM2.5 بۆ ٧ ڕۆژ لەگەڵ متمانە",
        confidence: "متمانە",
        highConfidence: "متمانەی بەرز بەپێی نموونەکانی نزیک.",
        moderateConfidence: "متمانەی مامناوەند؛ نموونەکان دەکرێت جیاواز بن.",
        patternMatch: "لەگەڵ ڕۆژێکی هەفتەی ڕابردوو دەگونجێت.",
        similarRecent: "هاوشێوەی ڕۆژانی نزیک، داتای مێژوویی کەمتر.",
        weeklyAverage: "بەپێی تێکڕای نموونەکانی هەفتانە.",
        limitedData: "داتای مێژوویی سنووردار بەردەستە.",
        processingData: "پرۆسێسکردنی داتای پێشبینی یان داتای ناتەواو.",
        forecastUnavailable: "داتای پێشبینی PM2.5 بۆ ٧ ڕۆژ لە ئێستادا بەردەست نییە. تکایە دواتر سەردان بکەرەوە.",

        microgramUnit: "مایکرۆگرام/م³",
        microgramPM25: "مایکرۆگرام/م³ PM2.5",
        percentHumidity: "% شێ",

        justNow: "هەر ئێستا",
        secondsAgo: "چ پێش",
        minutesAgo: "خ پێش",
        hoursAgo: "ک پێش",
        daysAgo: "ڕ پێش",
        asOf: "لە",
        invalidDate: "بەروار نادروستە",

        copyright: "© ٢٠٢٥ سیستەمی چاودێری کوالیتی هەوا - زانکۆی نێودەوڵەتی تیشک",

        sun: "یەکشەممە",
        mon: "دووشەممە",
        tue: "سێشەممە",
        wed: "چوارشەممە",
        thu: "پێنجشەممە",
        fri: "هەینی",
        sat: "شەممە",

        errorLoadingData: "نەتوانرا داتا نوێ بکرێتەوە. تکایە کۆنسۆڵ بپشکنە بۆ وردەکاری.",
        databaseConfigError: "ڕێکخستنی داتابەیس نەدۆزرایەوە. تکایە پەڕەکە نوێ بکەرەوە.",
        databaseClientError: "کلاینتی داتابەیس بەردەست نییە. کۆنسۆڵ بپشکنە بۆ هەڵەکانی دەستپێکردن.",
        databaseQueryFailed: "پرسیاری داتابەیس سەرکەوتوو نەبوو",
        noReadingsFound: "هیچ خوێندنەوەیەک لە داتابەیس نەدۆزرایەوە",

        showing: "پیشاندانی",
        of: "لە",
        to: "بۆ",
        results: "ئەنجام",
        prev: "پێشوو",
        next: "دواتر",
        noDataAvailable: "هیچ داتایەک بەردەست نییە بۆ ئەم فلتەرە.",

        // Historical Data Navigation
        viewHistoricalData: "بینینی داتای مێژوویی",
        analyzeHistoricalTrends: "شیکردنەوەی ڕەوت و نموونەکانی کوالیتی هەوا لە هەر بەرواریکەوە لە دەستپێکی چاودێری",
        historicalData: "داتای مێژوویی",

        // Historical Data Page
        historicalDataTitle: "مێژووی کوالیتی هەوا",
        historicalDataSubtitle: "ببینە کوالیتی هەوا چۆن بووە لە هەر ڕۆژێک. ئاسان و تێگەیشتوو.",
        chooseLocation: "شوێن هەڵبژێرە",
        selectWhichSensor: "کام هەستەوەری کوالیتی هەوا دەتەوێت ببینیت؟",
        bothLocations: "هەردوو شوێنەکە",
        chooseTime: "کات هەڵبژێرە",
        selectTimePeriod: "کەی دەتەوێت داتای کوالیتی هەوا ببینیت؟",
        today: "ئەمڕۆ",
        yesterday: "دوێنێ",
        lastWeek: "هەفتەی ڕابردوو",
        lastMonth: "مانگی ڕابردوو",
        orChooseCustom: "یان بەرواری تایبەت هەڵبژێرە:",
        singleDate: "بەرواری تاک",
        dateRange: "ماوەی بەروار",
        selectDate: "بەروار هەڵبژێرە",
        startDate: "بەرواری دەستپێک",
        endDate: "بەرواری کۆتایی",
        day: "ڕۆژ",
        month: "مانگ",
        year: "ساڵ",
        january: "کانوونی دووەم",
        february: "شوبات",
        march: "ئازار",
        april: "نیسان",
        may: "ئایار",
        june: "حوزەیران",
        july: "تەمووز",
        august: "ئاب",
        september: "ئەیلوول",
        october: "تشرینی یەکەم",
        november: "تشرینی دووەم",
        december: "کانوونی یەکەم",
        viewThisDate: "ئەم بەرواژە ببینە",
        viewDateRange: "ئەم ماوە بەرواژانە ببینە",
        startDateAfterEnd: "بەرواری دەستپێک ناتوانێت دوای بەرواری کۆتایی بێت.",
        viewData: "داتای کوالیتی هەوا ببینە",
        loadingData: "داتای کوالیتی هەوا بارناکرێت...",
        measurements: "پێوانەکان",
        average: "تێکڕای PM2.5",
        totalReadings: "کۆی خوێندنەوەکان",
        averagePM25: "تێکڕای PM2.5",
        maxPM25: "زۆرترین PM2.5",
        minPM25: "کەمترین PM2.5",
        overallQuality: "کوالیتی گشتی",
        airQualityChart: "کوالیتی هەوا بە درێژایی کات",
        recentReadings: "خوێندنەوە نزیکەکان",
        showMore: "زیاتر نیشان بدە",
        startOver: "لە سەرەوە دەست پێبکەرەوە",
        noDataFound: "هیچ داتایەک نەدۆزرایەوە",
        noDataMessage: "هیچ داتای کوالیتی هەوامان نییە بۆ ئەم کاتە. بەرواری جیاواز هەڵبژێرە.",
        humidity: "شێ",
        allLocations: "هەموو شوێنەکان",

        // NEW Historical Data List Titles
        selectedData: "داتای هەڵبژێردراو",
        todayReadings: "خوێندنەوەکانی ئەمڕۆ",
        yesterdayReadings: "خوێندنەوەکانی دوێنێ",
        readingsFor: "خوێندنەوەکان بۆ",
        readingsFrom: "خوێندنەوەکان لە",
        lastWeekReadings: "خوێندنەوەکانی هەفتەی ڕابردوو",
        lastMonthReadings: "خوێندنەوەکانی مانگی ڕابردوو",

        // PM2.5 Effects Page Titles and General Text
        understandingPM25PageTitle: "تێگەیشتن لە پیسبوونی هەوای <span class='gradient-text'>PM2.5</span>",
        essentialInfo: "زانیاری پێویست دەربارەی تەنۆلکە وردەکان و کاریگەرییان لەسەر تەندروستی",
        whatIsPM25: "PM2.5 چییە؟",
        whyItMatters: "بۆچی گرنگە",
        protection: "پاراستن",
        pm25Description: "تەنۆلکەی مایکرۆسکۆپی کەمتر لە ٢.٥ مایکرۆمەتر تیرە کە دەتوانێت بچێتە ناو سییەکان",
        healthProblems: "دەتوانێت کێشەی تەندروستی جدی دروست بکات وەک نەخۆشی دڵ، شێرپەنجەی سی، و کێشەی هەناسەدان",
        protectionMeasures: "چاودێری کوالیتی هەوا بکە، دەمامکی N95 لەبەر بکە کاتێک پێویستە، و پاککەرەوەی هەوا بەکاربهێنە لە ژوورەوە",
        pm25ScaleTitle: "پێوەری چڕی <span class='gradient-text'>PM2.5</span>",
        whoStandards: "بەپێی ستانداردەکانی ڕێکخراوی تەندروستی جیهانی (WHO)",
        acceptable: "پەسەندکراو - کەسانی زۆر هەستیار دەبێت بیر لە سنووردارکردنی ماندووبوونی درێژخایەن لە دەرەوە بکەنەوە",
        sensitiveGroups: "کەسانی تووشی نەخۆشی دڵ/سی، منداڵان، و بەساڵاچووان دەبێت ماندووبوونی درێژخایەن لە دەرەوە سنووردار بکەن",
        everyoneAffected: "زیادبوونی بەرچاوی هەناسەتەنگی، و مردنی پێشوەختە، لەکاتی چوونە دەرەوە ماسک ببەستن",
        healthAlert: "ئاگاداری تەندروستی: کاریگەری تەندروستی جددی بۆ هەمووان",
        healthEmergency: "فریاکەوتنی تەندروستی - هەموو کەسێک دەبێت لە هەموو چالاکییەکی دەرەوە دوور بکەوێتەوە",
        healthEffectsTitle: "<span class='gradient-text'>کاریگەرییە</span> تەندروستییەکان",
        protectionTitlePage: "<span class='gradient-text-blue'>ڕێکارەکانی</span> پاراستن",
        shortTermExposure: "بەرکەوتنی کورت مەودا",
        longTermExposure: "بەرکەوتنی درێژ مەودا",
        outdoorProtection: "پاراستن لە دەرەوە",
        indoorProtection: "پاراستن لە ژوورەوە",
        commonSourcesTitle: "<span class='gradient-text'>سەرچاوە</span> باوەکان لە کوردستان",
        vehicleEmissions: "دەردانی ئۆتۆمبێل",
        industry: "پیشەسازی",
        construction: "بیناسازی",
        burning: "سووتاندن",
        stayInformedCTA: "ئاگادار بە، سەلامەت بە",
        monitorRealTimeCTA: "چاودێری داتای کوالیتی هەوا بکە لە کاتی ڕاستەقینەدا لە هەستەوەرەکانمان لە سەرانسەری هەولێر",
        viewLiveData: "بینینی داتای ڕاستەوخۆی کوالیتی هەوا",
        referencesTitle: "<span class='gradient-text'>سەرچاوەکان</span>",

        // PM2.5 Effects Page Specific Content
        eyeNoseThroatIrritation: "خورانی چاو، لووت و گەروو",
        coughingShortnessBreath: "کۆکە و هەناسەبڕکێ",
        worseningAsthma: "خراپتربوونی نیشانەکانی هەناسەتەنگی (ڕەبۆ)",
        increasedRespiratoryInfections: "زیادبوونی هەوکردنی کۆئەندامی هەناسە",
        reducedLungFunction: "کەمبوونەوەی فرمانی سییەکان",
        chronicBronchitis: "دروستبوونی هەوکردنی بۆرییەکانی هەوای درێژخایەن",
        increasedHeartDisease: "زیادبوونی مەترسی نەخۆشی دڵ",
        lungCancer: "شێرپەنجەی سی",
        prematureDeath: "مردنی پێشوەختە",
        checkAirQualityOutside: "پێش چوونە دەرەوە کوالیتی هەوا بپشکنە",
        wearN95Masks: "لە ڕۆژانی پیسبوونی زۆردا دەمامکی N95/KN95/FFP2 ببەستە",
        avoidBusyRoads: "دوور بکەوە لە ڕێگا قەرەباڵغەکان و ناوچە پیشەسازییەکان",
        exerciseIndoorsPM35: "کاتێک PM2.5 لە سەرووی ٣٥.٤ مایکڕۆگرام/م³ بوو، لە ژوورەوە وەرزش بکە",
        keepWindowsClosedPolluted: "لە ڕۆژانی پیسبووندا پەنجەرەکان دابخە",
        useHEPAAirPurifiers: "پاککەرەوەی هەوای HEPA بەکاربهێنە",
        avoidSmokingBurningCandles: "دوور بکەوە لە جگەرەکێشان و داگیرساندنی مۆم",
        maintainGoodVentilationClean: "لە ڕۆژانی پاکدا هەواگۆڕکێی باش بهێڵەرەوە",
        cleanACFilters: "فلتەری سپلیت و ئامێرە فێنککەرەوەکان بەردەوام پاک بکەرەوە یان بیانگۆڕە",
        vehicleExamples: "ئۆتۆمبێل، بارهەڵگر، پاس",
        industryExamples: "کارگە، وێستگەی کارەبا",
        constructionExamples: "تۆز و خۆڵ، ئامێرەکان",
        burningExamples: "زبڵ، پاشماوەی کشتوکاڵی",
        epaSourceTitle: "ئاژانسی پاراستنی ژینگەی ئەمریکا (EPA)",
        epaSourceDesc: "خاڵبەندییەکانی پێوەری کوالیتی هەوا (AQI) بۆ PM2.5 و ڕێنماییە تەندروستییەکان",
        epaSourceLinkText: "زانیاری دەربارەی PM2.5 لە EPA →",
        whoSourceTitle: "ڕێکخراوی تەندروستی جیهانی (WHO)",
        whoSourceDesc: "ڕێنماییە جیهانییەکانی کوالیتی هەوا ٢٠٢١",
        whoSourceLinkText: "ڕێنماییەکانی کوالیتی هەوا لە WHO →",
        alaSourceTitle: "کۆمەڵەی سییەکانی ئەمریکی",
        alaSourceDesc: "کاریگەرییە تەندروستییەکانی پیسبوونی تەنۆلکەیی",
        alaSourceLinkText: "کاریگەرییە تەندروستییەکانی تەنۆلکەکان →",
        cdcSourceTitle: "ناوەندەکانی کۆنترۆڵکردن و پێشگیریکردن لە نەخۆشی (CDC)",
        cdcSourceDesc: "زانیاری دەربارەی کوالیتی هەوا و تەندروستی",
        cdcSourceLinkText: "زانیاری CDC دەربارەی تەنۆلکە وردەکان →",
        referencesNote: "<strong>تێبینی:</strong> ئاستەکانی چڕی PM2.5 کە پیشان دراون لەسەر بنەمای ستانداردەکانی ڕێکخراوی تەندروستی جیهانی (WHO) دانراون. وڵاتانی جیاواز لەوانەیە خاڵبەندی کەمێک جیاواز بەکاربهێنن. ڕێکخراوی تەندروستی جیهانی ڕێنمایی توندتر پێشنیار دەکات کە تێکڕای ساڵانە ٥ مایکڕۆگرام/م³ و تێکڕای ٢٤ کاتژمێری ١٥ مایکڕۆگرام/م³ بێت بۆ پاراستنی تەندروستی."
    },
    ar: {

        lastWeekAvg: "متوسط آخر أسبوع", // Or "متوسط ٧ أيام"
        avgLast7d: "المتوسط خلال آخر 7 أيام",
        
        // Arabic translations
        appName: "إيروسكان",
        university: "جامعة تيشك الدولية",

        airQualityMonitor: "<span class='gradient-text'>مراقب</span> جودة الهواء",
        airQuality: "جودة الهواء",
        monitor: "مراقب",
        subtitle: "بيانات تركيز PM2.5 في الوقت الفعلي من محطات المراقبة في أربيل، إقليم كردستان",

        learnAboutAirQuality: "تعرف على جودة الهواء",
        understandPM25: "افهم كيف يؤثر PM2.5 على صحتك وكيفية حماية نفسك",
        healthGuide: "دليل الصحة",

        backToDashboard: "العودة إلى لوحة القيادة",

        makhmor: "طريق مخمور",
        naznaz: "منطقة نازناز",
        sensor: "مستشعر",
        trends: "الاتجاهات",
        pm25Trends: "اتجاهات تركيز PM2.5",
        map: "خريطة",
        makhmorSensorTitle: "<span class='gradient-text'>مستشعر</span> طريق مخمور",
        naznazSensorTitle: "<span class='gradient-text'>مستشعر</span> منطقة نازناز",

        currentPM25: "PM2.5 الحالي",
        average24hr: "متوسط 24 ساعة",
        lastUpdated: "آخر تحديث",
        sensorStatus: "حالة المستشعر",

        "24h": "24س",
        "7d": "7ي",
        "30d": "30ي",

        loading: "جار التحميل...",
        updating: "جار التحديث...",
        online: "متصل",
        offline: "غير متصل",
        unknown: "غير معروف",
        noData: "لا توجد بيانات",

        good: "جيد",
        moderate: "معتدل",
        unhealthySensitive: "غير صحي للمجموعات الحساسة",
        unhealthy: "غير صحي",
        veryUnhealthy: "غير صحي جداً",
        hazardous: "خطر",
        Safe: "آمن",
        Low: "منخفض",


        avgLast24: "المتوسط خلال آخر 24 ساعة",
        sensorConnection: "حالة اتصال المستشعر",
        noHealthImpacts: "جودة الهواء مرضية - لا توجد آثار صحية متوقعة",

        id: "المعرف",
        location: "الموقع",
        timestamp: "الوقت",
        status: "الحالة",

        averages: "المتوسطات",

        forecast7Day: "توقعات PM2.5 لمدة 7 أيام مع الثقة",
        confidence: "الثقة",
        highConfidence: "ثقة عالية بناءً على الأنماط الحديثة.",
        moderateConfidence: "ثقة متوسطة؛ قد تختلف الأنماط.",
        patternMatch: "تطابق النمط مع يوم ما الأسبوع الماضي.",
        similarRecent: "مشابه للأيام الأخيرة، بيانات تاريخية أقل.",
        weeklyAverage: "بناءً على متوسط الأنماط الأسبوعية.",
        limitedData: "البيانات التاريخية المحدودة متاحة.",
        processingData: "معالجة بيانات التنبؤ أو بيانات غير كافية.",
        forecastUnavailable: "بيانات توقعات PM2.5 لمدة 7 أيام غير متاحة حالياً. يرجى المحاولة لاحقاً.",

        microgramUnit: "ميكروغرام/م³",
        microgramPM25: "ميكروغرام/م³ PM2.5",
        percentHumidity: "% رطوبة",

        justNow: "الآن",
        secondsAgo: "ث مضت",
        minutesAgo: "د مضت",
        hoursAgo: "س مضت",
        daysAgo: "ي مضت",
        asOf: "اعتباراً من",
        invalidDate: "تاريخ غير صالح",

        copyright: "© 2025 نظام مراقبة جودة الهواء - جامعة تيشك الدولية",

        sun: "الأحد",
        mon: "الإثنين",
        tue: "الثلاثاء",
        wed: "الأربعاء",
        thu: "الخميس",
        fri: "الجمعة",
        sat: "السبت",

        errorLoadingData: "فشل تحديث البيانات. يرجى التحقق من وحدة التحكم للحصول على التفاصيل.",
        databaseConfigError: "لم يتم العثور على تكوين قاعدة البيانات. يرجى إعادة تحميل الصفحة.",
        databaseClientError: "عميل قاعدة البيانات غير متاح. تحقق من وحدة التحكم لأخطاء التهيئة.",
        databaseQueryFailed: "فشل استعلام قاعدة البيانات",
        noReadingsFound: "لم يتم العثور على قراءات في قاعدة البيانات",

        showing: "عرض",
        of: "من",
        to: "إلى",
        results: "نتائج",
        prev: "السابق",
        next: "التالي",
        noDataAvailable: "لا توجد بيانات متاحة لهذا الفلتر.",

        // Historical Data Navigation
        viewHistoricalData: "عرض البيانات التاريخية",
        analyzeHistoricalTrends: "تحليل اتجاهات وأنماط جودة الهواء من أي تاريخ منذ بداية المراقبة",
        historicalData: "البيانات التاريخية",

        // Historical Data Page
        historicalDataTitle: "تاريخ جودة الهواء",
        historicalDataSubtitle: "اطلع على جودة الهواء في أي يوم. بسيط وسهل الفهم.",
        chooseLocation: "اختر الموقع",
        selectWhichSensor: "أي مستشعر جودة هواء تريد أن ترى؟",
        bothLocations: "كلا الموقعين",
        chooseTime: "اختر الفترة الزمنية",
        selectTimePeriod: "متى تريد أن ترى بيانات جودة الهواء؟",
        today: "اليوم",
        yesterday: "أمس",
        lastWeek: "الأسبوع الماضي",
        lastMonth: "الشهر الماضي",
        orChooseCustom: "أو اختر تاريخاً محدداً:",
        singleDate: "تاريخ واحد",
        dateRange: "فترة تاريخية",
        selectDate: "اختر التاريخ",
        startDate: "تاريخ البداية",
        endDate: "تاريخ النهاية",
        day: "اليوم",
        month: "الشهر",
        year: "السنة",
        january: "يناير",
        february: "فبراير",
        march: "مارس",
        april: "أبريل",
        may: "مايو",
        june: "يونيو",
        july: "يوليو",
        august: "أغسطس",
        september: "سبتمبر",
        october: "أكتوبر",
        november: "نوفمبر",
        december: "ديسمبر",
        viewThisDate: "عرض هذا التاريخ",
        viewDateRange: "عرض هذه الفترة التاريخية",
        startDateAfterEnd: "تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية.",
        viewData: "عرض بيانات جودة الهواء",
        loadingData: "جار تحميل بيانات جودة الهواء...",
        measurements: "القياسات",
        average: "متوسط PM2.5",
        totalReadings: "إجمالي القراءات",
        averagePM25: "متوسط PM2.5",
        maxPM25: "أقصى PM2.5",
        minPM25: "أدنى PM2.5",
        overallQuality: "الجودة الإجمالية",
        airQualityChart: "جودة الهواء عبر الزمن",
        recentReadings: "القراءات الأخيرة",
        showMore: "عرض المزيد من البيانات",
        startOver: "ابدأ من جديد",
        noDataFound: "لم يتم العثور على بيانات",
        noDataMessage: "ليس لدينا بيانات جودة هواء لهذه الفترة الزمنية. جرب اختيار تاريخ مختلف.",
        humidity: "الرطوبة",
        allLocations: "جميع المواقع",

        // NEW Historical Data List Titles
        selectedData: "البيانات المحددة",
        todayReadings: "قراءات اليوم",
        yesterdayReadings: "قراءات أمس",
        readingsFor: "قراءات لـ",
        readingsFrom: "قراءات من",
        lastWeekReadings: "قراءات الأسبوع الماضي",
        lastMonthReadings: "قراءات الشهر الماضي",

        // PM2.5 Effects Page Titles and General Text
        understandingPM25PageTitle: "فهم تلوث الهواء <span class='gradient-text'>PM2.5</span>",
        essentialInfo: "معلومات أساسية حول الجسيمات الدقيقة وتأثيرها على الصحة",
        whatIsPM25: "ما هو PM2.5؟",
        whyItMatters: "لماذا هو مهم",
        protection: "الحماية",
        pm25Description: "جسيمات مجهرية أقل من 2.5 ميكرومتر في القطر يمكن أن تخترق عميقاً في الرئتين",
        healthProblems: "يمكن أن يسبب مشاكل صحية خطيرة بما في ذلك أمراض القلب وسرطان الرئة ومشاكل الجهاز التنفسي",
        protectionMeasures: "راقب جودة الهواء، ارتدِ أقنعة N95 عند الحاجة، واستخدم أجهزة تنقية الهواء في الداخل",
        pm25ScaleTitle: "مقياس تركيز <span class='gradient-text'>PM2.5</span>",
        whoStandards: "بناءً على معايير جودة الهواء لمنظمة الصحة العالمية (WHO)",
        acceptable: "مقبول - يجب على الأشخاص الحساسين بشكل غير عادي التفكير في الحد من الجهد المطول في الهواء الطلق",
        sensitiveGroups: "يجب على الأشخاص المصابين بأمراض القلب/الرئة والأطفال وكبار السن الحد من الجهد المطول في الهواء الطلق",
        everyoneAffected: "زيادة كبيرة في حالات الربو، والوفاة المبكرة، يجب ارتداء الأقنعة عند الخروج",
        healthAlert: "تنبيه صحي: آثار صحية خطيرة على الجميع",
        healthEmergency: "طوارئ صحية - يجب على الجميع تجنب كل الأنشطة في الهواء الطلق",
        healthEffectsTitle: "<span class='gradient-text'>الآثار</span> الصحية",
        protectionTitlePage: "<span class='gradient-text-blue'>تدابير</span> الحماية",
        shortTermExposure: "التعرض قصير المدى",
        longTermExposure: "التعرض طويل المدى",
        outdoorProtection: "الحماية في الهواء الطلق",
        indoorProtection: "الحماية في الداخل",
        commonSourcesTitle: "<span class='gradient-text'>المصادر</span> الشائعة في كردستان",
        vehicleEmissions: "انبعاثات المركبات",
        industry: "الصناعة",
        construction: "البناء",
        burning: "الحرق",
        stayInformedCTA: "ابق على اطلاع، ابق آمناً",
        monitorRealTimeCTA: "راقب بيانات جودة الهواء في الوقت الفعلي من أجهزة الاستشعار لدينا في جميع أنحاء أربيل",
        viewLiveData: "عرض بيانات جودة الهواء المباشرة",
        referencesTitle: "<span class='gradient-text'>المراجع</span> والمصادر",

        // PM2.5 Effects Page Specific Content
        eyeNoseThroatIrritation: "تهيج العين والأنف والحنجرة",
        coughingShortnessBreath: "السعال وضيق التنفس",
        worseningAsthma: "تفاقم أعراض الربو",
        increasedRespiratoryInfections: "زيادة حالات عدوى الجهاز التنفسي",
        reducedLungFunction: "انخفاض وظائف الرئة",
        chronicBronchitis: "تطور التهاب الشعب الهوائية المزمن",
        increasedHeartDisease: "زيادة خطر الإصابة بأمراض القلب",
        lungCancer: "سرطان الرئة",
        prematureDeath: "الوفاة المبكرة",
        checkAirQualityOutside: "تحقق من جودة الهواء قبل الخروج",
        wearN95Masks: "ارتدِ أقنعة N95/KN95/FFP2 في أيام التلوث المرتفع",
        avoidBusyRoads: "تجنب الطرق المزدحمة والمناطق الصناعية",
        exerciseIndoorsPM35: "مارس الرياضة في الداخل عندما يكون PM2.5 أعلى من 35.4 ميكروغرام/م³",
        keepWindowsClosedPolluted: "أبقِ النوافذ مغلقة في الأيام الملوثة",
        useHEPAAirPurifiers: "استخدم أجهزة تنقية الهواء HEPA",
        avoidSmokingBurningCandles: "تجنب التدخين وحرق الشموع",
        maintainGoodVentilationClean: "حافظ على تهوية جيدة في الأيام النظيفة",
        cleanACFilters: "نظف أو استبدل فلاتر مكيف الهواء بانتظام",
        vehicleExamples: "السيارات، الشاحنات، الحافلات",
        industryExamples: "المصانع، محطات الطاقة",
        constructionExamples: "الغبار، المعدات",
        burningExamples: "النفايات، المخلفات الزراعية",
        epaSourceTitle: "وكالة حماية البيئة الأمريكية (EPA)",
        epaSourceDesc: "نقاط مؤشر جودة الهواء (AQI) لـ PM2.5 والإرشادات الصحية",
        epaSourceLinkText: "أساسيات PM2.5 من EPA ←",
        whoSourceTitle: "منظمة الصحة العالمية (WHO)",
        whoSourceDesc: "المبادئ التوجيهية العالمية لجودة الهواء 2021",
        whoSourceLinkText: "إرشادات جودة الهواء من WHO ←",
        alaSourceTitle: "جمعية الرئة الأمريكية",
        alaSourceDesc: "الآثار الصحية لتلوث الجسيمات",
        alaSourceLinkText: "الآثار الصحية لتلوث الجسيمات ←",
        cdcSourceTitle: "مراكز السيطرة على الأمراض والوقاية منها (CDC)",
        cdcSourceDesc: "معلومات عن جودة الهواء والصحة",
        cdcSourceLinkText: "الجسيمات الدقيقة من CDC ←",
        referencesNote: "<strong>ملاحظة:</strong> نطاقات تركيز PM2.5 المعروضة تستند إلى معايير جودة الهواء لمنظمة الصحة العالمية (WHO). قد تستخدم البلدان المختلفة نقاط توقف مختلفة قليلاً. توصي منظمة الصحة العالمية بمبادئ توجيهية أكثر صرامة بمتوسط سنوي قدره 5 ميكروغرام/م³ ومتوسط 24 ساعة قدره 15 ميكروغرام/م³ لتوفير الحماية الصحية المثلى."
    }
};

// Language management functions
let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr';

    updateTranslations();
    updateLanguageButtons();

    if (window.refreshData) {
        window.refreshData(); // This function should exist in your app.js or similar for the main page
    }
}

function t(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key] !== undefined) {
        return translations[currentLanguage][key];
    } else if (translations['en'] && translations['en'][key] !== undefined) {
        return translations['en'][key];
    }
    return key;
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    // Update document title
    const pageTitleKey = 'understandingPM25PageTitle';
    const appNameText = t('appName');

    let plainPageTitle = "";
    if (translations[currentLanguage] && translations[currentLanguage][pageTitleKey]) {
        plainPageTitle = translations[currentLanguage][pageTitleKey].replace(/<[^>]*>?/gm, '');
    } else if (translations['en'] && translations['en'][pageTitleKey]) {
        plainPageTitle = translations['en'][pageTitleKey].replace(/<[^>]*>?/gm, '');
    } else {
        plainPageTitle = pageTitleKey;
    }

    if (document.getElementById('dark-mode-toggle')) {
        if (plainPageTitle && appNameText) {
            document.title = plainPageTitle + " - " + appNameText;
        } else if (appNameText) {
             document.title = appNameText;
        }
    } else {
         if (plainPageTitle) {
            document.title = plainPageTitle;
         }
    }
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('language') || 'en';
    setLanguage(preferredLanguage);
});

window.translations = translations;
window.t = t;
window.setLanguage = setLanguage;
window.getCurrentLanguage = function() { return currentLanguage; };
window.updateTranslations = updateTranslations;