import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

const useBootSplash = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    };

    hideSplashScreen();
  }, []);
};

export default useBootSplash;
