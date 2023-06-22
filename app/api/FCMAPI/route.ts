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
        return NextResponse.json({ error: 'Missing key value'}, { status: 500 });
    }

    const isValidKey = await validateKey(jsonData['key']);

    if (!isValidKey) {
        return NextResponse.json({ error: 'Invalid key value'}, { status: 500 });
    }

    if (lang) {
        selectedLanguage = await getLanguage(lang);
    }

    const fullUrl = 'https://fcm.googleapis.com/fcm/send';

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'key=' + jsonData['key']
    }


    const res = await fetch(fullUrl, {
        cache: 'no-store',
        method: 'POST',
        headers: headers
        });

    if (selectedLanguage === 'powershell') {
        finalPoc = `$res = Invoke-RestMethod -Uri 'https://fcm.googleapis.com/fcm/send' -Method POST -Headers @{'Content-Type' = 'application/json';'Accept' = 'application/json';'Authorization' = 'key=${jsonData['key']}'}`;
    } else if (selectedLanguage === 'python') {
        finalPoc = `import requests\n\nurl = "https://fcm.googleapis.com/fcm/send"\nheaders = {\n    "Content-Type": "application/json",\n    "Accept": "application/json",\n    "Authorization": "key=${jsonData['key']}"\n}\n\nresponse = requests.post(url, headers=headers)\n\nprint(response.content)`;
    } else {
        finalPoc = `curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: key=${jsonData['key']}" "https://fcm.googleapis.com/fcm/send"`;
    }

    if (res.status === 200) {
        return NextResponse.json({"status": "success","poc": finalPoc, "language": selectedLanguage});
    } else {
        
        return NextResponse.json({"status": "error","poc": ""});
    }
}