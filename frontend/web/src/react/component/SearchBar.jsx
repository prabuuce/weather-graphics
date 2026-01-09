import React from 'react';

import { TextField, ThemeProvider } from '@mui/material';
import { InitMui } from '../../styling/mui/globals';

import { sizing, radius } from '../../styling/globals/tokens';

const SearchBar = ({ location, setLocation }) => {
  const theme = InitMui();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        onChange={(e) => setLocation(e.target.value)}
        className="search"
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          style: {
            borderRadius: radius.border,
            fontSize: sizing.textSmall
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: sizing.textSmall
          }
        }}
      />
    </ThemeProvider>
  );
};

export default SearchBar;
