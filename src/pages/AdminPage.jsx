import { Route, Routes } from "react-router"
import LaporanNilai from '../components/LaporanNilai';
import LayoutImport from '../components/LayoutImport';
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
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
import { SubjectCreate } from "./subjects/add/SubjectCreate.jsx";
import TypeExamList from "./typeExams/TypeExamList.jsx";
import { TypeExamCreate } from "./typeExams/add/TypeExamCreate.jsx";
import TeacherList from "./teacher/TeacherList.jsx";
import { TeacherCreate } from "./teacher/add/TeacherCreate.jsx";
import UserProfile from "./userprofile/UserProfile.jsx";
import SchoolProfile from './schoolprofile/SchoolProfile.jsx';
import DashboardPage from "./dashboard/DashboardPage.jsx";
import ReportPage from "./report/ReportPage.jsx";
import ExamBankQuestionPage from "./exams/detail/bank/ExamBankQuestionPage.jsx";

function AdminPage({ role }) {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage role={role} />} />

      <Route path="guru" element={<TeacherList />} />
      <Route path="guru/tambah" element={<TeacherCreate />} />
      <Route path="guru/:id/update" element={<TeacherCreate isUpdatePage={true} />} />

      <Route path="akses-system" element={<AccessList />} />
      <Route path="akses-system/tambah" element={<AccessCreate />} />
      <Route path="akses-system/:id/update" element={<AccessCreate isUpdatePage={true} />} />

      <Route path="kelas" element={<ClassesList />} />
      <Route path="kelas/tambah" element={<ClassesCreate />} />
      <Route path="kelas/:id/update" element={<ClassesCreate isUpdatePage={true} />} />

      <Route path="mata-pelajaran" element={<SubjectList />} />
      <Route path="mata-pelajaran/tambah" element={<SubjectCreate />} />
      <Route path="mata-pelajaran/:id/update" element={<SubjectCreate isUpdatePage={true} />} />

      <Route path="kode-jenis-ujian" element={<TypeExamList />} />
      <Route path="kode-jenis-ujian/tambah" element={<TypeExamCreate />} />
      <Route path="kode-jenis-ujian/:id/update" element={<TypeExamCreate isUpdatePage={true} />} />

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
      <Route path="ujian/:id/detail/question/bank" element={<ExamBankQuestionPage />} />
      <Route path="ujian/:id/detail/question/:questionId/edit" element={<ExamCreateQuestionPage isUpdatePage={true} />} />
      <Route path="sesi-ujian" element={<ExamSessionListPage />} />
      <Route path="sesi-ujian/tambah" element={<ExamSessionCreatePage />} />
      <Route path="sesi-ujian/:id/update" element={<ExamSessionCreatePage isUpdatePage={true} />} />
      <Route path="sesi-ujian/:id/detail" element={<ExamSessionDetailPage />} />

      <Route path="generate-token" element={<GenerateTokenPage />} />

      <Route path="laporan-nilai" element={<ReportPage />} />

      <Route path="informasi-sekolah" element={<SchoolProfile />} />

      <Route path="profil" element={<UserProfile />} />

      <Route path="*" element={<NotFoundPage role={role} />} />
    </Routes>

  )
}

export default AdminPage

AdminPage.propTypes = {
  role: PropTypes.string.isRequired
}