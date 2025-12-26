import fetch from 'node-fetch';
import { getCache, setCache } from '../../utils/cache.util.js';

/**
 * OpenMap Service Class
 * Handles fetching and displaying map tiles from OpenStreetMap.
 * Strictly for reading/displaying maps.
 */
class OpenMap {
  constructor() {
    this.baseUrl = 'https://tile.openstreetmap.org';
    this.userAgent = 'WeatherGraphics/1.0 (https://github.com/thetrollingwizard/weather-graphics)';
  }

  /**
   * Get the URL for a specific map tile
   * @param {number} x - X coordinate (column)
   * @param {number} y - Y coordinate (row)
   * @param {number} z - Zoom level
   * @returns {string} Tile URL
   */
  getTileUrl(x, y, z) {
    this._validateCoordinates(x, y, z);
    return `${this.baseUrl}/${z}/${x}/${y}.png`;
  }

  /**
   * Fetch a map tile image
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} z - Zoom level
   * @returns {Promise<Buffer>} Image buffer
   */
  async getTile(x, y, z) {
    this._validateCoordinates(x, y, z);
    const cacheKey = `map_tile_${z}_${x}_${y}`;
    
    // Check cache first
    const cachedTile = getCache(cacheKey);
    if (cachedTile) {
      return cachedTile;
    }

    const url = this.getTileUrl(x, y, z);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tile: ${response.status} ${response.statusText}`);
      }

      const buffer = await response.buffer();
      
      // Cache the tile
      setCache(cacheKey, buffer);
      
      return buffer;
    } catch (error) {
      console.error('OpenMap Error:', error);
      throw error;
    }
  }

  /**
   * Validate tile coordinates
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   * @private
   */
  _validateCoordinates(x, y, z) {
    if (z < 0 || z > 19) {
      throw new Error('Zoom level must be between 0 and 19');
    }
    const maxCoord = Math.pow(2, z) - 1;
    if (x < 0 || x > maxCoord) {
      throw new Error(`X coordinate must be between 0 and ${maxCoord} for zoom level ${z}`);
    }
    if (y < 0 || y > maxCoord) {
      throw new Error(`Y coordinate must be between 0 and ${maxCoord} for zoom level ${z}`);
    }
  }
}

export default OpenMap;
