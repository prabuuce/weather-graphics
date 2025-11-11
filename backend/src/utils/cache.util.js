/**
 * Cache Utility
 * 
 * Example cache implementation for business logic.
 * You can replace this with Redis, Memcached, or another caching solution.
 */

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {Object|null} Cached data or null if expired/not found
 */
export function getCache(key) {
  const cached = cache.get(key);
  
  if (!cached) {
    return null;
  }
  
  // Check if cache is expired
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

/**
 * Set cache data
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 */
export function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Clear cache for a key
 * @param {string} key - Cache key
 */
export function clearCache(key) {
  cache.delete(key);
}

/**
 * Clear all cache
 */
export function clearAllCache() {
  cache.clear();
}

