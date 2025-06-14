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

import AdminPage from "./pages/AdminPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";

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
import { asyncGetSchoolInfo } from './states/school/action.js';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const schoolData = useSelector((state) => state.school.schoolInfo);
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const [title, setTitle] = useState('')

  const accessToken = localStorage.getItem("accessToken");
  const userRole = authUser?.role?.code.toLowerCase();

  const pathParts = location.pathname.split('/');
  const rawTitle = pathParts[2] || '';
  const pageTitle = rawTitle
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    if (authUser?.SchoolCode) {
      dispatch(asyncGetSchoolInfo(authUser.SchoolCode));
    }
  }, [authUser?.SchoolCode, dispatch]);

  useEffect(() => {
    if (schoolData?.logo && schoolData.logo.startsWith("data:image")) {
      const oldIcons = document.querySelectorAll("link[rel*='icon']");
      oldIcons.forEach((el) => el.parentNode.removeChild(el));

      const link = document.createElement("link");
      link.type = "image/png";
      link.rel = "icon";
      link.href = schoolData.logo;
      document.head.appendChild(link);
    }
  }, [schoolData?.logo]);

  useEffect(() => {
    const currentMenu = JSON.parse(localStorage.getItem("currentMenu"));
    const defaultTitle = currentMenu?.title || pageTitle || 'Dashboard';

    setTitle(defaultTitle);
    document.title = `${defaultTitle} - Admin`;
  }, [location]);

  useEffect(() => {
    if (!accessToken) {
      localStorage.clear()
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (userRole) {
      const role = userRole;
      const path = location.pathname;

      if (path === "/" || path === "/login" || path === "/register") {
        navigate(`/${role}/dashboard`);
      }
    }
  }, [navigate, userRole]);

  const onUserLogout = () => {
    dispatch(asyncUnsetAuthUser())
  }

  const routeMap = {
    admin: <AdminPage role={userRole} />,
    teacher: <TeacherPage role={userRole} />,
  };

  if (isPreload) {
    return null;
  }


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
          <SideMenu user={authUser} role={userRole} schoolData={schoolData} logout={onUserLogout} />
          <AppNavbar user={authUser} role={userRole} schoolData={schoolData} logout={onUserLogout} />

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
                mt: { xs: 12, md: 0 },
              }}
            >
              <Header role={userRole} />

              {userRole && (
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
              )}
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </div>
  );
}

export default App;
