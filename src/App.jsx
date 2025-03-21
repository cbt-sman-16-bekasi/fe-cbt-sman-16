import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { menuConfig } from './config/menuConfig';

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

// const authUser = useSelector((state) => state.authUser);
// const isPreload = useSelector((state) => state.isPreload);
function App(props) {
  const [authUser, setAuthUser] = useState(() => {
    return JSON.parse(localStorage.getItem("authUser")) || { akses: null };
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isPreload = null;

  // const renderRoutes = () => {
  //   switch (authUser?.akses) {
  //     case "superadmin":
  //       return <Route path="/superadmin/*" element={
  //         <ProtectedRoute allowedRoles={["superadmin"]} userRole={authUser?.akses}>
  //           <SuperAdminPage role={authUser?.akses} />
  //         </ProtectedRoute>
  //       } />;
  //     case "admin":
  //       return <Route path="/admin/*" element={
  //         <ProtectedRoute allowedRoles={["admin"]} userRole={authUser?.akses}>
  //           <AdminPage role={authUser?.akses} />
  //         </ProtectedRoute>
  //       } />;
  //     case "teacher":
  //       return <Route path="/teacher/*" element={
  //         <ProtectedRoute allowedRoles={["teacher"]} userRole={authUser?.akses}>
  //           <TeacherPage role={authUser?.akses} />
  //         </ProtectedRoute>
  //       } />;
  //     default:
  //       return <Route path="*" element={<NotFoundPage role={authUser?.akses} />} />;
  //   }
  // };

  const routeMap = {
    superadmin: <SuperAdminPage role={authUser?.akses} />,
    admin: <AdminPage role={authUser?.akses} />,
    teacher: <TeacherPage role={authUser?.akses} />,
  };

  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          { username: "superadmin", password: "123456", akses: "superadmin" },
          { username: "admin", password: "admin123", akses: "admin" },
          { username: "teacher", password: "teacher123", akses: "teacher" },
        ])
      );
    }

    if (!authUser.akses) {
      if (!location.pathname.startsWith("/login")) {
        navigate("/login");
      }
    } else if (!location.pathname.startsWith(`/${authUser.akses}`)) {
      navigate(`/${authUser.akses}/dashboard`);
    }

    const userMenu = menuConfig[authUser.akses] || [];
    const currentMenu = userMenu.find((item) => item.path === `/${currentPath}`);
    document.title = currentMenu ? `${currentMenu.text} - Admin` : "Admin Panel";

  }, [authUser.akses, currentPath, location.pathname, navigate]);

  if (isPreload) null

  if (!authUser.akses) {
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
              <Route path='/login' element={<LoginPage setAuthUser={setAuthUser} />} />
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
          <SideMenu role={authUser?.akses} setAuthUser={setAuthUser} />
          <AppNavbar role={authUser?.akses} setAuthUser={setAuthUser} />

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
              <Header role={authUser?.akses} />

              <Routes>
                {/* {renderRoutes()} */}

                <Route
                  path={`/${authUser.akses}/*`}
                  element={
                    <ProtectedRoute allowedRoles={[authUser.akses]} userRole={authUser?.akses}>
                      {routeMap[authUser.akses]}
                    </ProtectedRoute>
                  } />
                <Route path="*" element={<NotFoundPage role={authUser.akses} />} />
              </Routes>

            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </div>
  );
}

export default App;
