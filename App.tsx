import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/client/queryClient';
import Explore from './src/screens/Explore';
import useBootSplash from './src/hooks/useBootSplash';

const App = (): React.JSX.Element => {
  useBootSplash();
  return (
    <QueryClientProvider client={queryClient}>
      <Explore />
    </QueryClientProvider>
  );
};

export default App;
