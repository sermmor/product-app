import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const port = 5000;

const similarIdEndpoint = '/product/:productId/similar';

const app = express();
app.use(express.json())
app.use(cors());

const getProductsIds = async(productId) => {
  const response = await fetch(`http://localhost:3001/product/${productId}/similarids`,{
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data;
};

const getProduct = async(productId) => {
  const response = await fetch(`http://localhost:3001/product/${productId}`,{
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data;
};

const getSimilarProducts = async(productIds) => {
  const similarProducts = [];
  let product;

  for (let i = 0; i < productIds.length; i++) {
    product = await getProduct(productIds[i]);
    similarProducts.push(product);
  }
  return similarProducts;
};

app.get(similarIdEndpoint, async(req, res) => {
  try {
    const productIds = await getProductsIds(req.params.productId);
    const similarProducts = await getSimilarProducts(productIds);

    res.send(similarProducts);
  } catch(err) {
    res.status(404);
    res.json({ description: 'Product Not found' });
  };
});

app.listen(port, () => {
  console.log('> Server ready!');
});
