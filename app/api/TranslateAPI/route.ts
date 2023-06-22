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

    const fullUrl = 'https://translation.googleapis.com/language/translate/v2?key=' + jsonData['key'];

    const body = {
        q: 'Τέλεια η καινούρια σου τσάντα Θάνο!',
        source: 'el',
        target: 'en',
        format: 'text'
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
        finalPoc = `$res = Invoke-RestMethod -Uri ('https://translation.googleapis.com/language/translate/v2?key=${jsonData['key']}') -Method POST -Headers @{'Content-Type'='application/json'; 'Accept'='application/json'; 'Authorization'='key=${jsonData['key']}'} -Body (@{'q'='Τέλεια η καινούρια σου τσάντα Θάνο!'; 'source'='el'; 'target'='en'; 'format'='text'} | ConvertTo-Json)`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\n\nurl = "https://translation.googleapis.com/language/translate/v2?key=${jsonData['key']}"\nheaders = {\n    "Content-Type": "application/json",\n    "Accept": "application/json",\n    "Authorization": "key=${jsonData['key']}"\n}\ndata = {\n    "q": "Τέλεια η καινούρια σου τσάντα Θάνο!",\n    "source": "el",\n    "target": "en",\n    "format": "text"\n}\n\nresponse = requests.post(url, headers=headers, json=data)\n`;
    } else {
        finalPoc = `curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: key=${jsonData['key']}" -d '{"q":"Τέλεια η καινούρια σου τσάντα Θάνο!","source":"el","target":"en","format":"text"}' "https://translation.googleapis.com/language/translate/v2?key=${jsonData['key']}"`;
    }

    if (res.status === 200) {
        return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
    } else {
        
        return NextResponse.json({ "status": "error", "poc": "" });
    }
}