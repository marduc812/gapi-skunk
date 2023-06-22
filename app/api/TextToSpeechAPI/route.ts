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

  const fullUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';

  const body = {
    "input": {
      "text": "I like this product"
    },
    "voice": {
      "languageCode": "en-gb",
      "name": "en-GB-Standard-A",
      "ssmlGender": "FEMALE"
    },
    "audioConfig": {
      "audioEncoding": "MP3"
    }
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
    finalPoc = `$res = Invoke-RestMethod -Uri 'https://texttospeech.googleapis.com/v1/text:synthesize' -Method POST -Headers @{ 'Content-Type' = 'application/json'; 'Accept' = 'application/json'; 'Authorization' = 'key=${jsonData['key']}' } -Body (@{ input = @{ text = 'I like this product' }; voice = @{ languageCode = 'en-gb'; name = 'en-GB-Standard-A'; ssmlGender = 'FEMALE' }; audioConfig = @{ audioEncoding = 'MP3' } } | ConvertTo-Json)`;
  } else if (selectedLanguage === 'python') {
    finalPoc = `import requests\nimport json\n\nfull_url = 'https://texttospeech.googleapis.com/v1/text:synthesize'\n\nheaders = {\n    'Content-Type': 'application/json',\n    'Accept': 'application/json',\n    'Authorization': 'key=${jsonData['key']}'\n}\n\nbody = {\n    'input': {\n        'text': 'I like this product'\n    },\n    'voice': {\n        'languageCode': 'en-gb',\n        'name': 'en-GB-Standard-A',\n        'ssmlGender': 'FEMALE'\n    },\n    'audioConfig': {\n        'audioEncoding': 'MP3'\n    }\n}\n\nres = requests.post(full_url, headers=headers, json=body)\ndata = res.json()\nprint(json.dumps(data))\n`;
  } else {
    finalPoc = `curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: key=${jsonData['key']}' -d '{"input": {"text": "I like this product"}, "voice": {"languageCode": "en-gb", "name": "en-GB-Standard-A", "ssmlGender": "FEMALE"}, "audioConfig": {"audioEncoding": "MP3"}}' 'https://texttospeech.googleapis.com/v1/text:synthesize'`;
  }

  if (res.status === 200) {
    return NextResponse.json({ "status": "success", "poc": finalPoc, "language": selectedLanguage });
  } else {
    
    return NextResponse.json({ "status": "error", "poc": "" });
  }
}