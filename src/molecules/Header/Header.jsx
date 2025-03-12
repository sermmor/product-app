import { Box, Typography } from '@mui/material';
import { getHeaderStyle, getTitleHeaderStyle, getTitleStyle, getContentStyle } from './Header.styles';


export const Header = ({title, isCentered, children}) => (<>
  <Box sx={getHeaderStyle()}>
    <Box sx={getTitleHeaderStyle()}>
      <Typography data-testid={title} sx={getTitleStyle()} variant='h2'>
        {title}
      </Typography>
    </Box>
    <Box sx={getContentStyle(isCentered)}>{children}</Box>
  </Box>
</>);