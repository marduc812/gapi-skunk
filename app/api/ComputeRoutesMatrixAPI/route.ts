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

  const fullUrl = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix';

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": jsonData['key'],
    "X-Goog-FieldMask": "originIndex,destinationIndex,duration,distanceMeters,status,condition"
  };

  const body = {
    "origins": [
      {
        "waypoint": {
          "location": {
            "latLng": {
              "latitude": 37.420761,
              "longitude": -122.081356
            }
          }
        },
        "routeModifiers": { "avoid_ferries": true }
      },
      {
        "waypoint": {
          "location": {
            "latLng": {
              "latitude": 37.403184,
              "longitude": -122.097371
            }
          }
        },
        "routeModifiers": { "avoid_ferries": true }
      }
    ],
    "destinations": [
      {
        "waypoint": {
          "location": {
            "latLng": {
              "latitude": 37.420999,
              "longitude": -122.086894
            }
          }
        }
      },
      {
        "waypoint": {
          "location": {
            "latLng": {
              "latitude": 37.383047,
              "longitude": -122.044651
            }
          }
        }
      }
    ],
    "travelMode": "DRIVE",
    "routingPreference": "TRAFFIC_AWARE"
  };

  const res = await fetch(fullUrl, {
    cache: 'no-store',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (selectedLanguage === 'powershell') {
    finalPoc = `$response = Invoke-RestMethod -Method Post -Uri 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix' -Headers @{'Content-Type'='application/json'; 'X-Goog-Api-Key'='${jsonData['key']}'; 'X-Goog-FieldMask'='originIndex,destinationIndex,duration,distanceMeters,status,condition'} -Body '{"origins": [{"waypoint": {"location": {"latLng": {"latitude": 37.420761, "longitude": -122.081356}}}, "routeModifiers": {"avoid_ferries": true}}, {"waypoint": {"location": {"latLng": {"latitude": 37.403184, "longitude": -122.097371}}}, "routeModifiers": {"avoid_ferries": true}}], "destinations": [{"waypoint": {"location": {"latLng": {"latitude": 37.420999, "longitude": -122.086894}}}}, {"waypoint": {"location": {"latLng": {"latitude": 37.383047, "longitude": -122.044651}}}}], "travelMode": "DRIVE", "routingPreference": "TRAFFIC_AWARE"}' -ContentType 'application/json'; $response`;
  } else if (selectedLanguage === 'python') {
    finalPoc = `import requests\nimport json\n\nurl = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix'\nheaders = {\n    'Content-Type': 'application/json',\n    'X-Goog-Api-Key': '${jsonData['key']}',\n    'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters,status,condition'\n}\ndata = {\n    "origins": [\n        {\n            "waypoint": {\n                "location": {\n                    "latLng": {\n                        "latitude": 37.420761,\n                        "longitude": -122.081356\n                    }\n                }\n            },\n            "routeModifiers": { "avoid_ferries": True }\n        },\n        {\n            "waypoint": {\n                "location": {\n                    "latLng": {\n                        "latitude": 37.403184,\n                        "longitude": -122.097371\n                    }\n                }\n            },\n            "routeModifiers": { "avoid_ferries": True }\n        }\n    ],\n    "destinations": [\n        {\n            "waypoint": {\n                "location": {\n                    "latLng": {\n                        "latitude": 37.420999,\n                        "longitude": -122.086894\n                    }\n                }\n            }\n        },\n        {\n            "waypoint": {\n                "location": {\n                    "latLng": {\n                        "latitude": 37.383047,\n                        "longitude": -122.044651\n                    }\n                }\n            }\n        }\n    ],\n    "travelMode": "DRIVE",\n    "routingPreference": "TRAFFIC_AWARE"\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())\n`;
  } else {
    finalPoc = `curl -X POST 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix' -H 'Content-Type: application/json' -H 'X-Goog-Api-Key: ${jsonData['key']}' -H 'X-Goog-FieldMask: originIndex,destinationIndex,duration,distanceMeters,status,condition' -d '{"origins": [{"waypoint": {"location": {"latLng": {"latitude": 37.420761, "longitude": -122.081356}}}, "routeModifiers": {"avoid_ferries": true}}, {"waypoint": {"location": {"latLng": {"latitude": 37.403184, "longitude": -122.097371}}}, "routeModifiers": {"avoid_ferries": true}}], "destinations": [{"waypoint": {"location": {"latLng": {"latitude": 37.420999, "longitude": -122.086894}}}}, {"waypoint": {"location": {"latLng": {"latitude": 37.383047, "longitude": -122.044651}}}}], "travelMode": "DRIVE", "routingPreference": "TRAFFIC_AWARE"}'`;
  }

  if (res.status === 200) {
    return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
  } else {
    console.error('Error: ' + res.status);
    return NextResponse.json({ "status": "error", "poc": "" });
  }
}