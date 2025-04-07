import { Route, Routes } from "react-router"
import MainGrid from '../components/MainGrid';
import Akses from '../components/Akses';
import Kelas from '../components/Kelas';
import MataPelajaran from '../components/MataPelajaran';
import KodeJenisUjian from '../components/KodeJenisUjian';
import DataSiswa from '../components/DataSiswa';
import SesiUjian from '../components/SesiUjian';
import GenerateToken from '../components/GenerateToken';
import LaporanNilai from '../components/LaporanNilai';
import LayoutTambah from '../components/LayoutTambah';
import BankSoal from '../components/BankSoal';
import LayoutImport from '../components/LayoutImport';
import ProfilSekolah from '../components/ProfilSekolah';
import AddQuestions from "../components/AddQuestions";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import LayoutEditData from "../components/LayoutEditData";
import ExamList from "./exams/ExamList.jsx";
import { ExamCreate } from "./exams/add/ExamCreate.jsx";
import ExamSessionListPage from "./examsession/ExamSessionListPage.jsx";
import { ExamSessionCreatePage } from "./examsession/add/ExamSessionCreatePage.jsx";
import GenerateTokenPage from "./token/GenerateTokenPage.jsx";
import ExamDetailPage from "./exams/detail/ExamDetailPage.jsx";
import {ExamCreateQuestionPage} from "./exams/add/ExamCreateQuestionPage.jsx";
import ExamSessionDetailPage from "./examsession/detail/ExamSessionDetailPage.jsx";

function AdminPage({ role }) {
  return (
    <Routes>
      <Route path="dashboard" element={<MainGrid role={role} />} />
      <Route path="akses-system" element={<Akses role={role} />} />
      <Route path="akses-system/tambah" element={<LayoutTambah desc="Tambah Akses" />} />
      <Route path="akses-system/edit/:id" element={<LayoutEditData desc="Edit Akses" />} />

      <Route path="kelas" element={<Kelas role={role} />} />
      <Route path="kelas/tambah" element={<LayoutTambah desc="Tambah Kelas" />} />
      <Route path="kelas/edit/:id" element={<LayoutEditData desc="Edit Kelas" />} />

      <Route path="mata-pelajaran" element={<MataPelajaran role={role} />} />
      <Route path="mata-pelajaran/tambah" element={<LayoutTambah desc="Tambah Mata Pelajaran" />} />
      <Route path="mata-pelajaran/edit/:id" element={<LayoutEditData desc="Edit Mata Pelajaran" />} />

      <Route path="kode-jenis-ujian" element={<KodeJenisUjian role={role} />} />
      <Route path="kode-jenis-ujian/tambah" element={<LayoutTambah desc="Kode Jenis Ujian" />} />

      <Route path="data-siswa" element={<DataSiswa role={role} />} />
      <Route path="data-siswa/tambah" element={<LayoutTambah desc="Data Siswa" />} />
      <Route path="data-siswa/edit/:id" element={<LayoutEditData desc="Edit Data Siswa" />} />
      <Route path="data-siswa/import" element={<LayoutImport desc="Data Siswa" />} />

      <Route path="bank-soal" element={<BankSoal role={role} />} />
      <Route path="bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />

      <Route path="ujian" element={<ExamList />} />
      <Route path="ujian/tambah" element={<ExamCreate />} />
      <Route path="ujian/:id/update" element={<ExamCreate isUpdatePage={true}/>} />
      <Route path="ujian/:id/detail" element={<ExamDetailPage />} />
      <Route path="ujian/:id/detail/question/create" element={<ExamCreateQuestionPage />} />
      <Route path="ujian/:id/detail/question/:questionId/edit" element={<ExamCreateQuestionPage isUpdatePage={true} />} />
      <Route path="sesi-ujian" element={<ExamSessionListPage />} />
      <Route path="sesi-ujian/tambah" element={<ExamSessionCreatePage />} />
      <Route path="sesi-ujian/:id/update" element={<ExamSessionCreatePage isUpdatePage={true} />} />
      <Route path="sesi-ujian/:id/detail" element={<ExamSessionDetailPage />} />

      <Route path="generate-token" element={<GenerateTokenPage />} />

      <Route path="laporan-nilai" element={<LaporanNilai />} />

      <Route path="informasi-sekolah" element={<ProfilSekolah />} />

      <Route path="*" element={<NotFoundPage role={role} />} />
    </Routes>

  )
}

export default AdminPage

AdminPage.propTypes = {
  role: PropTypes.string.isRequired
}