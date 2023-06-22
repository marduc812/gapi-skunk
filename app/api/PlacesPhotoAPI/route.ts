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

    const fullUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=' + jsonData['key'];

    const res = await fetch(fullUrl, {
        cache: 'no-store'
    });

    if (selectedLanguage === 'powershell') {
        finalPoc = `$response = Invoke-WebRequest -Method GET "${fullUrl}";$response`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\n\nrequests.get("${fullUrl}")\nprint(response.content)`;
    } else {
        finalPoc = `curl -X GET "${fullUrl}"`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}