import { Card, CardMedia, CardContent, Typography} from '@mui/material';

export const ProductCard = ({imgUrl, brand, model, price}) => (
  <Card sx={{ width: '22rem' }}>
    <CardMedia
      sx={{ height: '9rem' }}
      image={imgUrl}
      title={brand}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Brand: {brand}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Model: {model}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Price: {price}$
      </Typography>
    </CardContent>
  </Card>
);