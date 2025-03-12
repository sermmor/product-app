import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getProductItem, addProductItem } from '../../api/product';
import { Header } from '../../molecules/Header/Header';
import { getItemStyles } from './ProductItem.styles';

const QUERY_PRODUCT_ITEM = 'queryProductItem';

const excludeDetails = ['id', 'imgUrl'];

const formatDetail = (detail) => {
  if (typeof detail === 'string') {
    return detail;
  }
  if (Array.isArray(detail)) {
    return <ul>
      {detail.map((value, index) => <li key={index}>{formatDetail(value)}</li>)}
    </ul>;
  }
  if (typeof detail === 'object') {
    return <ul>
      {Object.keys(detail).map((key) => <li key={key}>{key}: {formatDetail(detail[key])}</li>)}
    </ul>;
  }
  return JSON.stringify(detail, null, 2);
};

export const ProductItem = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isErrorSnackbar, setErrorSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const onCloseSnackBar = (_, reason) => reason === 'clickaway' || setOpenSnackbar(false);
  const { id } = useParams();

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: [QUERY_PRODUCT_ITEM],
    queryFn: () => getProductItem(id),
  });
  
  return !isLoading && !error && (
    <Header title={`${data.brand} ${data.model}`}>
      <Box sx={getItemStyles()}>
          <img
            src={data.imgUrl}
            title={data.model}
            alt={data.model}
            loading='lazy'
          />
        <Box>
          <ul>
            {Object.keys(data).filter(keyDetail => !excludeDetails.includes(keyDetail)).map(keyDetail => (
              <li key={keyDetail}>{keyDetail}: {formatDetail(data[keyDetail])}</li>
            ))}
          </ul>
          <Box>
            <Button variant="contained" onClick={async() => {
              const result = await addProductItem(data.id, data.options.colors[0].code, data.options.storages[0].code)
              if (result && result.count > 0) {
                setSnackBarMessage('Product added to the cart.');
                setErrorSnackbar(false);
                setOpenSnackbar(true);
              } else {
                setSnackBarMessage('There was a error to add product to the card.');
                setErrorSnackbar(true);
                setOpenSnackbar(true);
              }
            }}>Add Product</Button>
          </Box>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={onCloseSnackBar} key={'topcenter'}>
        <MuiAlert onClose={onCloseSnackBar} severity={isErrorSnackbar ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackBarMessage}
        </MuiAlert>
      </Snackbar>
    </Header>
  );
};
