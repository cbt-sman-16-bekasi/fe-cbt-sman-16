import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncDeleteClass, asyncReceiveClasses } from '../states/classes/action';
import PropTypes from 'prop-types';

import { columns, formatRows } from "../internals/data/kelasData";
export default function Kelas({ role }) {
  const classes = useSelector((state) => state.classes.classes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rows = formatRows(classes.records);

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncReceiveClasses());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus kelas ini?")) {
      dispatch(asyncDeleteClass(id));
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

      <Grid container spacing={2} columns={12} sx={{ my: 4 }} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${role}/kelas/tambah`}>
            <Button fullWidth variant="contained"><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
        </Grid>

        <Grid lg={4}>
          <TextField
            variant="outlined"
            placeholder="Cari Berdasarkan..."
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

      </Grid>

      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid
            columns={columns({ handleDelete, navigate, role })}
            rows={rows}
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />

        </Grid>
      </Grid>
    </Box>
  );
}

Kelas.propTypes = {
  role: PropTypes.string.isRequired
}