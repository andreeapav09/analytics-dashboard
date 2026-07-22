import React, { useRef } from 'react';

/**
 * PerformanceMonitor Widget
 * Uses a ref to visually count total component renders without causing re-renders itself!
 */
export default function PerformanceMonitor({ totalLogsCount, filteredLogsCount, isPollingActive }) {
  // Use a ref to count how many times this component renders
  const renderCountRef = useRef(1);
  
  // Mutate ref on each render pass
  renderCountRef.current += 1;

  return (
    <div style={styles.container}>
      <div style={styles.statBox}>
        <span style={styles.label}>Total Dataset:</span>
        <strong style={styles.value}>{totalLogsCount.toLocaleString()} logs</strong>
      </div>

      <div style={styles.statBox}>
        <span style={styles.label}>Displayed Logs:</span>
        <strong style={styles.value}>{filteredLogsCount.toLocaleString()}</strong>
      </div>

      <div style={styles.statBox}>
        <span style={styles.label}>Polling Status:</span>
        <span style={{ ...styles.badge, backgroundColor: isPollingActive ? '#2e7d32' : '#c62828' }}>
          {isPollingActive ? 'ACTIVE (Live Stream)' : 'PAUSED'}
        </span>
      </div>

      <div style={styles.statBox}>
        <span style={styles.label}>Header Render Count:</span>
        <span style={styles.renderBadge}>
          ⚡ {renderCountRef.current} renders
        </span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    backgroundColor: '#1e1e24',
    color: '#e3e3e6',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifycss: 'space-between'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  },
  label: {
    fontSize: '0.75rem',
    color: '#a0a0ab',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  value: {
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  badge: {
    fontSize: '0.8rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    color: '#ffffff',
    fontWeight: '600',
    display: 'inline-block'
  },
  renderBadge: {
    fontSize: '0.9rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    backgroundColor: '#5d3fd3',
    color: '#ffffff',
    fontWeight: '600'
  }
};
