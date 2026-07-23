import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * PerformanceMonitor Widget
 * Demonstrates:
 * 1. useContext: Reads global Theme directly from ThemeProvider.
 * 2. useRef: Counts component render passes without infinite re-render loops.
 */
export default function PerformanceMonitor({ totalLogsCount, filteredLogsCount, isPollingActive }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Use a ref to count how many times this header component renders
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDark ? '#1e1e24' : '#ffffff',
    color: isDark ? '#e3e3e6' : '#18181b',
    border: isDark ? '1px solid #27272a' : '1px solid #e4e4e7',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
  };

  const labelStyle = {
    ...styles.label,
    color: isDark ? '#a0a0ab' : '#71717a'
  };

  return (
    <div style={containerStyle}>
      <div style={styles.statBox}>
        <span style={labelStyle}>Total Dataset:</span>
        <strong style={styles.value}>{totalLogsCount.toLocaleString()} logs</strong>
      </div>

      <div style={styles.statBox}>
        <span style={labelStyle}>Displayed Logs:</span>
        <strong style={styles.value}>{filteredLogsCount.toLocaleString()}</strong>
      </div>

      <div style={styles.statBox}>
        <span style={labelStyle}>Polling Status:</span>
        <span style={{ ...styles.badge, backgroundColor: isPollingActive ? '#2e7d32' : '#c62828' }}>
          {isPollingActive ? 'ACTIVE (Live Stream)' : 'PAUSED'}
        </span>
      </div>

      <div style={styles.statBox}>
        <span style={labelStyle}>Header Render Count:</span>
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
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  },
  label: {
    fontSize: '0.75rem',
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
