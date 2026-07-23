import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * LazyChart Component (Mock Heavy Visualization Module)
 * Demonstrates: 
 * 1. useContext: Reads global Theme directly from ThemeProvider.
 * 2. Code Splitting & Lazy Loading using React.lazy & Suspense.
 */
export default function LazyChart({ logs }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Aggregate latency data by level
  const stats = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const total = logs.length || 1;
  const infoPercent = Math.round(((stats.info || 0) / total) * 100);
  const warnPercent = Math.round(((stats.warn || 0) / total) * 100);
  const errorPercent = Math.round(((stats.error || 0) / total) * 100);

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDark ? '#1e1e24' : '#ffffff',
    color: isDark ? '#e3e3e6' : '#18181b',
    border: isDark ? '1px solid #27272a' : '1px solid #e4e4e7',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ ...styles.title, color: isDark ? '#ffffff' : '#09090b' }}>
        📊 Live Distribution Visualization (Lazy-Loaded Bundle)
      </h3>
      <p style={{ ...styles.subtitle, color: isDark ? '#a1a1aa' : '#64748b' }}>
        This component was downloaded on-demand as a separate JavaScript bundle chunk via <code>React.lazy()</code>!
      </p>

      <div style={{ ...styles.barWrapper, backgroundColor: isDark ? '#27272a' : '#f1f5f9' }}>
        <div style={{ ...styles.segment, width: `${infoPercent}%`, backgroundColor: '#2563eb' }} title={`Info: ${infoPercent}%`}>
          {infoPercent > 5 && `${infoPercent}% Info`}
        </div>
        <div style={{ ...styles.segment, width: `${warnPercent}%`, backgroundColor: '#d97706' }} title={`Warn: ${warnPercent}%`}>
          {warnPercent > 5 && `${warnPercent}% Warn`}
        </div>
        <div style={{ ...styles.segment, width: `${errorPercent}%`, backgroundColor: '#dc2626' }} title={`Error: ${errorPercent}%`}>
          {errorPercent > 5 && `${errorPercent}% Error`}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.25rem',
    borderRadius: '8px',
    marginTop: '1.5rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease'
  },
  title: {
    fontSize: '1rem',
    marginBottom: '0.2rem'
  },
  subtitle: {
    fontSize: '0.8rem',
    marginBottom: '1rem'
  },
  barWrapper: {
    display: 'flex',
    height: '32px',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  segment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700',
    transition: 'width 0.3s ease'
  }
};
