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
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

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

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Selamat, Anda Berhasil Login!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Halo, <b>Nama Admin</b>! Selamat datang di sistem CBT. Saat ini, Anda memiliki status sebagai <b>Super Admin</b>.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Sebagai <b>SUPER ADMIN</b>, Anda memiliki hak akses penuh untuk:
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'  // Menampilkan bullet points
              }}
            >
              <Box component="li"><Typography variant="body2">Mengelola seluruh aktivitas dalam sistem CBT.</Typography></Box>
              <Box component="li"><Typography variant="body2">Menambahkan, mengedit, atau menghapus ujian, data kelas, data peserta, dan token ujian.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengakses laporan ujian.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengatur laporan ujian.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengatur pengaturan sistem sesuai kebutuhan.</Typography></Box>
            </Box>
          </Alert>
        </Grid>
      </Grid>
      {/* cards */}
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} columns={12} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography component="h1" variant="h4" sx={{ mb: 2, mt: 6 }}>
            Daftar Token Terbaru
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained">Download</Button>
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
