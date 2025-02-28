import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import { Button, InputAdornment, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const data = [
  {
    title: 'Kelas',
    value: '10',
    interval: 'Last 30 days',
    trend: 'up',
  },
  {
    title: 'Mata Pelajaran',
    value: '5',
    interval: 'Last 30 days',
    trend: 'down',
  },
  {
    title: 'Data Siswa',
    value: '945',
    interval: 'Last 30 days',
    trend: 'neutral',
  },
  {
    title: 'Ujian',
    value: '13',
    interval: 'Last 30 days',
    trend: 'up',
  },
  {
    title: 'Sesi Ujian',
    value: '11',
    interval: 'Last 30 days',
    trend: 'down',
  },
  {
    title: 'Laporan Ujian',
    value: '3',
    interval: 'Last 30 days',
    trend: 'neutral',
  },
];

export default function Akses() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Hak Akses CBT
      </Typography>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
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
              <Box component="li"><Typography variant="body2">Mengatur setting ujian, termasuk jadwal, durasu, dan aturan ujian, mengakses dan mengunduh laporan nilai siswa untuk ujian yang mereka kelola.</Typography></Box>
            </Box>
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid item size={{ lg: 1 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained"><AddBoxOutlinedIcon /> Tambah</Button>
        </Grid>
        <Grid item lg={4}>
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
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
