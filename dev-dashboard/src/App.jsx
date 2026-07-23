import React, { useReducer, useEffect, lazy, Suspense, useCallback } from 'react';
import { dashboardReducer, initialState } from './state/dashboardReducer';
import { generateInitialLogs, generateLogBatch } from './utils/mockData';
import PerformanceMonitor from './components/PerformanceMonitor';
import LiveMetricPoller from './components/LiveMetricPoller';
import DataGrid from './components/DataGrid';
import { useTheme } from './context/ThemeContext';

// LAZY LOADING: Dynamically import LazyChart bundle chunk
const LazyChart = lazy(() => import('./components/LazyChart'));

export default function App() {
  // Global Theme Context Hook (useContext)
  const { theme, toggleTheme } = useTheme();

  // Initialize useReducer state engine
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load initial 10,000 logs on mount
  useEffect(() => {
    console.log('Generating initial 10,000 metric logs...');
    const initialLogs = generateInitialLogs(10000);
    dispatch({ type: 'SET_INITIAL_LOGS', payload: initialLogs });
  }, []);

  // Dispatch Handlers (Memoized with useCallback for referential stability)
  const handleNewLogsBatch = useCallback((newBatch) => {
    dispatch({ type: 'ADD_LOGS_BATCH', payload: newBatch });
  }, []);

  const handleToggleFlag = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FLAG', payload: id });
  }, []);

  const handleTogglePolling = useCallback(() => {
    dispatch({ type: 'TOGGLE_POLLING' });
  }, []);

  const handleSearchChange = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const handleLevelChange = useCallback((level) => {
    dispatch({ type: 'SET_LEVEL_FILTER', payload: level });
  }, []);

  const handleSortChange = useCallback((sortDir) => {
    dispatch({ type: 'SET_SORT_DIRECTION', payload: sortDir });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: 'RESET_ALL_FILTERS' });
  }, []);

  const handleBatchSizeChange = useCallback((size) => {
    dispatch({ type: 'SET_BATCH_SIZE', payload: size });
  }, []);

  const handleIntervalChange = useCallback((ms) => {
    dispatch({ type: 'SET_POLLING_INTERVAL', payload: ms });
  }, []);

  // Instant +10,000 Stress Test Injection Handler
  const handleInjectStressBatch = useCallback(() => {
    console.log('Injecting +10,000 stress test logs into memory...');
    const stressBatch = generateLogBatch(10000);
    dispatch({ type: 'ADD_LOGS_BATCH', payload: stressBatch });
  }, []);

  // Dynamic Theme Styles
  const containerStyle = {
    ...styles.appContainer,
    backgroundColor: theme === 'dark' ? '#121214' : '#f4f4f8',
    color: theme === 'dark' ? '#e3e3e6' : '#18181b'
  };

  const titleStyle = {
    ...styles.title,
    color: theme === 'dark' ? '#ffffff' : '#09090b'
  };

  return (
    <div style={containerStyle}>
      <header style={styles.header}>
        <div>
          <h1 style={titleStyle}>⚡ MetricsStream Dashboard</h1>
          <p style={styles.subtitle}>
            High-Performance React Data Analytics Engine (10,000+ Records)
          </p>
        </div>

        {/* Global Context Consumer Button (useContext) */}
        <button onClick={toggleTheme} style={styles.themeToggleBtn}>
          {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
        </button>
      </header>

      {/* Widget 1: Performance Render Counter */}
      <PerformanceMonitor 
        totalLogsCount={state.logs.length}
        filteredLogsCount={state.logs.length}
        isPollingActive={state.isPollingActive}
      />

      {/* Widget 2: Live Streaming Poller with Dynamic Controls & Stress Button */}
      <LiveMetricPoller 
        isPollingActive={state.isPollingActive}
        pollingInterval={state.pollingInterval}
        batchSize={state.batchSize}
        onNewLogsBatch={handleNewLogsBatch}
        onTogglePolling={handleTogglePolling}
        onIntervalChange={handleIntervalChange}
        onBatchSizeChange={handleBatchSizeChange}
        onInjectStressBatch={handleInjectStressBatch}
      />

      {/* Widget 3: Data Grid with Pagination */}
      <DataGrid 
        logs={state.logs}
        searchQuery={state.searchQuery}
        selectedLevel={state.selectedLevel}
        sortDirection={state.sortDirection}
        onToggleFlag={handleToggleFlag}
        onSearchChange={handleSearchChange}
        onLevelChange={handleLevelChange}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      {/* Widget 4: Lazy Loaded Component */}
      <Suspense fallback={<div style={styles.suspenseLoader}>Loading Chart Bundle Chunk...</div>}>
        <LazyChart logs={state.logs} />
      </Suspense>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #27272a',
    paddingBottom: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: 0
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    marginTop: '0.3rem'
  },
  themeToggleBtn: {
    backgroundColor: '#3f3f46',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem'
  },
  suspenseLoader: {
    backgroundColor: '#1e1e24',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#a1a1aa',
    fontSize: '0.9rem',
    marginTop: '1.5rem'
  }
};
