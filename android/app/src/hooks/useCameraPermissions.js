import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission(); // Returns 'granted', 'denied', etc.
      setHasPermission(permission === 'granted'); // Check directly against 'granted'
    })();
  }, []);

  return hasPermission;
};
