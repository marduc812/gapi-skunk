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

    const fullUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + jsonData['key'];

    const res = await fetch(fullUrl, {
        method: 'POST',
        cache: 'no-store'
    });

    if (selectedLanguage === 'powershell') {
        finalPoc = `Invoke-RestMethod -Uri "${fullUrl}" -Method Post -Headers @{"Cache-Control" = "no-store"}`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\n\nurl = "${fullUrl}" \n\nheaders = {"Cache-Control": "no-store"}\nresponse = requests.post(url, headers=headers)\n\nprint(response.json())`;
    } else {
        finalPoc = `curl -X POST -H "Cache-Control: no-store" "${fullUrl}"`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}