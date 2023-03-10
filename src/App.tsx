import React from 'react';
import { theme } from 'toons-components';
import GlobalStyles from '@styles/global';
import AppRouter from '@routes/AppRouter';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/root';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
    },
  },
});

function App() {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
