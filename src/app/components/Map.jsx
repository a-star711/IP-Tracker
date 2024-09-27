'use client'

import React, {useRef, useEffect, useState } from 'react';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './Map.module.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


const Map = ({latitude, longitude}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [zoom] = useState(12);
  console.log('map render', latitude, longitude)
  const markerRef = useRef(null); 


  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(latitude, longitude),
      zoom: zoom,
      maxZoom: 8,
    });
  
    const mtLayer = new MaptilerLayer({
      apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
    }).addTo(map.current);

    markerRef.current = L.marker([latitude, longitude]).addTo(map.current);
  
  }, [latitude, longitude, zoom]);

  useEffect(() => {
    if (map.current) {
      map.current.setView([latitude, longitude], zoom);
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude]).addTo(map.current);
      }
    }
  }, [latitude, longitude, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map}/>
    </div>
  )
}

export default Map;