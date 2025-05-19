import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import CameraView from '../components/CameraView';

export const MeasureScreen = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [points, setPoints] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const scale = 0.00175; // 1 pixel = 0.00175 feet (adjust based on calibration)

  const handleTap = (e) => {
    const { locationX: x, locationY: y } = e.nativeEvent;
    const newPoints = [...points, { x, y }];

    if (newPoints.length <= 4) {
      setPoints(newPoints);

      if (newPoints.length === 4) {
        const minX = Math.min(...newPoints.map((p) => p.x));
        const maxX = Math.max(...newPoints.map((p) => p.x));
        const minY = Math.min(...newPoints.map((p) => p.y));
        const maxY = Math.max(...newPoints.map((p) => p.y));

        const widthPx = maxX - minX;
        const heightPx = maxY - minY;

        const widthFt = widthPx * scale;
        const heightFt = heightPx * scale;

        setDimensions({
          width: parseFloat(widthFt.toFixed(2)),
          height: parseFloat(heightFt.toFixed(2)),
        });
      }
    }
  };

  const handleClear = () => {
    setPoints([]);
    setDimensions({ width: 0, height: 0 });
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView />
      <TouchableOpacity style={styles.overlay} onPress={handleTap} />

      {points.map((pt, idx) => (
        <View key={idx} style={[styles.dot, { left: pt.x - 6, top: pt.y - 6 }]} />
      ))}

      {points.length === 4 && (
        <View
          style={[
            styles.rectangle,
            {
              left: Math.min(...points.map((p) => p.x)),
              top: Math.min(...points.map((p) => p.y)),
              width: Math.max(...points.map((p) => p.x)) - Math.min(...points.map((p) => p.x)),
              height: Math.max(...points.map((p) => p.y)) - Math.min(...points.map((p) => p.y)),
            },
          ]}
        />
      )}

      <Text style={styles.text}>
        Width: {dimensions.width.toFixed(2)} ft{'\n'}
        Height: {dimensions.height.toFixed(2)} ft
      </Text>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'red',
    borderRadius: 6,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    padding: 10,
    borderRadius: 8,
  },
  clearButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MeasureScreen;
