import { Route, Routes } from "react-router"
import MainGrid from '../components/MainGrid';
import Akses from '../components/Akses';
import Kelas from '../components/Kelas';
import MataPelajaran from '../components/MataPelajaran';
import KodeJenisUjian from '../components/KodeJenisUjian';
import DataSiswa from '../components/DataSiswa';
import Ujian from '../components/Ujian';
import SesiUjian from '../components/SesiUjian';
import GenerateToken from '../components/GenerateToken';
import LaporanNilai from '../components/LaporanNilai';
import LayoutTambah from '../components/LayoutTambah';
import BankSoal from '../components/BankSoal';
import LayoutImport from '../components/LayoutImport';
import ProfilSekolah from '../components/ProfilSekolah';


function SuperAdminPage({ role }) {
  return (
    <Routes>
      <Route path="/" element={<MainGrid />} />
      <Route path="/akses-system" element={<Akses />} />
      <Route path="/akses-system/tambah" element={<LayoutTambah desc="Tambah Akses" />} />

      <Route path="/kelas" element={<Kelas role={role} />} />
      <Route path="/kelas/tambah" element={<LayoutTambah desc="Tambah Kelas" />} />

      <Route path="/mata-pelajaran" element={<MataPelajaran />} />
      <Route path="/mata-pelajaran/tambah" element={<LayoutTambah desc="Tambah Mata Pelajaran" />} />

      <Route path="/kode-jenis-ujian" element={<KodeJenisUjian />} />
      <Route path="/kode-jenis-ujian/tambah" element={<LayoutTambah desc="Kode Jenis Ujian" />} />

      <Route path="/data-siswa" element={<DataSiswa />} />
      <Route path="/data-siswa/tambah" element={<LayoutTambah desc="Data Siswa" />} />
      <Route path="/data-siswa/import" element={<LayoutImport desc="Data Siswa" />} />

      <Route path="/bank-soal" element={<BankSoal />} />
      <Route path="/bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />

      <Route path="/ujian" element={<Ujian />} />
      <Route path="/ujian/tambah" element={<LayoutTambah desc="Tambah Ujian" />} />

      <Route path="/sesi-ujian" element={<SesiUjian />} />
      <Route path="/sesi-ujian/tambah" element={<LayoutTambah desc="Tambah Sesi Ujian" />} />

      <Route path="/generate-token" element={<GenerateToken />} />

      <Route path="/laporan-nilai" element={<LaporanNilai />} />

      <Route path="/informasi-sekolah" element={<ProfilSekolah />} />

      <Route path="*" element={<MainGrid />} />
    </Routes>

  )
}

export default SuperAdminPage
