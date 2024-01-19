import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import logo from './assets/logo_puskesmas.png';

const CustomAppBar: React.FC = (props) => {
  return (
    <AppBar {...props} color='secondary' >
      <Box
        component="img"
        sx={{
          maxWidth: "30px",
        }}
        alt="logo"
        src={logo}
      />
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          flex: 1,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginLeft: 1
        }}
        id="react-admin-title"
      />
    </AppBar >
  );
};

export default CustomAppBar;