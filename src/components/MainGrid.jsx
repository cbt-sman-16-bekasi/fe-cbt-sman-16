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
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
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
      <Typography component="h2" variant="h6" sx={{ mb: 2, mt: 6 }}>
        Daftar Token Terbaru
      </Typography>
      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          {/* <CustomizedTreeView /> */}
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
