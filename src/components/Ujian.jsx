import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Alert, Button, InputAdornment, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { columns, formatRows } from "../internals/data/ujianData";
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncReceiveTypeExams } from '../states/exams/action';

export default function Ujian({ role }) {
  const exams = useSelector((state) => state.exams.typeExams)
  const dispatch = useDispatch();

  const rows = formatRows(exams);

  useEffect(() => {
    dispatch(asyncReceiveTypeExams())
  }, [dispatch])

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Perhatian!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Untuk menambahkan soal di setaip ujian, silahkan klik tombol <b>setting</b> <SettingsIcon sx={{ verticalAlign: "middle", fontSize: 18, color: "black", backgroundColor: 'yellow' }} />
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Setting Ujian
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${role}/ujian/tambah`}>
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
          <CustomizedDataGrid columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

Ujian.propTypes = {
  role: PropTypes.string.isRequired
}