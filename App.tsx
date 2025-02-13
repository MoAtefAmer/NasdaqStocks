import {SafeAreaView, StyleSheet, Text} from 'react-native';
import useBootSplash from './src/hooks/useBootSplash';

function App(): React.JSX.Element {
  useBootSplash(async () => {
    console.log('Initializing app...');
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App;
