'use client'
import { useState } from 'react';
import { Input } from './components/Input';
import styles from './page.module.css'
import dynamic from 'next/dynamic';
import { InfoBox } from './components/InfoBox';


const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
});

export default function Home() {

  const [ipData, setIpData] = useState(null)
  const handleIpDataChange = (data) => {
    console.log('Received data:', data); // Add this log
    setIpData(data)
  };


  return (
    <main className={styles.main}>
      <Input onIpDataChange={handleIpDataChange} />
      <InfoBox ipAddress={ipData?.ip ||  ""} location={ipData?.location?.region || ""} timezone={ipData?.location?.timezone || ""} isp={ipData?.isp || ""}/>
      {ipData?.location?.lat && ipData?.location?.lng && (
        <Map latitude={ipData?.location?.lat} longitude={ipData?.location?.lng} />
      )}
    </main>
  );
}
