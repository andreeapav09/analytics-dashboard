// Mock Data Generator for High-Volume Server Metrics

const SOURCES = ['Database', 'AuthService', 'Gateway', 'PaymentService', 'CacheNode', 'WorkerPool'];
const LEVELS = ['info', 'warn', 'error'];

const MESSAGES = {
  info: [
    'Connection established with node pool.',
    'User session initialized successfully.',
    'Cache invalidated for user profile query.',
    'Background batch job completed.',
    'Health check ping returned 200 OK.'
  ],
  warn: [
    'High memory utilization detected (>82%).',
    'Rate limit threshold reached for IP client.',
    'Slow database query execution (>250ms).',
    'Connection pool reaching capacity limit.',
    'Retrying failed packet delivery.'
  ],
  error: [
    'Database connection timeout during fetch.',
    'Unhandled rejection in Auth token verification.',
    'Payment gateway returned 502 Bad Gateway.',
    'Failed to allocate memory buffer for payload.',
    'Disk read failure on storage node 4.'
  ]
};

/**
 * Generates a single metric log object
 */
export function generateSingleLog(index = Date.now()) {
  const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const messageList = MESSAGES[level];
  const message = messageList[Math.floor(Math.random() * messageList.length)];
  
  // Random latency between 5ms and 850ms
  const latency = Math.floor(Math.random() * 845) + 5;

  return {
    id: `log-${index}-${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
    source,
    level,
    message,
    latency,
    flagged: false
  };
}

/**
 * Generates an array of N metric logs (default 10,000)
 */
export function generateInitialLogs(count = 10000) {
  const logs = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    // Stagger timestamps slightly for realism
    const timeOffset = (count - i) * 100;
    const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];
    const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
    const messageList = MESSAGES[level];
    const message = messageList[Math.floor(Math.random() * messageList.length)];
    const latency = Math.floor(Math.random() * 845) + 5;

    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(now - timeOffset).toISOString(),
      source,
      level,
      message,
      latency,
      flagged: false
    });
  }

  return logs;
}
