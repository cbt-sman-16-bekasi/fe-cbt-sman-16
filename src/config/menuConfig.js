import {SchoolSharp} from "@mui/icons-material";

export const menuConfig = {
  admin: [
    {
      title: "Home",
      menu: [
        {
          text: 'Dashboard',
          title: 'Dashboard',
          icon: 'HomeRounded',
          path: '/dashboard',
        }
      ]
    },
    {
      title: 'Data Master',
      menu: [
        {
          text: 'Informasi Sekolah',
          title: 'Informasi Sekolah',
          icon: 'SchoolSharp',
          path: '/informasi-sekolah',
        },
        {
          text: 'Kelas',
          title: 'Kelas',
          icon: 'Groups2Rounded',
          path: '/kelas',
        },
        {
          text: 'Mata Pelajaran',
          title: 'Mata Pelajaran',
          icon: 'MenuBookRounded',
          path: '/mata-pelajaran',
        },
        {
          text: 'Data Guru',
          title: 'Data Guru',
          icon: 'PersonRounded',
          path: '/guru',
        },
        {
          text: 'Data Siswa',
          title: 'Data Siswa',
          icon: 'SchoolRounded',
          path: '/data-siswa',
        }
      ]
    },
    {
      title: 'Ujian',
      menu: [
        {
          text: 'Kode Jenis Ujian',
          title: 'Kode Jenis Ujian',
          icon: 'QrCode2Rounded',
          path: '/kode-jenis-ujian',
        },
        {
          text: 'Bank Soal',
          title: 'Bank Soal',
          icon: 'LibraryBooksRounded',
          path: '/bank-soal',
        },
        {
          text: 'Ujian',
          title: 'Setting Ujian',
          icon: 'AssignmentRounded',
          path: '/ujian',
        },
        {
          text: 'Sesi Ujian',
          title: 'Sesi Ujian',
          icon: 'EventNoteRounded',
          path: '/sesi-ujian',
        },
        {
          text: 'Generate Token Ujian',
          title: 'Generate Token Ujian',
          icon: 'VpnKeyRounded',
          path: '/generate-token',
        },
      ]
    },
    {
      title: "Laporan",
      menu: [
        {
          text: 'Laporan Nilai',
          title: 'Laporan Nilai',
          icon: 'AssessmentRounded',
          path: '/laporan-nilai',
        },
      ]
    },
    {
      title: "Pengaturan",
      menu: [
        {
          text: 'Akses Sistem',
          title: 'Akses Sistem',
          icon: 'AdminPanelSettingsRounded',
          path: '/akses-system',
        },
      ]
    }
  ],
  teacher: [
    {
      text: 'Dashboard',
      icon: 'HomeRoundedIcon',
      value: '123',
      path: '/dashboard',
    },
    {
      text: 'Bank Soal',
      icon: 'AssignmentRoundedIcon',
      value: '123',
      path: '/bank-soal',
    },
    {
      text: 'Ujian',
      icon: 'AssignmentRoundedIcon',
      value: '123',
      path: '/ujian',
    },
    {
      text: 'Sesi Ujian',
      icon: 'AssignmentRoundedIcon',
      value: '123',
      path: '/sesi-ujian',
    },
    {
      text: 'Generate Token Ujian',
      title: 'Generate Token Ujian',
      icon: 'AssignmentRoundedIcon',
      value: '123',
      path: '/generate-token',
    },
    {
      text: 'Laporan Nilai',
      icon: 'AssignmentRoundedIcon',
      value: '123',
      path: '/laporan-nilai',
    },
  ],
};
