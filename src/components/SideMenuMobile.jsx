import * as Icons from '@mui/icons-material';
import { Link, useLocation } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import Copyright from '../internals/components/Copyright';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import { Box } from '@mui/material';

function SideMenuMobile({ open, toggleDrawer, user, role, logout }) {
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
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'cbtPrimary.violet',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent role={role} currentPath={currentPath} to={to} />
          <Divider />
        </Stack>

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
            {user?.photoProfile ?
              <Avatar
                sizes="small"
                alt="Riley Carter"
                src={user?.photoProfile}
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
                {user.name}
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
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default SideMenuMobile;
