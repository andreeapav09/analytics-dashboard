import React from 'react';

/**
 * LazyChart Component (Mock Heavy Visualization Module)
 * Demonstrates: Code Splitting & Lazy Loading using React.lazy & Suspense
 */
export default function LazyChart({ logs }) {
  // Aggregate latency data by level
  const stats = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const total = logs.length || 1;
  const infoPercent = Math.round(((stats.info || 0) / total) * 100);
  const warnPercent = Math.round(((stats.warn || 0) / total) * 100);
  const errorPercent = Math.round(((stats.error || 0) / total) * 100);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📊 Live Distribution Visualization (Lazy-Loaded Bundle)</h3>
      <p style={styles.subtitle}>
        This component was downloaded on-demand as a separate JavaScript bundle chunk via <code>React.lazy()</code>!
      </p>

      <div style={styles.barWrapper}>
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
    backgroundColor: '#1e1e24',
    padding: '1.25rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginTop: '1.5rem'
  },
  title: {
    fontSize: '1rem',
    color: '#ffffff',
    marginBottom: '0.2rem'
  },
  subtitle: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
    marginBottom: '1rem'
  },
  barWrapper: {
    display: 'flex',
    height: '32px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#27272a'
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
