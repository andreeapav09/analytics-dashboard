import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * LogRow Component
 * Demonstrates:
 * 1. useContext: Reads global Theme directly from ThemeProvider.
 * 2. React.memo: Only re-renders if log or onToggleFlag props change!
 * 3. Destructured props ({ log, onToggleFlag })
 * 4. useRef to track row render passes visually (starts at 0)
 */
const LogRow = React.memo(function LogRow({ log, onToggleFlag }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Use a ref to count how many times THIS specific row rendered (starts at 0)
  const rowRenderCountRef = useRef(0);
  rowRenderCountRef.current += 1;

  const levelColors = {
    info: '#2563eb',
    warn: '#d97706',
    error: '#dc2626'
  };

  const rowStyle = {
    ...styles.row,
    backgroundColor: isDark ? '#18181b' : '#f8fafc',
    color: isDark ? '#f4f4f5' : '#0f172a',
    borderLeft: `4px solid ${levelColors[log.level] || '#9ca3af'}`,
    borderBottom: isDark ? '1px solid #27272a' : '1px solid #e2e8f0'
  };

  const sourceTagStyle = {
    ...styles.sourceTag,
    backgroundColor: isDark ? '#27272a' : '#e2e8f0',
    color: isDark ? '#d4d4d8' : '#334155'
  };

  const renderPillStyle = {
    ...styles.renderPill,
    backgroundColor: isDark ? '#27272a' : '#e2e8f0',
    color: isDark ? '#a1a1aa' : '#64748b'
  };

  return (
    <div style={rowStyle}>
      <div style={styles.cellTimestamp}>
        {new Date(log.timestamp).toLocaleTimeString()}
      </div>

      <div style={styles.cellSource}>
        <span style={sourceTagStyle}>{log.source}</span>
      </div>

      <div style={styles.cellLevel}>
        <span style={{ ...styles.levelBadge, backgroundColor: levelColors[log.level] }}>
          {log.level.toUpperCase()}
        </span>
      </div>

      <div style={{ ...styles.cellMessage, color: isDark ? '#e4e4e7' : '#1e293b' }}>
        {log.message}
      </div>

      <div style={styles.cellLatency}>
        <span style={{ color: log.latency > 500 ? '#ef4444' : '#10b981', fontWeight: '600' }}>
          {log.latency} ms
        </span>
      </div>

      <div style={styles.cellRenderCount}>
        <span style={renderPillStyle} title="Number of times this row re-rendered">
          renders: {rowRenderCountRef.current}
        </span>
      </div>

      <div style={styles.cellActions}>
        <button 
          onClick={() => onToggleFlag(log.id)}
          style={{
            ...styles.flagButton,
            backgroundColor: log.flagged ? '#fbbf24' : (isDark ? '#3f3f46' : '#cbd5e1'),
            color: log.flagged ? '#000000' : (isDark ? '#ffffff' : '#0f172a')
          }}
        >
          {log.flagged ? '★ Flagged' : '☆ Flag'}
        </button>
      </div>
    </div>
  );
});

export default LogRow;

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: '90px 130px 90px 1fr 100px 90px 100px',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 1rem',
    borderRadius: '4px',
    marginBottom: '0.4rem',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  },
  cellTimestamp: {
    fontFamily: 'monospace'
  },
  cellSource: {
    fontWeight: '500'
  },
  sourceTag: {
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem'
  },
  cellLevel: {},
  levelBadge: {
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    letterSpacing: '0.05em'
  },
  cellMessage: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cellLatency: {
    textAlign: 'right'
  },
  cellRenderCount: {
    textAlign: 'center'
  },
  renderPill: {
    fontSize: '0.7rem',
    padding: '0.15rem 0.4rem',
    borderRadius: '10px'
  },
  cellActions: {
    textAlign: 'right'
  },
  flagButton: {
    border: 'none',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '600'
  }
};
