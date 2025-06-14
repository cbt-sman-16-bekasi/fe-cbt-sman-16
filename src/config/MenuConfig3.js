export const MenuConfig = [
  {
    text: 'Akses Sistem',
    icon: 'AdminPanelSettingsRounded',
    value: '123',
    path: '/akses-system',
    allowRole: ['ADMIN'],
  },
  {
    text: 'Kelas',
    icon: 'Groups2Rounded',
    value: '123',
    path: '/kelas',
    allowRole: ['ADMIN', 'TEACHER'],
  },
  {
    text: 'Mata Pelajaran',
    icon: 'MenuBookRounded',
    value: '123',
    path: '/mata-pelajaran',
    allowRole: ['ADMIN'],
  },
  {
    text: 'Data Siswa',
    icon: 'SchoolRounded',
    value: '123',
    path: '/data-siswa',
    allowRole: ['ADMIN'],
  },
  {
    text: 'Ujian',
    icon: 'AssignmentRounded',
    value: '123',
    path: '/ujian',
    allowRole: ['ADMIN', 'TEACHER'],
  },
  {
    text: 'Sesi Ujian Aktif',
    icon: 'EventNoteRounded',
    value: '123',
    path: '/sesi-ujian',
    allowRole: ['ADMIN', 'TEACHER'],
  },
  {
    text: 'Laporan Nilai',
    icon: 'AssessmentRounded',
    value: '123',
    path: '/laporan-nilai',
    allowRole: ['ADMIN', 'TEACHER'],
  },
];
