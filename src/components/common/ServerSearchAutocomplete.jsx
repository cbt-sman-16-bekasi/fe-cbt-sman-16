import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress, Checkbox, Typography } from '@mui/material';
import { useDebounce } from "../../hooks/useDebounce.js";
import Box from "@mui/material/Box";
import useApi from "../../utils/rest/api.js";

const ServerSearchAutocomplete = ({ multiple = false, label = '', url, searchKey, setOptionData, optionLabel, optionValue }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchDebounce = useDebounce(inputValue, 500);

  // Function untuk fetch ke server
  const fetchOptions = async (search) => {
    setLoading(true);
    try {
      const { data } = await useApi.fetch(`${url}?${searchKey}=${search}`)
      setOptions(data.records.map(r => { return { label: r[optionLabel].toUpperCase(), value: r[optionValue] } }));
    } catch (error) {
      console.error('Fetch error:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOptions(inputValue)
  }, [searchDebounce]);

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.label || ''}
      value={selectedOptions}
      onChange={(event, newValue) => setSelectedOptions(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      loading={loading}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option, { selected }) => {
        const { key, ...rest } = props;
        return (
          <Box
            key={key}
            component="li"
            {...rest}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              borderBottom: '1px solid #f0f0f0',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Checkbox checked={selected} sx={{ padding: 0 }} />
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {option.label}
              </Typography>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          label={label}
          variant="outlined"
          sx={{ height: 'auto' }}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      fullWidth
    />
  );
};

export default ServerSearchAutocomplete;
