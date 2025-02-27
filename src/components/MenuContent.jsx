import * as React from 'react';
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

// const mainListItems = [
//   { text: 'Dashboard', icon: <HomeRoundedIcon /> },
//   { text: 'Akses System', icon: <AnalyticsRoundedIcon /> },
//   { text: 'Kelas', icon: <PeopleRoundedIcon /> },
//   { text: 'Mata Pelajaran', icon: <AssignmentRoundedIcon /> },
//   { text: 'Kode Jenis Ujian', icon: <AssignmentRoundedIcon /> },
//   { text: 'Data Siswa', icon: <AssignmentRoundedIcon /> },
//   { text: 'Ujian', icon: <AssignmentRoundedIcon /> },
//   { text: 'Sesi Ujian', icon: <AssignmentRoundedIcon /> },
//   { text: 'Generate Token Ujian', icon: <AssignmentRoundedIcon /> },
//   { text: 'Laporan Nilai', icon: <AssignmentRoundedIcon /> },
// ];

// const secondaryListItems = [
//   { text: 'Settings', icon: <SettingsRoundedIcon /> },
//   { text: 'About', icon: <InfoRoundedIcon /> },
//   { text: 'Feedback', icon: <HelpRoundedIcon /> },
// ];

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Akses System', icon: <AnalyticsRoundedIcon />, path: '/akses-system' },
  { text: 'Kelas', icon: <PeopleRoundedIcon />, path: '/kelas' },
  { text: 'Mata Pelajaran', icon: <AssignmentRoundedIcon />, path: '/mata-pelajaran' },
  { text: 'Kode Jenis Ujian', icon: <AssignmentRoundedIcon />, path: '/kode-jenis-ujian' },
  { text: 'Data Siswa', icon: <AssignmentRoundedIcon />, path: '/data-siswa' },
  { text: 'Ujian', icon: <AssignmentRoundedIcon />, path: '/ujian' },
  { text: 'Sesi Ujian', icon: <AssignmentRoundedIcon />, path: '/sesi-ujian' },
  { text: 'Generate Token Ujian', icon: <AssignmentRoundedIcon />, path: '/generate-token' },
  { text: 'Laporan Nilai', icon: <AssignmentRoundedIcon />, path: '/laporan-nilai' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
];


export default function MenuContent() {
  const location = useLocation()

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => {
          const isActive = location.pathname === item.path; // Cek apakah path saat ini cocok dengan item.path
          return (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
                selected={isActive}
                sx={{
                  bgcolor: isActive ? 'primary.light' : 'inherit', // Warna background jika aktif
                  color: isActive ? 'primary.dark' : 'inherit', // Warna teks jika aktif
                  borderRadius: 2, // Membuat sudut lebih rounded
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
      </List>
      <List dense>
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
      </List>
    </Stack>
  );
}
