// State Reducer for Dashboard Metrics (Pure Reducer Function)

export const initialState = {
  logs: [],
  searchQuery: '',
  selectedLevel: 'all',    // 'all' | 'info' | 'warn' | 'error'
  sortDirection: 'none',   // 'none' | 'desc' | 'asc'
  isPollingActive: true,
  batchSize: 1,           // Number of logs generated per stream tick (1, 5, 50, 100, 10000)
  pollingInterval: 2000,  // Stream tick interval in ms (200ms, 500ms, 1000ms, 2000ms, 5000ms)
};

export function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_LOGS':
      return {
        ...state,
        logs: action.payload
      };

    case 'ADD_LOG':
      return {
        ...state,
        logs: [action.payload, ...state.logs]
      };

    case 'ADD_LOGS_BATCH':
      // Prepend an array batch of logs immutably
      return {
        ...state,
        logs: [...action.payload, ...state.logs]
      };

    case 'TOGGLE_FLAG':
      return {
        ...state,
        logs: state.logs.map(log => 
          log.id === action.payload 
            ? { ...log, flagged: !log.flagged }
            : log
        )
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_LEVEL_FILTER':
      return {
        ...state,
        selectedLevel: action.payload
      };

    case 'SET_SORT_DIRECTION':
      return {
        ...state,
        sortDirection: action.payload
      };

    case 'SET_BATCH_SIZE':
      return {
        ...state,
        batchSize: Number(action.payload)
      };

    case 'SET_POLLING_INTERVAL':
      return {
        ...state,
        pollingInterval: Number(action.payload)
      };

    case 'TOGGLE_POLLING':
      return {
        ...state,
        isPollingActive: !state.isPollingActive
      };

    case 'CLEAR_LOGS':
      return {
        ...state,
        logs: []
      };

    case 'RESET_ALL_FILTERS':
      // Atomic multi-property update: resets search, level, and sort in ONE single pass!
      return {
        ...state,
        searchQuery: '',
        selectedLevel: 'all',
        sortDirection: 'none'
      };

    default:
      return state;
  }
}
