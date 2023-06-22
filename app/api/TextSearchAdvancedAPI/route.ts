import { NextResponse } from 'next/server';
import { getLanguage, validateKey } from '@/lib/validations';
import { headers } from 'next/dist/client/components/headers';

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


    const fullUrl = 'https://places.googleapis.com/v1/Text:search';

    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": jsonData['key'],
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel"
    };

    const body = {
        textQuery: "Spicy Vegetarian Food in Sydney, Australia"
    };

    const res = await fetch(fullUrl, {
        cache: 'no-store',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (selectedLanguage === 'powershell') {
        finalPoc = `$res = (Invoke-RestMethod -Uri 'https://places.googleapis.com/v1/Text:search' -Method POST -Headers @{ 'Content-Type' = 'application/json'; 'X-Goog-Api-Key' = '${jsonData['key']}'; 'X-Goog-FieldMask' = 'places.displayName,places.formattedAddress,places.priceLevel' } -Body (@{ textQuery = 'Spicy Vegetarian Food in Sydney, Australia' } | ConvertTo-Json)) | ConvertTo-Json; Write-Host $res`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\nimport json\n\nfull_url = 'https://places.googleapis.com/v1/Text:search'\n\nheaders = {\n    'Content-Type': 'application/json',\n    'X-Goog-Api-Key': '${jsonData['key']}',\n    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'\n}\n\nbody = {\n    'textQuery': 'Spicy Vegetarian Food in Sydney, Australia'\n}\n\nres = requests.post(full_url, headers=headers, json=body)\ndata = res.json()\nprint(json.dumps(data))\n`;
    } else {
        finalPoc = `curl -X POST -H 'Content-Type: application/json' -H 'X-Goog-Api-Key: ${jsonData['key']}' -H 'X-Goog-FieldMask: places.displayName,places.formattedAddress,places.priceLevel' -d '{"textQuery": "Spicy Vegetarian Food in Sydney, Australia"}' 'https://places.googleapis.com/v1/Text:search'`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        console.error('Error: ' + res.status);
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}