import React, { forwardRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useCameraPermission } from '../hooks/useCameraPermissions';

const CameraView = forwardRef(({ isActive = true }, ref) => {
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');
  const hasPermission = useCameraPermission();

  if (!device || !hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
    </View>
  );
});

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
