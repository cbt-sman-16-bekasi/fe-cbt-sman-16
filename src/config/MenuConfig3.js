import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

export const icons = {
  HomeRoundedIcon,
  AnalyticsRoundedIcon,
  PeopleRoundedIcon,
  AssignmentRoundedIcon,
};

export const MenuConfig = [
  {
    text: 'Akses Sistem',
    icon: 'AnalyticsRoundedIcon',
    value: '123',
    path: '/akses-system',
    allowRole: ['ADMIN']
  },
  { text: 'Kelas', icon: 'PeopleRoundedIcon', value: '123', path: '/kelas',
    allowRole: ['ADMIN','TEACHER'] },
  {
    text: 'Mata Pelajaran',
    icon: 'AssignmentRoundedIcon',
    value: '123',
    path: '/mata-pelajaran',
    allowRole: ['ADMIN']
  },
  {
    text: 'Data Siswa',
    icon: 'AssignmentRoundedIcon',
    value: '123',
    path: '/data-siswa',
    allowRole: ['ADMIN']
  },
  {
    text: 'Ujian',
    icon: 'AssignmentRoundedIcon',
    value: '123',
    path: '/ujian',
    allowRole: ['ADMIN','TEACHER']
  },
  {
    text: 'Sesi Ujian Aktif',
    icon: 'AssignmentRoundedIcon',
    value: '123',
    path: '/sesi-ujian',
    allowRole: ['ADMIN','TEACHER']
  },
  {
    text: 'Laporan Nilai',
    icon: 'AssignmentRoundedIcon',
    value: '123',
    path: '/laporan-nilai',
    allowRole: ['ADMIN','TEACHER']
  },
];
