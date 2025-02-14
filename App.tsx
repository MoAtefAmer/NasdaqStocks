import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/client/ReactQueryClient';
import ExploreScreen from './src/screens/Explore';
import useBootSplash from './src/hooks/useBootSplash';

const App = (): React.JSX.Element => {
  useBootSplash();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <ExploreScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

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
