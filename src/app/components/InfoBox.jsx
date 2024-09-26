import styles from './InfoBox.module.css';

export const InfoBox = ({ ipAddress, location, timezone, isp }) => {
  return (
    <div className={styles.card}>  
     <div className={styles.infoBox}>
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>IP Address:</span>
      <span className={styles.infoValue}>{ipAddress}</span>
    </div>
    <div className={styles.separator}></div>
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>Location:</span>
      <span className={styles.infoValue}>{location}</span>
    </div>
    <div className={styles.separator}></div>
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>Timezone</span>
      <span className={styles.infoValue}>{timezone}</span>
    </div>
    <div className={styles.separator}></div>
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>ISP</span>
      <span className={styles.infoValue}>{isp}</span>
    </div>
  </div>
  </div>

  
  );
};
