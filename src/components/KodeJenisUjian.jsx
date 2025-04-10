import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncReceiveTypeExams } from '../states/typeExams/action';

import { columns, formatRows } from "../internals/data/kodeJenisUjianData";
export default function KodeJenisUjian({ role }) {
  const typeExams = useSelector((state) => state.typeExams.typeExams)
  const dispatch = useDispatch()

  const rows = formatRows(typeExams.records)

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncReceiveTypeExams());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>


      <Grid container spacing={2} columns={12} sx={{ my: 4 }} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${role}/kode-jenis-ujian/tambah`}>
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
            columns={columns}
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

KodeJenisUjian.propTypes = {
  role: PropTypes.string.isRequired,
}