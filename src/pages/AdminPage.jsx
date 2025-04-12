import { Route, Routes } from "react-router"
import MainGrid from '../components/MainGrid';
import KodeJenisUjian from '../components/KodeJenisUjian';
import LaporanNilai from '../components/LaporanNilai';
import LayoutTambah from '../components/LayoutTambah';
import LayoutImport from '../components/LayoutImport';
import ProfilSekolah from '../components/ProfilSekolah';
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import LayoutEditData from "../components/LayoutEditData";
import ExamList from "./exams/ExamList.jsx";
import { ExamCreate } from "./exams/add/ExamCreate.jsx";
import ExamSessionListPage from "./examsession/ExamSessionListPage.jsx";
import { ExamSessionCreatePage } from "./examsession/add/ExamSessionCreatePage.jsx";
import GenerateTokenPage from "./token/GenerateTokenPage.jsx";
import ExamDetailPage from "./exams/detail/ExamDetailPage.jsx";
import { ExamCreateQuestionPage } from "./exams/add/ExamCreateQuestionPage.jsx";
import ExamSessionDetailPage from "./examsession/detail/ExamSessionDetailPage.jsx";
import BankQuestionListPage from "./bank/BankQuestionListPage.jsx";
import BankQuestionCreatePage from "./bank/add/BankQuestionCreatePage.jsx";
import DetailBankQuestionPage from "./bank/detail/DetailBankQuestionPage.jsx";
import { BankCreateQuestionPage } from "./bank/add/BankCreateQuestionPage.jsx";
import { AccessCreate } from "./access/add/AccessCreate.jsx";
import AccessList from "./access/AccessList.jsx";
import StudentList from "./students/StudentList.jsx";
import { StudentCreate } from "./students/add/StudentCreate.jsx";
import ClassesList from "./classes/ClassesList.jsx";
import { ClassesCreate } from "./classes/add/ClassesCreate.jsx";
import SubjectList from "./subjects/SubjectList.jsx";

function AdminPage({ role }) {
  return (
    <Routes>
      <Route path="dashboard" element={<MainGrid role={role} />} />

      <Route path="akses-system" element={<AccessList />} />
      <Route path="akses-system/tambah" element={<AccessCreate />} />
      <Route path="akses-system/:id/update" element={<AccessCreate isUpdatePage={true} />} />

      <Route path="kelas" element={<ClassesList />} />
      <Route path="kelas/tambah" element={<ClassesCreate />} />
      <Route path="kelas/:id/update" element={<ClassesCreate isUpdatePage={true} />} />

      <Route path="mata-pelajaran" element={<SubjectList />} />

      {/* <Route path="mata-pelajaran" element={<MataPelajaran role={role} />} /> */}
      <Route path="mata-pelajaran/tambah" element={<LayoutTambah desc="Tambah Mata Pelajaran" />} />
      <Route path="mata-pelajaran/edit/:id" element={<LayoutEditData desc="Edit Mata Pelajaran" />} />

      <Route path="kode-jenis-ujian" element={<KodeJenisUjian role={role} />} />
      <Route path="kode-jenis-ujian/tambah" element={<LayoutTambah desc="Kode Jenis Ujian" />} />

      <Route path="data-siswa" element={<StudentList />} />
      <Route path="data-siswa/tambah" element={<StudentCreate />} />
      <Route path="data-siswa/:id/update" element={<StudentCreate isUpdatePage={true} />} />
      <Route path="data-siswa/import" element={<LayoutImport desc="Data Siswa" />} />

      <Route path="bank-soal" element={<BankQuestionListPage />} />
      <Route path="bank-soal/tambah" element={<BankQuestionCreatePage />} />
      <Route path="bank-soal/:id/update" element={<BankQuestionCreatePage isUpdatePage={true} />} />
      <Route path="bank-soal/:id/detail" element={<DetailBankQuestionPage />} />
      <Route path="bank-soal/:bankMasterCode/detail/question/create" element={<BankCreateQuestionPage />} />
      <Route path="bank-soal/:bankMasterCode/detail/question/:id/edit" element={<BankCreateQuestionPage isUpdatePage={true} />} />

      <Route path="ujian" element={<ExamList />} />
      <Route path="ujian/tambah" element={<ExamCreate />} />
      <Route path="ujian/:id/update" element={<ExamCreate isUpdatePage={true} />} />
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