import {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';

const useBootSplash = (init: () => Promise<void>) => {
  useEffect(() => {
    const initialize = async () => {
      await init();
    };

    initialize().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, [init]);
};

export default useBootSplash;
