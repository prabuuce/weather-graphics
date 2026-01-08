import React from 'react';

import { TextField } from '@mui/material';

import { sizing, radius } from '../../styling/globals/tokens';

const SearchBar = () => {
  return (
    <TextField
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
  );
};

export default SearchBar;
