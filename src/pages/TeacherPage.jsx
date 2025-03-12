import { Route, Routes } from "react-router"
import MainGrid from '../components/MainGrid';
import Ujian from '../components/Ujian';
import SesiUjian from '../components/SesiUjian';
import GenerateToken from '../components/GenerateToken';
import LaporanNilai from '../components/LaporanNilai';
import LayoutTambah from '../components/LayoutTambah';
import BankSoal from '../components/BankSoal';

function TeacherPage() {
  return (
    <Routes>
      <Route path="*" element={<MainGrid />} />

      <Route path="bank-soal" element={<BankSoal />} />
      <Route path="bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />

      <Route path="ujian" element={<Ujian />} />
      <Route path="ujian/tambah" element={<LayoutTambah desc="Tambah Ujian" />} />

      <Route path="sesi-ujian" element={<SesiUjian />} />
      <Route path="sesi-ujian/tambah" element={<LayoutTambah desc="Tambah Sesi Ujian" />} />

      <Route path="generate-token" element={<GenerateToken />} />

      <Route path="laporan-nilai" element={<LaporanNilai />} />

      <Route path="*" element={<MainGrid />} />
    </Routes>
  )
}

export default TeacherPage
