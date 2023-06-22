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

    const fullUrl = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + jsonData['key'];

    const body = {
        document: {
            content: 'I love this product!',
            type: 'PLAIN_TEXT'
        },
        encodingType: 'UTF8'
    };

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'key=' + jsonData['key']
    }


    const res = await fetch(fullUrl, {
        cache: 'no-store',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });


    if (selectedLanguage === 'powershell') {
        finalPoc = `$res = Invoke-RestMethod -Uri ('${fullUrl}' ) -Method POST -Headers @{ 'Content-Type' = 'application/json'; 'Accept' = 'application/json'; 'Authorization' = 'key=${jsonData['key']}' } -Body (@{ document = @{ content = 'I love this product!'; type = 'PLAIN_TEXT' }; encodingType = 'UTF8' } | ConvertTo-Json)`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\nimport json\n\nfull_url = '${fullUrl}'\n\nbody = {\n    'document': {\n        'content': 'I love this product!',\n        'type': 'PLAIN_TEXT'\n    },\n    'encodingType': 'UTF8'\n}\n\nheaders = {\n    'Content-Type': 'application/json',\n    'Accept': 'application/json',\n    'Authorization': 'key=${jsonData['key']}'\n}\n\nres = requests.post(full_url, headers=headers, json=body)\nprint(res.json())`;
    } else {
        finalPoc = `curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: key=${jsonData['key']}' -d '{"document": {"content": "I love this product!", "type": "PLAIN_TEXT"}, "encodingType": "UTF8"}' '${fullUrl}'`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}