import { NextResponse } from 'next/server';

export async function GET(req) {
  const apiKey = process.env.IPIFY_API;  
  try {
      const { searchParams } = new URL(req.url)
      const ip = searchParams.get('ip')
      console.log('BackEnd API', ip)

    if (!ip) {
      return NextResponse.json({error: 'IP is required'}, {status:400})
    }

    const geoUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
 
    const geoResponse = await fetch(geoUrl)
    const geoData = await geoResponse.json()

    if(!geoResponse.ok) {
      return NextResponse.json({error: geoData.message || 'Failed to fetch geolocation'}, {status: geoResponse.status})
    }

    return NextResponse.json(geoData)
    
  } catch (error) {
    return NextResponse.json({error: 'Internal server error'}, {status:500})
    
  }
}