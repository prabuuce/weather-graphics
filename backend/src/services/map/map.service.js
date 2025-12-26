import OpenMap from './openmap.js';

const mapService = new OpenMap();

/**
 * Get a map tile for the given coordinates and zoom level
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} z - Zoom level
 * @returns {Promise<Buffer|Object>} Image buffer or error object
 */
export async function GetMapTile(x, y, z) {
  try {
    // Ensure inputs are numbers
    const xNum = parseInt(x, 10);
    const yNum = parseInt(y, 10);
    const zNum = parseInt(z, 10);

    if (isNaN(xNum) || isNaN(yNum) || isNaN(zNum)) {
        return {
            error: 'Invalid coordinates',
            message: 'Coordinates and zoom level must be valid numbers'
        };
    }

    const tile = await mapService.getTile(xNum, yNum, zNum);
    return tile;
  } catch (error) {
    return {
      error: 'Failed to fetch map tile',
      message: error.message
    };
  }
}
