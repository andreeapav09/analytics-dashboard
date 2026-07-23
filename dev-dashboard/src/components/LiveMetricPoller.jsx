import React, { useEffect, useRef } from 'react';
import { generateLogBatch } from '../utils/mockData';
import { useTheme } from '../context/ThemeContext';

/**
 * LiveMetricPoller Component (Configurable High-Volume Streaming Engine)
 * Demonstrates:
 * 1. useContext: Reads theme directly from global ThemeProvider.
 * 2. Dynamic setInterval timer configuration (pollingInterval in ms).
 * 3. Dynamic batch stream generation (batchSize logs per tick).
 * 4. useEffect cleanup teardown when pollingInterval/batchSize dependencies change.
 * 5. Instant +10,000 stress test injection.
 */
export default function LiveMetricPoller({ 
  isPollingActive, 
  pollingInterval, 
  batchSize, 
  onNewLogsBatch, 
  onTogglePolling,
  onIntervalChange,
  onBatchSizeChange,
  onInjectStressBatch
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Store active timer ID in a ref
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isPollingActive) {
      console.log(`Starting stream poller: ${batchSize} log(s) every ${pollingInterval}ms`);
      
      // Start background timer with dynamic frequency and batch size
      intervalIdRef.current = setInterval(() => {
        const batch = generateLogBatch(batchSize);
        onNewLogsBatch(batch);
      }, pollingInterval);
    }

    // CLEANUP FUNCTION: Tears down previous timer when interval, batch size, or status changes
    return () => {
      if (intervalIdRef.current) {
        console.log('Cleaning up poller timer ID:', intervalIdRef.current);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isPollingActive, pollingInterval, batchSize, onNewLogsBatch]);

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDark ? '#27272a' : '#ffffff',
    border: isDark ? '1px solid #3f3f46' : '1px solid #e4e4e7',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
  };

  const statusTextStyle = {
    ...styles.statusText,
    color: isDark ? '#e4e4e7' : '#18181b'
  };

  const labelStyle = {
    ...styles.label,
    color: isDark ? '#a1a1aa' : '#71717a'
  };

  const selectStyle = {
    ...styles.select,
    backgroundColor: isDark ? '#18181b' : '#f4f4f8',
    color: isDark ? '#ffffff' : '#09090b',
    border: isDark ? '1px solid #3f3f46' : '1px solid #d4d4d8'
  };

  const toggleBtnStyle = {
    ...styles.toggleBtn,
    backgroundColor: isDark ? '#3f3f46' : '#e4e4e7',
    color: isDark ? '#ffffff' : '#18181b'
  };

  return (
    <div style={containerStyle}>
      {/* Top Stream Status Header */}
      <div style={styles.topRow}>
        <span style={statusTextStyle}>
          {isPollingActive 
            ? `🟢 Streaming ${batchSize.toLocaleString()} log(s) every ${pollingInterval}ms` 
            : '🔴 Stream Polling Paused'}
        </span>

        <div style={styles.actionsGroup}>
          <button 
            onClick={onInjectStressBatch} 
            style={styles.stressBtn}
            title="Inject +10,000 metric logs instantly into memory"
          >
            ⚡ Inject +10,000 Stress Batch
          </button>

          <button onClick={onTogglePolling} style={toggleBtnStyle}>
            {isPollingActive ? 'Pause Polling' : 'Resume Polling'}
          </button>
        </div>
      </div>

      {/* Dynamic Stream Settings Controls */}
      <div style={{ ...styles.controlsRow, borderTop: isDark ? '1px solid #3f3f46' : '1px solid #e4e4e7' }}>
        <div style={styles.controlGroup}>
          <label style={labelStyle}>Batch Size (per tick):</label>
          <select 
            value={batchSize} 
            onChange={(e) => onBatchSizeChange(e.target.value)}
            style={selectStyle}
          >
            <option value={1}>1 log per tick</option>
            <option value={5}>5 logs per tick</option>
            <option value={50}>50 logs per tick</option>
            <option value={100}>100 logs per tick</option>
            <option value={500}>500 logs per tick</option>
            <option value={1000}>1,000 logs per tick</option>
          </select>
        </div>

        <div style={styles.controlGroup}>
          <label style={labelStyle}>Frequency (Interval):</label>
          <select 
            value={pollingInterval} 
            onChange={(e) => onIntervalChange(e.target.value)}
            style={selectStyle}
          >
            <option value={200}>200 ms (Hyper Speed)</option>
            <option value={500}>500 ms (Fast)</option>
            <option value={1000}>1,000 ms (1s)</option>
            <option value={2000}>2,000 ms (2s Standard)</option>
            <option value={5000}>5,000 ms (5s Slow)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0.85rem 1.1rem',
    borderRadius: '6px',
    marginBottom: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease'
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  statusText: {
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  actionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem'
  },
  stressBtn: {
    backgroundColor: '#5d3fd3',
    color: '#ffffff',
    border: 'none',
    padding: '0.45rem 0.85rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem'
  },
  toggleBtn: {
    border: 'none',
    padding: '0.45rem 0.85rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.85rem'
  },
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    paddingTop: '0.65rem',
    flexWrap: 'wrap'
  },
  controlGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  select: {
    padding: '0.35rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    outline: 'none',
    cursor: 'pointer'
  }
};
