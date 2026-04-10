/**
 * Get color based on speed value position between min and max
 * @param {number} speed - Current value
 * @param {number} minSpeed - Minimum scale value
 * @param {number} maxSpeed - Maximum scale value
 * @returns {string} Hex color string
 */
export const getSpeedColor = (speed, minSpeed, maxSpeed) => {
  const percentage = ((speed - minSpeed) / (maxSpeed - minSpeed)) * 100;

  if (percentage <= 33) {
    return '#22c55e'; // green
  } else if (percentage <= 66) {
    return '#eab308'; // yellow
  } else {
    return '#ef4444'; // red
  }
};

export default getSpeedColor;
