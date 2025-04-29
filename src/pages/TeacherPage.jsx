import { Route, Routes } from "react-router"
import LaporanNilai from '../components/LaporanNilai';
import BankQuestionListPage from "./bank/BankQuestionListPage.jsx";
import BankQuestionCreatePage from "./bank/add/BankQuestionCreatePage.jsx";
import DetailBankQuestionPage from "./bank/detail/DetailBankQuestionPage.jsx";
import { BankCreateQuestionPage } from "./bank/add/BankCreateQuestionPage.jsx";
import ExamList from "./exams/ExamList.jsx";
import { ExamCreate } from "./exams/add/ExamCreate.jsx";
import ExamDetailPage from "./exams/detail/ExamDetailPage.jsx";
import { ExamCreateQuestionPage } from "./exams/add/ExamCreateQuestionPage.jsx";
import ExamSessionListPage from "./examsession/ExamSessionListPage.jsx";
import { ExamSessionCreatePage } from "./examsession/add/ExamSessionCreatePage.jsx";
import ExamSessionDetailPage from "./examsession/detail/ExamSessionDetailPage.jsx";
import MainGrid from "../components/MainGrid.jsx";
import GenerateTokenPage from "./token/GenerateTokenPage.jsx";
import UserProfile from "./userprofile/UserProfile.jsx";
import PropTypes from "prop-types";

function TeacherPage({ role }) {
  return (
    <Routes>
      <Route path="dashboard" element={<MainGrid role={role} />} />

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

      <Route path="profile" element={<UserProfile />} />

      {/*<Route path="dashboard" element={<MainGrid role={role} />} />*/}

      {/*<Route path="bank-soal" element={<BankSoal role={role} />} />*/}
      {/*<Route path="bank-soal/tambah" element={<LayoutTambah desc="Bank Soal" />} />*/}

      {/*<Route path="ujian" element={<Ujian role={role} />} />*/}
      {/*<Route path="ujian/tambah" element={<LayoutTambah desc="Tambah Ujian" />} />*/}

      {/*<Route path="sesi-ujian" element={<SesiUjian role={role} />} />*/}
      {/*<Route path="sesi-ujian/tambah" element={<LayoutTambah desc="Tambah Sesi Ujian" />} />*/}

      {/*<Route path="laporan-nilai" element={<LaporanNilai />} />*/}

      {/*<Route path="*" element={<NotFoundPage role={role} />} />*/}
    </Routes>
  )
}

export default TeacherPage

TeacherPage.propTypes = {
  role: PropTypes.string.isRequired,
}