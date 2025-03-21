import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import StatCard from './StatCard';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const data = [
  {
    title: 'Kelas',
    value: '10',
    link: '/kelas',
  },
  {
    title: 'Mata Pelajaran',
    value: '5',
    link: '/mata-pelajaran',
  },
  {
    title: 'Data Siswa',
    value: '945',
    link: '/data-siswa',
  },
  {
    title: 'Ujian',
    value: '13',
    link: '/ujian',
  },
  {
    title: 'Sesi Ujian',
    value: '11',
    link: '/sesi-ujian',
  },
  {
    title: 'Laporan Ujian',
    value: '3',
    link: '/laporan-ujian',
  },
];

<Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
  {data.map((card, index) => (
    <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
      <StatCard {...card} />
    </Grid>
  ))}
</Grid>

export default function MainGrid({ role }) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ lg: 12 }}>
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
                listStyleType: 'disc'
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
            <StatCard role={role} {...card} />
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
