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
import { useSelector, useDispatch } from 'react-redux';

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
import { asyncPreloadProcess } from './states/isPreload/action.js';
import { asyncUnsetAuthUser } from './states/authUser/action.js';
import Typography from "@mui/material/Typography";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props) {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = authUser?.role?.code.toLowerCase();

  const onUserLogout = () => {
    dispatch(asyncUnsetAuthUser())
  }

  const routeMap = {
    superadmin: <SuperAdminPage role={userRole} />,
    admin: <AdminPage role={userRole} />,
    teacher: <TeacherPage role={userRole} />,
  };

  useEffect(() => {
    const currentMenu = JSON.parse(localStorage.getItem("currentMenu"));
    setTitle(currentMenu === null ? 'Dashboard' : currentMenu.title);
  }, [navigate]);

  useEffect(() => {
    if (!accessToken) {
      localStorage.clear()
      navigate("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (userRole) {
      const role = userRole;
      const path = window.location.pathname;

      if (path === "/" || path === "/login" || path === "/register") {
        navigate(`/${role}/dashboard`);
      }
    }
  }, [userRole]);

  useEffect(() => {
    const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
    const userMenu = menuConfig[userRole] || [];
    const currentMenu = userMenu.find((item) => item.path === `/${currentPath}`);

    document.title = currentMenu ? `${currentMenu.text} - Admin` : "Admin Panel";
  }, [location, userRole]);

  if (isPreload) null

  if (!authUser || !accessToken) {
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
              <Route path='/login' element={<LoginPage />} />
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
          <SideMenu user={authUser} role={userRole} logout={onUserLogout} />
          <AppNavbar user={authUser} role={userRole} logout={onUserLogout} />

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
              sx={{
                alignItems: 'start',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header role={userRole} />

              <Routes>
                <Route
                  path={`/${userRole}/*`}
                  element={
                    <ProtectedRoute allowedRoles={[userRole]} userRole={userRole}>
                      <Typography component="h1" variant="h4" fontWeight="bold">
                        {title}
                      </Typography>
                      {routeMap[userRole]}
                    </ProtectedRoute>
                  } />
                <Route path="*" element={<NotFoundPage role={userRole} />} />
              </Routes>

            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </div>
  );
}

export default App;
