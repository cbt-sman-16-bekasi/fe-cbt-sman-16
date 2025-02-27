import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import { Route, Routes } from 'react-router';
import Akses from './components/Akses';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            minHeight: '100vh',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'start',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<MainGrid />} />
              <Route path="/akses-system" element={<Akses />} />
              <Route path="/kelas" element={<Akses />} />
              <Route path="/mata-pelajaran" element={<Akses />} />
              <Route path="/kode-jenis-ujian" element={<Akses />} />
              <Route path="/data-siswa" element={<Akses />} />
              <Route path="/ujian" element={<Akses />} />
              <Route path="/sesi-ujian" element={<Akses />} />
              <Route path="/generate-token" element={<Akses />} />
              <Route path="/laporan-nilai" element={<Akses />} />
              <Route path="/settings" element={<Akses />} />
              <Route path="*" element={<Akses />} />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
