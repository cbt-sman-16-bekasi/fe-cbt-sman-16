import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Route, Routes } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

// import MainGrid from './components/MainGrid';
// import Akses from './components/Akses';
// import LayoutTambah from './components/LayoutTambah';
// import Kelas from './components/Kelas';
// import MataPelajaran from './components/MataPelajaran';
// import KodeJenisUjian from './components/KodeJenisUjian';
// import DataSiswa from './components/DataSiswa';
// import LayoutImport from './components/LayoutImport';
// import BankSoal from './components/BankSoal';
// import Ujian from './components/Ujian';
// import SesiUjian from './components/SesiUjian';
// import GenerateToken from './components/GenerateToken';
// import LaporanNilai from './components/LaporanNilai';
// import ProfilSekolah from './components/ProfilSekolah';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// const routes = [
//   { path: "/", element: <MainGrid /> },
//   { path: "/akses-system", element: <Akses /> },
//   { path: "/akses-system/tambah", element: <LayoutTambah desc="Tambah Akses" /> },

//   { path: "/kelas", element: <Kelas /> },
//   { path: "/kelas/tambah", element: <LayoutTambah desc="Tambah Kelas" /> },

//   { path: "/mata-pelajaran", element: <MataPelajaran /> },
//   { path: "/mata-pelajaran/tambah", element: <LayoutTambah desc="Tambah Mata Pelajaran" /> },

//   { path: "/kode-jenis-ujian", element: <KodeJenisUjian /> },
//   { path: "/kode-jenis-ujian/tambah", element: <LayoutTambah desc="Kode Jenis Ujian" /> },

//   { path: "/data-siswa", element: <DataSiswa /> },
//   { path: "/data-siswa/tambah", element: <LayoutTambah desc="Data Siswa" /> },
//   { path: "/data-siswa/import", element: <LayoutImport desc="Data Siswa" /> },

//   { path: "/bank-soal", element: <BankSoal /> },
//   { path: "/bank-soal/tambah", element: <LayoutTambah desc="Bank Soal" /> },

//   { path: "/ujian", element: <Ujian /> },
//   { path: "/ujian/tambah", element: <LayoutTambah desc="Tambah Ujian" /> },

//   { path: "/sesi-ujian", element: <SesiUjian /> },
//   { path: "/sesi-ujian/tambah", element: <LayoutTambah desc="Tambah Sesi Ujian" /> },

//   { path: "/generate-token", element: <GenerateToken /> },
//   { path: "/laporan-nilai", element: <LaporanNilai /> },
//   { path: "/informasi-sekolah", element: <ProfilSekolah /> },

//   { path: "*", element: <Akses /> }, // Default fallback route
// ];
{/* {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))} */}

function App(props) {
  // const authUser = useSelector((state) => state.authUser);
  // const isPreload = useSelector((state) => state.isPreload);
  const authUser = { akses: 'teacher' };
  const isPreload = null;

  const renderRoutes = () => {
    switch (authUser?.akses) {
      case "superadmin":
        return <Route path="/superadmin/*" element={
          <ProtectedRoute allowedRoles={["superadmin"]} userRole={authUser?.akses}>
            <SuperAdminPage />
          </ProtectedRoute>
        } />;
      case "admin":
        return <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={["admin"]} userRole={authUser?.akses}>
            <AdminPage />
          </ProtectedRoute>
        } />;
      case "teacher":
        return <Route path="/teacher/*" element={
          <ProtectedRoute allowedRoles={["teacher"]} userRole={authUser?.akses}>
            <TeacherPage />
          </ProtectedRoute>
        } />;
      default:
        return <Route path="*" element={<NotFoundPage />} />;
    }
  };

  if (isPreload) null

  if (!authUser) {
    return (
      <>
        <AppTheme {...props} themeComponents={xThemeComponents}>
          <CssBaseline enableColorScheme />
          <Box component="main"
            sx={{
              margin: 0,
              height: "100vh",
              width: "100vw",
            }} >
            <Routes>
              <Route path='/*' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </Box >
        </AppTheme>
      </>
    )
  }

  return (
    <div className="app w-[98.5vw]">
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <SideMenu role={authUser?.akses} />
          <AppNavbar />

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
                {renderRoutes()}
              </Routes>

            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </div>
  );
}

export default App;
