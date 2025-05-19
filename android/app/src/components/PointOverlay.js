import { View, StyleSheet, TouchableOpacity } from 'react-native';

export const PointOverlay = ({ points, onTapPoint }) => {
  const renderPoints = () => {
    return points.map((point, index) => (
      <View
        key={index}
        style={[
          styles.point,
          { top: point.y, left: point.x },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {renderPoints()}
      {points.length < 4 && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={(e) => {
            const { locationX, locationY } = e.nativeEvent;
            onTapPoint(locationX, locationY);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  point: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
