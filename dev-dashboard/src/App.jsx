import React, { useReducer, useEffect, lazy, Suspense, useCallback } from 'react';
import { dashboardReducer, initialState } from './state/dashboardReducer';
import { generateInitialLogs } from './utils/mockData';
import PerformanceMonitor from './components/PerformanceMonitor';
import LiveMetricPoller from './components/LiveMetricPoller';
import DataGrid from './components/DataGrid';

// 1. LAZY LOADING: Dynamically import LazyChart bundle chunk
const LazyChart = lazy(() => import('./components/LazyChart'));

export default function App() {
  // 2. USEREDUCER: Initialize complex state engine
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load 10,000 logs on initial mount
  useEffect(() => {
    console.log('Generating initial 10,000 metric logs...');
    const initialLogs = generateInitialLogs(10000);
    dispatch({ type: 'SET_INITIAL_LOGS', payload: initialLogs });
  }, []);

  // Dispatch Handlers (Memoized with useCallback for reference stability)
  const handleNewLog = useCallback((newLog) => {
    dispatch({ type: 'ADD_LOG', payload: newLog });
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

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>⚡ MetricsStream Dashboard</h1>
          <p style={styles.subtitle}>
            High-Performance React Data Analytics Engine (10,000+ Records)
          </p>
        </div>
      </header>

      {/* Widget 1: Performance Render Counter */}
      <PerformanceMonitor 
        totalLogsCount={state.logs.length}
        filteredLogsCount={state.logs.length}
        isPollingActive={state.isPollingActive}
      />

      {/* Widget 2: Live Poller (useEffect + useRef + Cleanup) */}
      <LiveMetricPoller 
        isPollingActive={state.isPollingActive}
        onNewLog={handleNewLog}
        onTogglePolling={handleTogglePolling}
      />

      {/* Widget 3: Data Grid (useMemo + React.memo + useCallback) */}
      <DataGrid 
        logs={state.logs}
        searchQuery={state.searchQuery}
        selectedLevel={state.selectedLevel}
        sortDirection={state.sortDirection}
        onToggleFlag={handleToggleFlag}
        onSearchChange={handleSearchChange}
        onLevelChange={handleLevelChange}
        onSortChange={handleSortChange}
      />

      {/* Widget 4: Lazy Loaded Component (React.lazy + Suspense) */}
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
    backgroundColor: '#121214',
    minHeight: '100vh',
    color: '#e3e3e6'
  },
  header: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #27272a',
    paddingBottom: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    marginTop: '0.3rem'
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
