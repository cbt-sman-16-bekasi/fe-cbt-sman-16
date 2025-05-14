import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import {useDebounce} from "../../hooks/useDebounce.js";
import useApi from "../../utils/rest/api.js";

const ServerSearchAutocomplete = ({
                                    multiple = false,
                                    label = '',
                                    url,
                                    searchKey,
                                    setOptionData,
                                    optionLabel,
                                    optionValue,
                                    value,
                                    onChange,
                                    maxSelected = 4,
                                  }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchDebounce = useDebounce(inputValue, 500);
  const [disabled, setDisabled] = useState(false)

  const fetchOptions = async (search) => {
    setLoading(true);
    try {
      const query = `${url}?key=${searchKey}&value=${search}&page=1`;
      const { data } = await useApi.fetch(query);

      const newOptions =
        data?.records?.map((r) => ({
          label: r[optionLabel].toUpperCase(),
          value: r[optionValue],
        })) || [];

      const mergedOptions = [
        ...options,
        ...newOptions.filter(
          (newOpt) => !options.some((opt) => opt.value === newOpt.value)
        ),
      ];

      const uniqueOptions = Array.from(
        new Map(mergedOptions.map((item) => [item.value, item])).values()
      );

      setOptions(uniqueOptions);
      setOptionData?.(uniqueOptions);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchDebounce.trim() === '') return;

    const isAlreadyExist = options.some(
      (opt) => opt.label.toLowerCase() === searchDebounce.toLowerCase()
    );

    if (!isAlreadyExist) {
      fetchOptions(searchDebounce);
    }
  }, [searchDebounce]);

  useEffect(() => {
    if (selectedOptions.length === maxSelected) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [selectedOptions]);

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.label || ''}
      value={value !== undefined ? value : selectedOptions}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      loading={loading}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.label}
            {...getTagProps({ index })}
            sx={{
              backgroundColor: '#e3f2fd',
              color: '#0d47a1',
              fontWeight: 'bold',
              borderRadius: 1,
              m: 0.5,
            }}
          />
        ))
      }
      renderOption={(props, option, { selected }) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            borderBottom: '1px solid #eee',
            backgroundColor: selected ? '#f0f0f0' : 'white',
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
          }}
        >
          <Checkbox
            checked={selected}
            sx={{ mr: 1, p: 0 }}
            color="primary"
          />
          <Typography variant="body2" fontWeight={500}>
            {option.label}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          label={label}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              pr: 5,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress color="primary" size={20} sx={{ mr: 2 }} />
                )}
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
