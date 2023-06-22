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

    const fullUrl = 'https://roads.googleapis.com/v1/nearestRoads?points=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=' + jsonData['key'];

    const res = await fetch(fullUrl, {
        cache: 'no-store'
    });

    if (selectedLanguage === 'powershell') {
        finalPoc = `$response = Invoke-WebRequest -Method GET "${fullUrl}";$response.Content`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\n\nrequests.get("${fullUrl}")\nprint(response.content)`;
    } else {
        finalPoc = `curl -X GET "${fullUrl}"`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        console.error('Error: ' + res.status);
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}