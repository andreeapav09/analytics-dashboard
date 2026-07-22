import React, { useEffect, useRef } from 'react';
import { generateSingleLog } from '../utils/mockData';

/**
 * LiveMetricPoller Component
 * Demonstrates:
 * 1. useEffect for side effects (setting up interval timer)
 * 2. useEffect Cleanup function (clearInterval on unmount or pause)
 * 3. useRef to store the interval ID persistently across renders
 */
export default function LiveMetricPoller({ isPollingActive, onNewLog, onTogglePolling }) {
  // Store the interval ID in a ref so it survives re-renders without triggering a re-render
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isPollingActive) {
      console.log('Starting live metric polling timer...');
      
      // Start the interval timer and save the returned ID in our ref
      intervalIdRef.current = setInterval(() => {
        const newLog = generateSingleLog();
        onNewLog(newLog);
      }, 2000); // Generate new metric every 2 seconds
    }

    // CLEANUP FUNCTION: Runs when isPollingActive changes or component unmounts
    return () => {
      if (intervalIdRef.current) {
        console.log('Cleaning up polling timer ID:', intervalIdRef.current);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isPollingActive, onNewLog]); // Re-subscribe if polling status or callback changes

  return (
    <div style={styles.container}>
      <span style={styles.text}>
        {isPollingActive ? '🟢 Live metrics streaming every 2s' : '🔴 Polling paused'}
      </span>
      <button onClick={onTogglePolling} style={styles.button}>
        {isPollingActive ? 'Pause Polling' : 'Resume Polling'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#27272a',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  },
  text: {
    fontSize: '0.9rem',
    color: '#e4e4e7',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#3f3f46',
    color: '#ffffff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.85rem'
  }
};
