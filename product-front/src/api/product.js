export const getProductList = async () => {
  const res = await fetch('https://itx-frontend-test.onrender.com/api/product', {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  return data;
};

export const getProductItem = async (id) => {
  const res = await fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  return data;
};

export const addProductItem = async (id, colorCode, storageCode) => {
  const res = await fetch(`https://itx-frontend-test.onrender.com/api/cart`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, colorCode, storageCode}, null, 2)
  });
  const data = await res.json();
  return data;
}
