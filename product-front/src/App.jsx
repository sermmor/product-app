import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList/ProductList';
import { ProductItem } from './pages/ProductItem/ProductItem';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});


const App = () => {
  return <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={<ProductList />}/>
          <Route
            path={':id'}
            element={<ProductItem />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  </QueryClientProvider>;
}

export default App
