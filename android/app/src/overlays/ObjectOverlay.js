import { View, Text, StyleSheet } from 'react-native';

const ObjectOverlay = ({ widthCm, heightCm }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>Width: {widthCm.toFixed(2)} cm</Text>
      <Text style={styles.text}>Height: {heightCm.toFixed(2)} cm</Text>
    </View>
  );
};

export default ObjectOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
  },
});
