import React, { useRef } from 'react';

/**
 * LogRow Component
 * Demonstrates:
 * 1. React.memo: Only re-renders if log or onToggleFlag props change!
 * 2. Destructured props ({ log, onToggleFlag })
 * 3. useRef to track row render passes visually
 */
const LogRow = React.memo(function LogRow({ log, onToggleFlag }) {
  // Use a ref to count how many times THIS specific row rendered
  const rowRenderCountRef = useRef(1);
  rowRenderCountRef.current += 1;

  const levelColors = {
    info: '#2563eb',
    warn: '#d97706',
    error: '#dc2626'
  };

  return (
    <div style={{ ...styles.row, borderLeft: `4px solid ${levelColors[log.level] || '#9ca3af'}` }}>
      <div style={styles.cellTimestamp}>
        {new Date(log.timestamp).toLocaleTimeString()}
      </div>

      <div style={styles.cellSource}>
        <span style={styles.sourceTag}>{log.source}</span>
      </div>

      <div style={styles.cellLevel}>
        <span style={{ ...styles.levelBadge, backgroundColor: levelColors[log.level] }}>
          {log.level.toUpperCase()}
        </span>
      </div>

      <div style={styles.cellMessage}>
        {log.message}
      </div>

      <div style={styles.cellLatency}>
        <span style={{ color: log.latency > 500 ? '#ef4444' : '#10b981', fontWeight: '600' }}>
          {log.latency} ms
        </span>
      </div>

      <div style={styles.cellRenderCount}>
        <span style={styles.renderPill} title="Number of times this row re-rendered">
          renders: {rowRenderCountRef.current}
        </span>
      </div>

      <div style={styles.cellActions}>
        <button 
          onClick={() => onToggleFlag(log.id)}
          style={{
            ...styles.flagButton,
            backgroundColor: log.flagged ? '#fbbf24' : '#3f3f46',
            color: log.flagged ? '#000000' : '#ffffff'
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
    backgroundColor: '#18181b',
    padding: '0.6rem 1rem',
    borderRadius: '4px',
    marginBottom: '0.4rem',
    fontSize: '0.85rem',
    color: '#f4f4f5',
    transition: 'background-color 0.15s ease'
  },
  cellTimestamp: {
    color: '#a1a1aa',
    fontFamily: 'monospace'
  },
  cellSource: {
    fontWeight: '500'
  },
  sourceTag: {
    backgroundColor: '#27272a',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    color: '#d4d4d8'
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
    color: '#e4e4e7',
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
    color: '#a1a1aa',
    backgroundColor: '#27272a',
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
