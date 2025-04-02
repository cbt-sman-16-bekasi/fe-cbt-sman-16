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

export default function SideMenu({ user, role, logout }) {
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
        <img
          src="/logo-sman16.png"
          alt="logo sekolah"
          style={{
            width: "100px",
            height: "auto",
            maxWidth: "150px",
          }}
        />
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
        <MenuContent role={role} />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 1,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{ border: '1px solid white', display: 'flex', justifyContent: "start", gap: 1, borderRadius: 1, p: 1, width: '100%' }}
        >

          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto', color: 'cbtAccents.white' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {user.username}
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
      </Stack>
    </Drawer>
  );
}

SideMenu.propTypes = {
  user: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}