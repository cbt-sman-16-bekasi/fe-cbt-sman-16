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

export const menuConfig = {
  superadmin: [
    { text: 'Dashboard', icon: 'HomeRoundedIcon', path: '/dashboard' },
    {
      text: 'Akses Sistem',
      icon: 'AnalyticsRoundedIcon',
      path: '/akses-system',
    },
    { text: 'Kelas', icon: 'PeopleRoundedIcon', path: '/kelas' },
    {
      text: 'Mata Pelajaran',
      icon: 'AssignmentRoundedIcon',
      path: '/mata-pelajaran',
    },
    {
      text: 'Kode Jenis Ujian',
      icon: 'AssignmentRoundedIcon',
      path: '/kode-jenis-ujian',
    },
    {
      text: 'Data Siswa',
      icon: 'AssignmentRoundedIcon',
      path: '/data-siswa',
    },
    { text: 'Bank Soal', icon: 'AssignmentRoundedIcon', path: '/bank-soal' },
    { text: 'Ujian', icon: 'AssignmentRoundedIcon', path: '/ujian' },
    {
      text: 'Sesi Ujian',
      icon: 'AssignmentRoundedIcon',
      path: '/sesi-ujian',
    },
    {
      text: 'Generate Token Ujian',
      icon: 'AssignmentRoundedIcon',
      path: '/generate-token',
    },
    {
      text: 'Laporan Nilai',
      icon: 'AssignmentRoundedIcon',
      path: '/laporan-nilai',
    },
    {
      text: 'Informasi Sekolah',
      icon: 'AssignmentRoundedIcon',
      path: '/informasi-sekolah',
    },
  ],
  admin: [
    { text: 'Dashboard', icon: 'HomeRoundedIcon', path: '/dashboard' },
    { text: 'Kelas', icon: 'PeopleRoundedIcon', path: '/kelas' },
    {
      text: 'Mata Pelajaran',
      icon: 'AssignmentRoundedIcon',
      path: '/mata-pelajaran',
    },
    {
      text: 'Data Siswa',
      icon: 'AssignmentRoundedIcon',
      path: '/data-siswa',
    },
    { text: 'Bank Soal', icon: 'AssignmentRoundedIcon', path: '/bank-soal' },
    { text: 'Ujian', icon: 'AssignmentRoundedIcon', path: '/ujian' },
    {
      text: 'Sesi Ujian',
      icon: 'AssignmentRoundedIcon',
      path: '/sesi-ujian',
    },
  ],
  teacher: [
    { text: 'Dashboard', icon: 'HomeRoundedIcon', path: '/dashboard' },
    { text: 'Bank Soal', icon: 'AssignmentRoundedIcon', path: '/bank-soal' },
    { text: 'Ujian', icon: 'AssignmentRoundedIcon', path: '/ujian' },
    {
      text: 'Sesi Ujian',
      icon: 'AssignmentRoundedIcon',
      path: '/sesi-ujian',
    },
    {
      text: 'Laporan Nilai',
      icon: 'AssignmentRoundedIcon',
      path: '/laporan-nilai',
    },
  ],
};
