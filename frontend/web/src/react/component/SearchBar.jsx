import React from 'react';

import { TextField } from '@mui/material';

import { sizing } from '../../styling/globals/tokens';

const SearchBar = () => {
  return (
    <TextField
      className="search"
      label="Search"
      variant="outlined"
      size="small"
      InputProps={{
        style: {
          borderRadius: "30px",
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
