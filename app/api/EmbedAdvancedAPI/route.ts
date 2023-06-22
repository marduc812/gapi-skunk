import { NextResponse } from 'next/server';
import { validateKey } from '@/lib/validations';
 
export async function POST(request: Request) {
    const jsonData = await request.json();

    if (!jsonData['key']) {
        return NextResponse.json({ error: 'Missing key value'}, { status: 500 });
    }

    const isValidKey = await validateKey(jsonData['key']);

    if (!isValidKey) {
        return NextResponse.json({ error: 'Invalid key value'}, { status: 500 });
    }

    const fullUrl = 'https://www.google.com/maps/embed/v1/search?q=cafe+in+Thessaloniki&key=' + jsonData['key'];

    const res = await fetch(fullUrl, {
        cache: 'no-store'
        });

    if (res.status === 200) {
        const finalPoc = `<iframe width="600" height="450" frameborder="0" style="border:0" src="${fullUrl}" allowfullscreen></iframe>`;
        return NextResponse.json({"status": "success","poc": finalPoc, "language": "html"});
    } else {
        
        return NextResponse.json({"status": "error","poc": "" });
    }
}