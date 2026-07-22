import React, { useState, useMemo, useCallback } from 'react';
import LogRow from './LogRow';

/**
 * DataGrid Component (High Performance List with Local Pagination State)
 * Demonstrates:
 * 1. useMemo: Caches filtered/sorted logs across 10,000 items and computes paginated slice.
 * 2. useCallback: Caches handleToggleFlag callback for LogRow React.memo performance.
 * 3. useState: Local component state for currentPage and pageSize.
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
  // Local UI State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // 1. USEMEMO: Filter and Sort 10,000 items ONLY when dependencies change
  const processedLogs = useMemo(() => {
    const startTime = performance.now();
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

    // Sort by Latency (Strict Immutability with Shallow Copy [...result])
    if (sortDirection !== 'none') {
      result = [...result].sort((a, b) => {
        return sortDirection === 'desc' 
          ? b.latency - a.latency 
          : a.latency - b.latency;
      });
    }

    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`[useMemo] Filtered & sorted ${result.length} items in ${duration}ms`);

    return result;
  }, [logs, searchQuery, selectedLevel, sortDirection]);

  // Calculate Pagination bounds safely
  const totalPages = Math.ceil(processedLogs.length / pageSize) || 1;
  const safePage = Math.min(currentPage, totalPages);

  // 2. USEMEMO: Slice the active page items efficiently
  const paginatedLogs = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return processedLogs.slice(startIndex, startIndex + pageSize);
  }, [processedLogs, safePage, pageSize]);

  // Reset to page 1 when search or filter values change
  const handleSearchInputChange = (value) => {
    setCurrentPage(1);
    onSearchChange(value);
  };

  const handleLevelSelectChange = (value) => {
    setCurrentPage(1);
    onLevelChange(value);
  };

  const handlePageSizeSelectChange = (size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  // 3. USECALLBACK: Lock down memory reference for LogRow callback
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
            onChange={(e) => handleSearchInputChange(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Level:</label>
          <select 
            value={selectedLevel} 
            onChange={(e) => handleLevelSelectChange(e.target.value)}
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

        <div style={styles.filterGroup}>
          <label style={styles.label}>Page Size:</label>
          <select 
            value={pageSize} 
            onChange={(e) => handlePageSizeSelectChange(e.target.value)}
            style={styles.select}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
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
        {paginatedLogs.length === 0 ? (
          <div style={styles.emptyState}>No matching logs found.</div>
        ) : (
          paginatedLogs.map(log => (
            <LogRow 
              key={log.id} 
              log={log} 
              onToggleFlag={handleToggleFlagCallback} 
            />
          ))
        )}
      </div>
      
      {/* Pagination Footer Controls */}
      <div style={styles.paginationBar}>
        <div style={styles.pageStats}>
          Showing <strong>{processedLogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1}</strong> to <strong>{Math.min(safePage * pageSize, processedLogs.length)}</strong> of <strong>{processedLogs.length.toLocaleString()}</strong> logs
        </div>

        <div style={styles.pageButtons}>
          <button 
            disabled={safePage <= 1} 
            onClick={() => setCurrentPage(1)}
            style={{ ...styles.pageBtn, opacity: safePage <= 1 ? 0.4 : 1 }}
          >
            « First
          </button>
          <button 
            disabled={safePage <= 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ ...styles.pageBtn, opacity: safePage <= 1 ? 0.4 : 1 }}
          >
            ‹ Prev
          </button>

          <span style={styles.pageIndicator}>
            Page {safePage} of {totalPages}
          </span>

          <button 
            disabled={safePage >= totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ ...styles.pageBtn, opacity: safePage >= totalPages ? 0.4 : 1 }}
          >
            Next ›
          </button>
          <button 
            disabled={safePage >= totalPages} 
            onClick={() => setCurrentPage(totalPages)}
            style={{ ...styles.pageBtn, opacity: safePage >= totalPages ? 0.4 : 1 }}
          >
            Last »
          </button>
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
    marginBottom: '1.5rem'
  },
  controlsBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: '0.75rem',
    marginBottom: '1rem',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box'
  },
  searchBox: {
    flex: '1 1 auto',
    minWidth: '180px'
  },
  searchInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.45rem 0.7rem',
    borderRadius: '4px',
    border: '1px solid #3f3f46',
    backgroundColor: '#18181b',
    color: '#ffffff',
    fontSize: '0.85rem',
    outline: 'none'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  label: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
    fontWeight: '500'
  },
  select: {
    padding: '0.45rem 0.6rem',
    borderRadius: '4px',
    border: '1px solid #3f3f46',
    backgroundColor: '#18181b',
    color: '#ffffff',
    fontSize: '0.8rem',
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
    minHeight: '280px',
    maxHeight: '520px',
    overflowY: 'auto'
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    color: '#71717a'
  },
  paginationBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '0.8rem',
    borderTop: '1px solid #27272a',
    gap: '1rem'
  },
  pageStats: {
    fontSize: '0.85rem',
    color: '#a1a1aa'
  },
  pageButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  pageBtn: {
    backgroundColor: '#27272a',
    border: '1px solid #3f3f46',
    color: '#ffffff',
    padding: '0.35rem 0.7rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  pageIndicator: {
    fontSize: '0.85rem',
    color: '#e4e4e7',
    fontWeight: '600',
    padding: '0 0.4rem'
  }
};
