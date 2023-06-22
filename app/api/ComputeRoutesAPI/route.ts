import { NextResponse } from 'next/server';
import { getLanguage, validateKey } from '@/lib/validations';

export async function POST(request: Request) {
  const jsonData = await request.json();

  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang')

  let selectedLanguage = 'bash';
  let finalPoc = '';

  if (!jsonData['key']) {
    return NextResponse.json({ error: 'Missing key value' }, { status: 500 });
  }

  const isValidKey = await validateKey(jsonData['key']);

  if (!isValidKey) {
    return NextResponse.json({ error: 'Invalid key value' }, { status: 500 });
  }

  if (lang) {
    selectedLanguage = await getLanguage(lang);
  }

  const fullUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": jsonData['key'],
    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
  };

  const body = {
    origin: {
      location: {
        latLng: {
          latitude: 37.419734,
          longitude: -122.0827784
        }
      }
    },
    destination: {
      location: {
        latLng: {
          latitude: 37.417670,
          longitude: -122.079595
        }
      }
    },
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    departureTime: "2023-10-15T15:01:23.045123456Z",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false
    },
    languageCode: "en-US",
    units: "IMPERIAL"
  };

  const res = await fetch(fullUrl, {
    cache: 'no-store',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });


  if (selectedLanguage === 'powershell') {
    finalPoc = `$response = Invoke-RestMethod -Method Post -Uri 'https://routes.googleapis.com/directions/v2:computeRoutes' -Headers @{'Content-Type'='application/json'; 'X-Goog-Api-Key'='${jsonData['key']}'; 'X-Goog-FieldMask'='routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'} -Body '{"origin": {"location": {"latLng": {"latitude": 37.419734, "longitude": -122.0827784}}}, "destination": {"location": {"latLng": {"latitude": 37.417670, "longitude": -122.079595}}}, "travelMode": "DRIVE", "routingPreference": "TRAFFIC_AWARE", "departureTime": "2023-10-15T15:01:23.045123456Z", "computeAlternativeRoutes": false, "routeModifiers": {"avoidTolls": false, "avoidHighways": false, "avoidFerries": false}, "languageCode": "en-US", "units": "IMPERIAL"}' -ContentType 'application/json'; $response.route`;
  } else if (selectedLanguage === 'python') {
    finalPoc = `import requests\n\nurl = 'https://routes.googleapis.com/directions/v2:computeRoutes'\nheaders = {\n    'Content-Type': 'application/json',\n    'X-Goog-Api-Key': '${jsonData['key']}',\n    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'\n}\ndata = {\n    "origin": {\n        "location": {\n            "latLng": {\n                "latitude": 37.419734,\n                "longitude": -122.0827784\n            }\n        }\n    },\n    "destination": {\n        "location": {\n            "latLng": {\n                "latitude": 37.417670,\n                "longitude": -122.079595\n            }\n        }\n    },\n    "travelMode": "DRIVE",\n    "routingPreference": "TRAFFIC_AWARE",\n    "departureTime": "2023-10-15T15:01:23.045123456Z",\n    "computeAlternativeRoutes": False,\n    "routeModifiers": {\n        "avoidTolls": False,\n        "avoidHighways": False,\n        "avoidFerries": False\n    },\n    "languageCode": "en-US",\n    "units": "IMPERIAL"\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())\n`;
  } else {
    finalPoc = `curl -X POST 'https://routes.googleapis.com/directions/v2:computeRoutes' -H 'Content-Type: application/json' -H 'X-Goog-Api-Key: ${jsonData['key']}' -H 'X-Goog-FieldMask: routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline' -d '{"origin": {"location": {"latLng": {"latitude": 37.419734, "longitude": -122.0827784}}}, "destination": {"location": {"latLng": {"latitude": 37.417670, "longitude": -122.079595}}}, "travelMode": "DRIVE", "routingPreference": "TRAFFIC_AWARE", "departureTime": "2023-10-15T15:01:23.045123456Z", "computeAlternativeRoutes": false, "routeModifiers": {"avoidTolls": false, "avoidHighways": false, "avoidFerries": false}, "languageCode": "en-US", "units": "IMPERIAL"}'`;
  }

  if (res.status === 200) {
    return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
  } else {
    
    return NextResponse.json({ "status": "error", "poc": "" });
  }
}