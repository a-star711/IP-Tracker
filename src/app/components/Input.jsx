'use client'
import React, { useEffect, useState } from 'react'
import styles from './Input.module.css';
import { showToast } from '../../lib/toastFunction';
import { isTrackableIp } from '../../lib/isTrackableIp'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


export const Input = ({ onIpDataChange }) => {

  const [ipInput, setIpInput] = useState('')
  const [debouncedInput, setDebouncedInput] = useState('')
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geoData, setGeoData] = useState([])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(ipInput)
    }, 200)

    return () => {
      clearTimeout(handler)
    }

  }, [ipInput])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   
    try {

      if (!ipInput) {
        showToast('error', "Please search for a valid IPv4 or IPv6");
        setLoading(false);
        return;
      }

      if(!isTrackableIp(ipInput)) {
        showToast('error', "Invalid IP address. Please enter a valid IPv4 or IPv6 address.");
        setLoading(false);
        return;

      }

      const response = await fetch(`/api/iptracker?ip=${encodeURIComponent(ipInput)}`, {
        method: 'GET',
      }); 

      const data = await response.json();
      setGeoData(data);
      onIpDataChange(data);

      if (!response.ok) {
        showToast('error', 'Failed to track IP')
      }

    } catch (err) {
      setError((err).message);
      showToast('error', "Please search for a valid IPv4 or IPv6")
    } finally {
      setLoading(false);

    }
  };

  return (

    <form className={styles.form} onSubmit={handleSubmit}> 
    <div className={styles.header}>
       <h1>IP Address Tracker</h1>
       </div>   
       <div className={styles.inputContainer}>
       <input type="text"
        className={styles.input}
        value={ipInput}
        onChange={(e) => setIpInput(e.target.value)}
        placeholder="Search for any IP address"
       />
       <button className={styles.button}><MdOutlineKeyboardArrowRight color='white' size={24}/></button>
    
       </div>
    
    </form>
 
  )
}
