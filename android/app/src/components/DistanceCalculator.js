export const calculateDistance = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
};

export const pixelToCm = (pixelDist, dpi = 160, scale = 1.5) => {
  const inch = pixelDist / dpi;
  return inch * 2.54 * scale; // Convert pixels to cm
};
