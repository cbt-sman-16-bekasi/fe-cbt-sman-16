export const menuConfig = {
  admin: [
    {
      text: 'Dashboard',
      icon: 'HomeRounded',
      path: '/dashboard',
    },
    {
      text: 'Data Master',
      icon: 'SchoolSharp',
      path: '/master',
      collapse: false,
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
        },
      ],
    },
    {
      text: 'CBT',
      icon: 'Draw',
      path: '/cbt',
      collapse: false,
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
      ],
    },
    {
      text: 'Laporan',
      icon: 'AssessmentRounded',
      path: '/laporan',
      collapse: false,
      menu: [
        {
          text: 'Laporan Nilai',
          title: 'Laporan Nilai',
          icon: 'AssessmentRounded',
          path: '/laporan-nilai',
          comingSoon: false,
        },
      ],
    },
    {
      text: 'Pengaturan',
      icon: 'Settings',
      path: '/pengaturan',
      collapse: false,
      menu: [
        {
          text: 'Akses Sistem',
          title: 'Akses Sistem',
          icon: 'ManageAccounts',
          path: '/akses-system',
        },
      ],
    },
  ],
  teacher: [
    {
      title: 'Home',
      menu: [
        {
          text: 'Dashboard',
          title: 'Dashboard',
          icon: 'HomeRounded',
          path: '/dashboard',
        },
      ],
    },
    {
      title: 'Ujian',
      menu: [
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
      ],
    },
    {
      title: 'Laporan',
      menu: [
        {
          text: 'Laporan Nilai',
          title: 'Laporan Nilai',
          icon: 'AssessmentRounded',
          path: '/laporan-nilai',
          comingSoon: false,
        },
      ],
    },
  ],
};
