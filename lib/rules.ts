export const rules = [
    {
        "name": "Embed Maps API",
        "description": "Embed Basic API enables you to embed Google Maps in your website or application with basic functionality, such as displaying a map with default controls and zooming capabilities.",
        "path": "/api/EmbedBasicAPI",
        "selected": true,
        "price": "Basic: Free | Advaned: Free",
        "reference": "https://developers.google.com/maps/documentation/embed/get-started",
        "category": "Maps"
    },
    
    
    {
        "name": "Nearest Roads API",
        "description": "Nearest Roads API allows you to snap or interpolate a given set of coordinates to the most likely road segment, providing you with the closest road information based on the input coordinates.",
        "path": "/api/NearestRoadsAPI",
        "selected": true,
        "price": "10$/1K req",
        "reference": "https://developers.google.com/maps/documentation/roads/nearest",
        "category": "Maps"
    },

    {
        "name": "Snap To Roads API",
        "description": "Snap To Roads API allows you to snap or interpolate a sequence of coordinates to the most likely road geometry, enabling you to obtain a smooth path that follows the road network closely.",
        "path": "/api/SnapToRoadsAPI",
        "selected": true,
        "price": "10$/1K req",
        "reference": "https://developers.google.com/maps/documentation/roads/snap",
        "category": "Maps"
    },

    {
        "name": "Speed Limits API",
        "description": "Speed Limits API provides access to the speed limit data for roads, allowing you to retrieve the maximum permitted speed limit for a given road segment or location.",
        "path": "/api/SpeedLimitsAPI",
        "selected": true,
        "price": "20$/1K req",
        "reference": "https://developers.google.com/maps/documentation/roads/speed-limits",
        "category": "Maps"
    },
    {
        "name": "Static Map API",
        "description": "Static Map API allows you to generate static images of maps with custom markers, paths, and overlays, providing a visual representation of a specific area or a set of geographic data.",
        "path": "/api/StaticMapAPI",
        "selected": true,
        "price": "Static: 2$/1K req | Dynamic: 7$/1K req",
        "reference": "https://developers.google.com/maps/documentation/maps-static",
        "category": "Maps"
    },
    {
        "name": "Street View API",
        "description": "Street View API provides panoramic street-level imagery, allowing you to embed interactive street view panoramas into your application or website for a more immersive user experience.",
        "path": "/api/StreetViewAPI",
        "selected": true,
        "price": "Static: 7$/1K req | Dynamic: 14$/1K req",
        "reference": "https://developers.google.com/maps/documentation/streetview",
        "category": "Maps"
    },
    {
        "name": "Aerial View API",
        "description": "Aerial View API provides an aerial video of the location specified, displaying the location from multiple angles and perspectives, allowing you to explore the area in more detail.",
        "path": "/api/ArealViewAPI",
        "selected": true,
        "price": "16$/1K req",
        "reference": "https://developers.google.com/maps/documentation/aerial-view",
        "category": "Maps"
    },
    {
        "name": "Find Place API",
        "description": "Find Place From Text API enables you to search for places based on user input, such as a text string or a query, and retrieves a list of places matching the input criteria.",
        "path": "/api/FindPlaceFromTextAPI",
        "selected": true,
        "price": "17$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/search-find-place",
        "category": "Places"
    },
    {
        "name": "Geocoding API",
        "description": "Geocoding API allows you to convert addresses or place names into geographic coordinates (latitude and longitude) and vice versa, enabling you to geographically locate and identify places on Earth.",
        "path": "/api/GeocodeAPI",
        "selected": true,
        "price": "5$/1K req",
        "reference": "https://developers.google.com/maps/documentation/geocoding/overview",
        "category": "Places"
    },
    {
        "name": "Geolocation API",
        "description": "Geolocation API provides information about the current geographical location of a device, such as latitude and longitude coordinates, helping you to develop location-aware applications and services.",
        "path": "/api/GeolocationAPI",
        "selected": true,
        "price": "5$/1K req",
        "reference": "https://developers.google.com/maps/documentation/geolocation/overview",
        "category": "Places"
    },
    {
        "name": "Nearby Search API",
        "description": "Nearby Search API enables you to search for places within a specific area or proximity to a certain location, retrieving a list of places that match the specified criteria. This is based on user's location and it could return 0 results.",
        "path": "/api/NearbySearchAPI",
        "selected": true,
        "price": "32$/1K req",
        "reference": "https://developers.google.com/maps/documentation/javascript/places#place_search_req",
        "category": "Places"
    },
    {
        "name": "Place Details API",
        "description": "Place Details API allows you to retrieve more detailed information about a specific place, including its address, contact details, photos, user reviews, and other relevant data.",
        "path": "/api/PlaceDetailsAPI",
        "selected": true,
        "price": "17$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/details",
        "category": "Places"
    },
    {
        "name": "Place Photos API",
        "description": "Places Photo API enables you to retrieve high-quality photos of places, landmarks, and points of interest from the Google Maps database, providing visual content for your applications or services.",
        "path": "/api/PlacesPhotoAPI",
        "selected": true,
        "price": "7$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/photos",
        "category": "Places"
    },
    {
        "name": "Query Autocomplete API",
        "description": "Autocomplete API provides a query prediction service that allows you to fetch a list of suggested queries as users type, helping them complete their search queries more efficiently.",
        "path": "/api/QueryAutocompleteAPI",
        "selected": true,
        "price": "2.83$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#ac-per-request",
        "category": "Places"
    },
    {
        "name": "Text Search API",
        "description": "Text Search API enables you to search for places based on a text string or query, retrieving a list of places that match the specified search criteria, such as name, address, or type.",
        "path": "/api/TextSearchAPI",
        "selected": true,
        "price": "Free",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/search-text",
        "category": "Places"
    },
    {
        "name": "Text Search Advanced API",
        "description": "The Text Search Advanced API enables you to search for spesific features, using the FieldMask header. Gives support for searching for features like wheelchair accessible places, rating range, or places that are currently open.",
        "path": "/api/TextSearchAdvancedAPI",
        "selected": true,
        "price": "40$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/search-textual#fieldmask-header",
        "category": "Places"
    },
    {
        "name": "TimezoneAPI",
        "description": "Timezone API allows you to retrieve the timezone information for a specific location or a set of geographic coordinates, providing the local time and offset from Coordinated Universal Time (UTC).",
        "path": "/api/TimezoneAPI",
        "selected": true,
        "price": "5$/1K req",
        "reference": "https://developers.google.com/maps/documentation/timezone/overview",
        "category": "Places"
    },
    {
        "name": "Autocomplete Places API",
        "description": "Autocomplete Places API allows you to provide real-time suggestions for places as users type, enabling them to quickly and easily complete their input. This search does not return details about the places.",
        "path": "/api/AutocompleteAPI",
        "selected": true,
        "price": "17$/1K req",
        "reference": "https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#ac-no-details-session",
        "category": "Places"
    },
    {
        "name": "Address Validation API",
        "description": "Address Validation API allows developers to verify and validate addresses by ensuring accurate and reliable address data for a variety of applications",
        "path": "/api/AddressValidationAPI",
        "selected": true,
        "price": "17$/1K req",
        "reference": "https://developers.google.com/maps/documentation/address-validation",
        "category": "Places"
    },
    
    {
        "name": "ElevationAPI",
        "description": "Elevation API provides elevation data for any point on Earth, allowing you to retrieve the elevation of locations on land or even underwater.",
        "path": "/api/ElevationAPI",
        "selected": true,
        "price": "5$/1K req",
        "reference": "https://developers.google.com/maps/documentation/elevation/overview",
        "category": "Places"
    },
    {
        "name": "Compute Routes API",
        "description": "Compute Routes API primary route along with optional alternate routes, given a set of terminal and intermediate waypoints.",
        "path": "/api/ComputeRoutesAPI",
        "selected": true,
        "price": "Basic: 5$/1K req | Advanced: 10$/1K req | Prefered: 15$/1K req",
        "reference": "https://developers.google.com/maps/documentation/routes/compute_route_directions",
        "category": "Routes"
    },
    {
        "name": "Compute Routes Matrix API",
        "description": "Compute Routes API primary route along with alternate routes, given a set of terminal and intermediate waypoints. It is traffic aware and supports up to 50 waypoints.",
        "path": "/api/ComputeRoutesMatrixAPI",
        "selected": true,
        "price": "Basic: 5$/1K req | Advanced: 10$/1K req | Prefered: 15$/1K req",
        "reference": "https://developers.google.com/maps/documentation/routes/compute_route_matrix",
        "category": "Routes"
    },
    {
        "name": "Directions API",
        "description": "Directions API provides directions for traveling between different locations, including various transportation modes, such as driving, walking, or cycling.",
        "path": "/api/DirectionsAPI",
        "selected": true,
        "price": "Basic: 5$/1K req | Advanced: 10$/1K req",
        "reference": "https://developers.google.com/maps/documentation/javascript/directions",
        "category": "Routes"
    },
    {
        "name": "Distance Matrix API",
        "description": "Distance Matrix API calculates the travel distance and time between multiple origins and destinations, useful for determining the distance and duration of routes.",
        "path": "/api/DistanceMatrixAPI",
        "selected": true,
        "price": "Basic: 5$/1K req | Advanced: 10$/1K req | Prefered: 15$/1K req",
        "reference": "https://developers.google.com/maps/documentation/distance-matrix",
        "category": "Routes"
    },
    {
        "name": "Custom Search API",
        "description": "Custom Search API provides a way to programmatically access Google's search capabilities to perform web searches with customized queries and retrieve search results.",
        "path": "/api/CustomSearchAPI",
        "selected": true,
        "price": "5$/1K req",
        "reference": "https://developers.google.com/custom-search/v1/overview",
        "category": "Google Cloud"
    },
    {
        "name": "Translate API",
        "description": "The Translate API translates text from one language to another. It can be take input as a string or a file, and can translate to any language supported by Google Translate.",
        "path": "/api/TranslateAPI",
        "selected": true,
        "price": "Basic: 20$/1M characters | Advanced: 20$/1M characters",
        "reference": "https://cloud.google.com/translate",
        "category": "Google Cloud"
    },
    {
        "name": "Firebase Cloud Messaging API",
        "description": "FCM (Firebase Cloud Messaging) API allows you to send notifications and messages to devices using Firebase Cloud Messaging, enabling you to engage and communicate with your app users.",
        "path": "/api/FCMAPI",
        "selected": true,
        "price": "Free",
        "reference": "https://firebase.google.com/docs/reference/fcm/rest",
        "category": "Google Cloud"
    },
    {
        "name": "ML Analysis API",
        "description": "Uses Machine Learning to analyze the content of a text file. It can classify the content of the text file, extract entities, and analyze the sentiment of the text.",
        "path": "/api/MLAnalysisAPI",
        "selected": true,
        "price": "0-5K chars: Free | 5k-1M chars: 1$/1K chars | 1M+ chars: 0.5$/1K chars",
        "reference": "https://cloud.google.com/natural-language",
        "category": "Google Cloud"
    },
    {
        "name": "Text to Speech API",
        "description": "Uses Machine Learning to create a mp3 with the input supplied, with option to select the type of void, language and speed of the voice.",
        "path": "/api/TextToSpeechAPI",
        "selected": true,
        "price": "16$ per 1M bytes",
        "reference": "https://cloud.google.com/text-to-speech",
        "category": "Google Cloud"
    },

]