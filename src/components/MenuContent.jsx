import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link, useLocation } from 'react-router';
import { icons, menuConfig } from '../config/menuConfig';
import PropTypes from 'prop-types';

export default function MenuContent({ role }) {
  const menuItems = menuConfig[role] || [];
  const location = useLocation();

  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuItems.map((item, index) => {
          const IconComponent = icons[item.icon];
          const isActive = `/${currentPath}` === item.path;
          const path = `/${role}${item.path}`;

          return (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={path}
                style={{ textDecoration: 'none', color: '#FFFFFF' }}
                selected={isActive}
                sx={{
                  // bgcolor: isActive ? 'primary.light' : 'inherit',
                  // color: isActive ? 'primary.dark' : 'inherit',
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  minHeight: 48,
                }}
              >
                <ListItemIcon >
                  {<IconComponent />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack >
  );
}

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Akses Sistem', icon: <AnalyticsRoundedIcon />, path: '/akses-system' },
  { text: 'Kelas', icon: <PeopleRoundedIcon />, path: '/kelas' },
  { text: 'Mata Pelajaran', icon: <AssignmentRoundedIcon />, path: '/mata-pelajaran' },
  { text: 'Kode Jenis Ujian', icon: <AssignmentRoundedIcon />, path: '/kode-jenis-ujian' },
  { text: 'Data Siswa', icon: <AssignmentRoundedIcon />, path: '/data-siswa' },
  { text: 'Bank Soal', icon: <AssignmentRoundedIcon />, path: '/bank-soal' },
  { text: 'Ujian', icon: <AssignmentRoundedIcon />, path: '/ujian' },
  { text: 'Sesi Ujian', icon: <AssignmentRoundedIcon />, path: '/sesi-ujian' },
  { text: 'Generate Token Ujian', icon: <AssignmentRoundedIcon />, path: '/generate-token' },
  { text: 'Laporan Nilai', icon: <AssignmentRoundedIcon />, path: '/laporan-nilai' },
  { text: 'Informasi Sekolah', icon: <AssignmentRoundedIcon />, path: '/informasi-sekolah' },
];

// const secondaryListItems = [
//   { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
// ];


{/* <List dense>
  {secondaryListItems.map((item, index) => {
    const isActive = location.pathname === item.path;
    return (
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to={item.path}
          style={{ textDecoration: 'none', color: 'inherit' }}
          selected={isActive}
          sx={{
            bgcolor: isActive ? 'primary.light' : 'inherit',
            color: isActive ? 'primary.dark' : 'inherit',
            borderRadius: 2,
            px: 3,
            py: 2,
            minHeight: 48,
          }}
        >
          <ListItemIcon sx={{ color: isActive ? 'primary.dark' : 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    );
  })}
</List> */}

MenuContent.propTypes = {
  role: PropTypes.string.isRequired,
}