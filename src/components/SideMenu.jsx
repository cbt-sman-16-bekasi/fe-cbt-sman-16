import * as Icons from '@mui/icons-material';
import { Link, useLocation } from 'react-router';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import Grid from '@mui/material/Grid2';
import LogoutIcon from '@mui/icons-material/Logout';
import Copyright from '../internals/components/Copyright';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ user, role, logout, schoolData }) {
  const location = useLocation();
  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
  const to = (menu) => {
    localStorage.setItem("currentMenu", JSON.stringify(menu));
  }
  const path = `/${role}/profil`;
  const item = {
    text: 'Profil',
    title: 'Profil',
    icon: 'PersonRounded',
    path: '/profil',
  }
  const IconComponent = Icons[item.icon];
  const isActive = `/${currentPath}` === item.path;
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'cbtPrimary.violet',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1,
        }}
      >
        {schoolData && (
          <img src={schoolData.logo} alt="Logo Sekolah" style={{
            width: "100px",
            height: "auto",
            maxWidth: "150px",
          }} />
        )}
        <Typography variant='subtitle1' fontWeight='bold' sx={{ color: 'cbtAccents.white' }}>
          CBT SYSTEM SMAN 16 BEKASI
        </Typography>
        {/* <SelectContent /> */}
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent role={role} currentPath={currentPath} to={to} />
      </Box>

      <Stack
        direction="row"
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid
          container
          component={Link}
          onClick={() => to(item, path)}
          to={path}
          alignItems="center"
          sx={{ border: isActive ? '' : '1px solid grey', backgroundColor: isActive ? 'primary.main' : '', display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: 1, borderRadius: 1, p: 1, width: '100%' }}
        >
          {user?.detail?.profile_url ?
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src={user?.detail?.profile_url}
              sx={{ width: 36, height: 36 }}
            /> : <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: isActive ? 'cbtAccents.white' : 'theme.palette.primary.main',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconComponent sx={{ color: isActive ? 'cbtAccents.white' : 'primary.main' }} fontSize="small" />
            </Box>
          }
          <Box sx={{ mr: 'auto', color: 'cbtAccents.white' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {user?.detail?.name}
            </Typography>
          </Box>
          <Button
            variant="text"
            sx={{
              color: 'white',
              borderRadius: '50%',
              minWidth: 40,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={logout}
          >
            <LogoutIcon />
          </Button>

        </Grid>
        <Copyright />
      </Stack>
    </Drawer >
  );
}

SideMenu.propTypes = {
  user: PropTypes.object.isRequired,
  schoolData: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}