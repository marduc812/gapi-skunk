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

    const fullUrl = 'https://addressvalidation.googleapis.com/v1:validateAddress?key=' + jsonData['key'];

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'key=' + jsonData['key']
    }

    const body = {
        address: {
            regionCode: "US",
            locality: "Mountain View",
            addressLines: ["1600 Amphitheatre Pkwy"]
        }
    };


    const res = await fetch(fullUrl, {
        cache: 'no-store',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (selectedLanguage === 'powershell') {
        finalPoc = `$response = Invoke-RestMethod -Method Post -Uri '${fullUrl}' -Headers @{'Content-Type' = 'application/json'; 'Accept' = 'application/json'; 'Authorization' = 'key=${jsonData['key']}'} -Body '{"address": {"regionCode": "US", "locality": "Mountain View", "addressLines": ["1600 Amphitheatre Pkwy"]}}'; $response.result`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\nimport json\n\nurl = '${fullUrl}'\n\nheaders = {\n    'Content-Type': 'application/json',\n    'Accept': 'application/json',\n    'Authorization': 'key=${jsonData['key']}'\n}\n\ndata = {\n    'address': {\n        'regionCode': 'US',\n        'locality': 'Mountain View',\n        'addressLines': ['1600 Amphitheatre Pkwy']\n    }\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())`;
    } else {
        finalPoc = `curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: key=${jsonData['key']}" -d '{"address": {"regionCode": "US", "locality": "Mountain View", "addressLines": ["1600 Amphitheatre Pkwy"]}}' "${fullUrl}"`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "codeLanguage": selectedLanguage });
    } else {
        console.error('Error: ' + res.status);
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}