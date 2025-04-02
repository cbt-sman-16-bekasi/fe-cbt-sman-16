import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatCard from './StatCard';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetDashboardData } from '../states/common/action';
import { icons, MenuConfig } from '../config/MenuConfig3';

export default function MainGrid({ role }) {
  const dashboardData = useSelector((state) => state.common.dashboardData);
  const dispatch = useDispatch();

  const updatedMenuItems = MenuConfig.map((item) => {
    const keyMap = {
      '/kelas': 'total_class',
      '/mata-pelajaran': 'total_subject',
      '/data-siswa': 'total_student',
      '/ujian': 'total_exam',
      '/sesi-ujian': 'total_session_exam',
      '/laporan-nilai': 'total_report_exam',
    };

    return {
      ...item,
      value: dashboardData[keyMap[item.path]] ?? '0',
      icon: icons[item.icon],
    };
  });

  useEffect(() => {
    dispatch(asyncGetDashboardData())
  }, [dispatch])

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
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
        {updatedMenuItems.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard role={role} {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

MainGrid.propTypes = {
  role: PropTypes.string.isRequired
}
