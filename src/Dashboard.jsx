import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Route, Routes } from 'react-router';
import MainGrid from './components/MainGrid';
import Akses from './components/Akses';
import Kelas from './components/Kelas';
import MataPelajaran from './components/MataPelajaran';
import KodeJenisUjian from './components/KodeJenisUjian';
import DataSiswa from './components/DataSiswa';
import Ujian from './components/Ujian';
import SesiUjian from './components/SesiUjian';
import GenerateToken from './components/GenerateToken';
import LaporanNilai from './components/LaporanNilai';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import LayoutTambah from './components/LayoutTambah';
import BankSoal from './components/BankSoal';
import LayoutImport from './components/LayoutImport';
import ProfilSekolah from './components/ProfilSekolah';

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
              <Route path="/akses-system/tambah" element={<LayoutTambah desc="Tambah Akses" />} />

              <Route path="/kelas" element={<Kelas />} />
              <Route path="/kelas/tambah" element={<LayoutTambah desc="Tambah Kelas" />} />

              <Route path="/mata-pelajaran" element={<MataPelajaran />} />
              <Route path="/mata-pelajaran/tambah" element={<LayoutTambah desc="Tambah Mata Pelajaran" />} />

              <Route path="/kode-jenis-ujian" element={<KodeJenisUjian />} />
              <Route path="/kode-jenis-ujian/tambah" element={<LayoutTambah desc="Kode Jenis Ujian" />} />

              <Route path="/data-siswa" element={<DataSiswa />} />
              <Route path="/data-siswa/tambah" element={<LayoutTambah desc="Data Siswa" />} />
              <Route path="/data-siswa/import" element={<LayoutImport desc="Data Siswa" />} />

              <Route path="/bank-soal" element={<BankSoal />} />
              <Route path="/bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />

              <Route path="/ujian" element={<Ujian />} />
              <Route path="/ujian/tambah" element={<LayoutTambah desc="Tambah Ujian" />} />

              <Route path="/sesi-ujian" element={<SesiUjian />} />
              <Route path="/sesi-ujian/tambah" element={<LayoutTambah desc="Tambah Sesi Ujian" />} />

              <Route path="/generate-token" element={<GenerateToken />} />

              <Route path="/laporan-nilai" element={<LaporanNilai />} />

              <Route path="/informasi-sekolah" element={<ProfilSekolah />} />

              <Route path="*" element={<Akses />} />
              {/* <Route path="/settings" element={<Akses />} /> */}
            </Routes>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
