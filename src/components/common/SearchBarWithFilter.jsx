import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce.js";

export default function SearchBarWithFilter({onFilterChange, renderFilterContent, searchOptions = []}) {
  const [searchBy, setSearchBy] = useState("");
  const [search, setSearch] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    active: false,
    verified: false,
    startDate: null,
    endDate: null,
  });
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce

  const toggleFilterOption = (key) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        searchBy,
        search,
        filters: filterOptions,
      });
    }
  }, [debouncedSearch]);

  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          variant="outlined"
          disabled={searchOptions.length === 0}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="outlined"
          placeholder={`Cari berdasarkan ${searchBy}`}
          fullWidth
          size="small"
          disabled={searchOptions.length === 0}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={() => setFilterDialogOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      <Dialog open={filterDialogOpen}
              fullWidth={true}
              onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          {renderFilterContent ? (
            renderFilterContent({ filterOptions, toggleFilterOption })
          ) : (<></>)}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Tutup</Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              setFilterDialogOpen(false);
              if (onFilterChange) {
                onFilterChange({
                  searchBy,
                  search,
                  filters: filterOptions,
                });
              }
            }}
          >
            Terapkan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
