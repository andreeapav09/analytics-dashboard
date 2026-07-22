// State Reducer for Dashboard Metrics (Pure Reducer Function)

export const initialState = {
  logs: [],
  searchQuery: '',
  selectedLevel: 'all',    // 'all' | 'info' | 'warn' | 'error'
  sortDirection: 'none',   // 'none' | 'desc' | 'asc'
  isPollingActive: true,
};

export function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_LOGS':
      return {
        ...state,
        logs: action.payload
      };

    case 'ADD_LOG':
      // Prepend new log to top of list
      return {
        ...state,
        logs: [action.payload, ...state.logs]
      };

    case 'TOGGLE_FLAG':
      // Immutably update the flagged property of a specific log item
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

    default:
      return state;
  }
}
