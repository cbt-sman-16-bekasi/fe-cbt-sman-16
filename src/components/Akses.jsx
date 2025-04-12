import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncDeleteTeacher, asyncReceiveTeachers } from '../states/teachers/action';

import CustomizedDataGrid from './CustomizedDataGrid';
import { columns, formatRows } from "../internals/data/aksesData";
export default function Akses({ role }) {
  const teachers = useSelector((state) => state.teachers.teachers)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(teachers)

  const rows = formatRows(teachers.records);

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus kelas ini?")) {
      dispatch(asyncDeleteTeacher(id));
    }
  };

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncReceiveTeachers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h9869766" fontWeight="bold">
              Akses Sistem
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Dalam sistem ini <b>Nama Admin</b>! terdapat dua jenis hak akses utama yang diberikan kepada pengguna, yaitu:
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>1. Super Admin</b>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'
              }}
            >
              <Box component="li"><Typography variant="body2">Super Admin memiliki hak tertinggi dalam sistem.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengakses dan mengelola seluruh menu dan fitur yang ada dalam sistem.</Typography></Box>
              <Box component="li"><Typography variant="body2">Menambahkan, mengedit, dan menghapus data pengguna termasuk admin dan guru.</Typography></Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>2. Guru</b>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'
              }}
            >
              <Box component="li"><Typography variant="body2">Guru memiliki hak akases yang lebih terbatas, fokus pada pengelolaan ujian dan penilaian.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengatur setting ujian, termasuk jadwal, durasi, dan aturan ujian, mengakses dan mengunduh laporan nilai siswa untuk ujian yang mereka kelola.</Typography></Box>
            </Box>
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${role}/akses-system/tambah`}>
            <Button fullWidth variant="contained"><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
        </Grid>
        <Grid size={{ lg: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Cari..."
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
    </Box >
  );
}

Akses.propTypes = {
  role: PropTypes.string.isRequired
}