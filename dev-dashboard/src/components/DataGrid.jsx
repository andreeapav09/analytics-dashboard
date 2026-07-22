import React, { useMemo, useCallback } from 'react';
import LogRow from './LogRow';

/**
 * DataGrid Component (High Performance List)
 * Demonstrates:
 * 1. useMemo: Caches the filtered and sorted 10,000 logs so expensive loops don't run on every render pass.
 * 2. useCallback: Caches the handleToggleFlag callback function reference so React.memo on LogRow works properly.
 * 3. key prop: Uses log.id (unique identifier) for reconciliation performance.
 */
export default function DataGrid({ 
  logs, 
  searchQuery, 
  selectedLevel, 
  sortDirection, 
  onToggleFlag,
  onSearchChange,
  onLevelChange,
  onSortChange
}) {

  // 1. USEMEMO: Filter and Sort 10,000 items ONLY when relevant dependencies change!
  const processedLogs = useMemo(() => {
    const startTime = performance.now();
    console.log(`[useMemo] Calculating filtered/sorted logs across ${logs.length} items...`);

    let result = logs;

    // Filter by Level
    if (selectedLevel !== 'all') {
      result = result.filter(log => log.level === selectedLevel);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.message.toLowerCase().includes(query) || 
        log.source.toLowerCase().includes(query) ||
        log.id.toLowerCase().includes(query)
      );
    }

    // Sort by Latency
    if (sortDirection !== 'none') {
      result = [...result].sort((a, b) => {
        return sortDirection === 'desc' 
          ? b.latency - a.latency 
          : a.latency - b.latency;
      });
    }

    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`[useMemo] Completed filtering ${result.length} items in ${duration}ms`);

    return result;
  }, [logs, searchQuery, selectedLevel, sortDirection]);

  // 2. USECALLBACK: Lock down memory reference for action callback passed to LogRow
  const handleToggleFlagCallback = useCallback((id) => {
    onToggleFlag(id);
  }, [onToggleFlag]);

  return (
    <div style={styles.container}>
      {/* Controls Bar */}
      <div style={styles.controlsBar}>
        <div style={styles.searchBox}>
          <input 
            type="text"
            placeholder="Search logs by message, source, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Level:</label>
          <select 
            value={selectedLevel} 
            onChange={(e) => onLevelChange(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Latency Sort:</label>
          <select 
            value={sortDirection} 
            onChange={(e) => onSortChange(e.target.value)}
            style={styles.select}
          >
            <option value="none">Default Order</option>
            <option value="desc">Highest First (Slowest)</option>
            <option value="asc">Lowest First (Fastest)</option>
          </select>
        </div>
      </div>

      {/* Grid Headers */}
      <div style={styles.headerRow}>
        <span>Time</span>
        <span>Source</span>
        <span>Level</span>
        <span>Message</span>
        <span style={{ textAlign: 'right' }}>Latency</span>
        <span style={{ textAlign: 'center' }}>Render Pass</span>
        <span style={{ textAlign: 'right' }}>Action</span>
      </div>

      {/* Log List Rendering */}
      <div style={styles.listContainer}>
        {processedLogs.length === 0 ? (
          <div style={styles.emptyState}>No matching logs found.</div>
        ) : (
          // Display up to 100 visible items for DOM rendering performance, while processing 10,000
          processedLogs.slice(0, 100).map(log => (
            <LogRow 
              key={log.id} // Unique Key Prop for Fiber Reconciliation
              log={log} 
              onToggleFlag={handleToggleFlagCallback} // Memoized callback
            />
          ))
        )}
      </div>
      
      {processedLogs.length > 100 && (
        <div style={styles.footerNote}>
          Showing top 100 of {processedLogs.length.toLocaleString()} matching logs (DOM slice windowing).
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e24',
    padding: '1.25rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginBottom: '1.5rem'
  },
  controlsBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1rem',
    alignItems: 'center'
  },
  searchBox: {
    flex: '1 1 250px'
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem 0.8rem',
    borderRadius: '4px',
    border: '1px solid #3f3f46',
    backgroundColor: '#18181b',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  label: {
    fontSize: '0.85rem',
    color: '#a1a1aa',
    fontWeight: '500'
  },
  select: {
    padding: '0.5rem 0.7rem',
    borderRadius: '4px',
    border: '1px solid #3f3f46',
    backgroundColor: '#18181b',
    color: '#ffffff',
    fontSize: '0.85rem',
    outline: 'none',
    cursor: 'pointer'
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: '90px 130px 90px 1fr 100px 90px 100px',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#27272a',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '0.8rem',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  listContainer: {
    maxHeight: '520px',
    overflowY: 'auto'
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    color: '#71717a'
  },
  footerNote: {
    marginTop: '0.75rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#71717a'
  }
};
