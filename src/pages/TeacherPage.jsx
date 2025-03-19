import { Route, Routes } from "react-router"
import MainGrid from '../components/MainGrid';
import Ujian from '../components/Ujian';
import SesiUjian from '../components/SesiUjian';
import GenerateToken from '../components/GenerateToken';
import LaporanNilai from '../components/LaporanNilai';
import LayoutTambah from '../components/LayoutTambah';
import BankSoal from '../components/BankSoal';
import { Typography } from "@mui/material";
import NotFoundPage from "./NotFoundPage";

function TeacherPage({ role }) {
  return (
    <Routes>
      <Route path="dashboard" element={<MainGrid role={role} />} />

      <Route path="bank-soal" element={<BankSoal role={role} />} />
      <Route path="bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />

      <Route path="ujian" element={<Ujian role={role} />} />
      <Route path="ujian/tambah" element={<LayoutTambah desc="Tambah Ujian" />} />

      <Route path="sesi-ujian" element={<SesiUjian role={role} />} />
      <Route path="sesi-ujian/tambah" element={<LayoutTambah desc="Tambah Sesi Ujian" />} />

      <Route path="laporan-nilai" element={<LaporanNilai />} />

      <Route path="*" element={<NotFoundPage role={role} />} />
    </Routes>
  )
}

export default TeacherPage
