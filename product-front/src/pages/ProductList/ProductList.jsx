import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { getProductList } from '../../api/product';
import { Header } from '../../molecules/Header/Header';
import { getSearcherStyles, getListStyles } from './ProductList.styles';
import { ProductCard } from './components/ProductCard';

const QUERY_PRODUCT_LIST = 'queryProductList';

export const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: [QUERY_PRODUCT_LIST],
    queryFn: () => getProductList(),
  });

  React.useEffect(() => {
    setProducts(data);
  }, [data]);

  return !isLoading && !error && products && (
    <Header title='Product List Page'>
      <Box sx={getSearcherStyles()}>
        <Input placeholder='Search' onChange={(evt) => {
          const toSearch = evt.target.value.toLowerCase();
          const filterProducts = data.filter(({brand, model}) => brand.toLowerCase().includes(toSearch) || model.toLowerCase().includes(toSearch))
          setProducts(filterProducts);
        }}/>
      </Box>
      <Box sx={getListStyles()}>
        {products.map(({imgUrl, brand, model, price, id}) => (
          <Link key={id} to={`/${id}`}>
            <ProductCard key={id} imgUrl={imgUrl} brand={brand} model={model} price={price} />
          </Link>
          ))}
      </Box>
    </Header>
  );
  };
