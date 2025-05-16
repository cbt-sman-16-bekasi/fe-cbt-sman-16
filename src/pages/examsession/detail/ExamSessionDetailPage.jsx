import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {DownloadOutlined, InfoSharp, MultilineChart, ReportOffOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import BasicCard from "../../../components/common/BasicCard.jsx";
import DetailItem from "../../../components/common/DetailItem.jsx";
import {Button, Chip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useExamSessionDetailHook} from "./useExamSessionDetailHook.jsx";
import ApiTable from "../../../components/ApiTable.jsx";
import {UsersIcon} from "lucide-react";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import ModalExamCorrection from "../../../components/page/examsession/ModalExamCorrection.jsx";

const ExamSessionDetailPage = () => {

  const {
    name, typeExam, subject,
    classCode,
    columns,
    sessionName,
    startDate,
    endDate,
    sessionId,
    handleDownload, handleGenerateReport,
    optionExamMember,classIdSelected, setClassIdSelected,
    isRefreshTable,
    detailExamSession,
    correctionQuestion, setCorrectionQuestion,
    correctionRowStudent, setIsRefreshTable
  } = useExamSessionDetailHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <ModalExamCorrection
        setHide={setCorrectionQuestion}
        open={correctionQuestion}
        row={correctionRowStudent}
        dataSession={detailExamSession}
        isRefresh={setIsRefreshTable}
        isRefreshTable={isRefreshTable} />
      <BackWithTitle />

      <TitleWithIcon icon={<InfoSharp sx={{color: 'white'}} />} text="Detail Sesi Ujian" iconBackground="red" />
      <BasicCard sx={{mb:4, padding: '40px'}}>
        <DetailItem label="Jenis Ujian" value={<Chip
          label={typeExam}
          color="secondary"
          variant="outlined"
          sx={{ borderColor: '#a855f7', color: '#a855f7' }}
        />} />
        <DetailItem label="Nama Ujian" value={name} />
        <DetailItem label="Mata Pelajaran" value={subject} />
        <DetailItem label="Kelas" value={classCode} />
        <DetailItem label="Nama Sesi" value={sessionName} />
        <DetailItem label="Mulai" value={startDate} />
        <DetailItem label="Selesai" value={endDate} />
        <DetailItem label="Kehadiran Siswa" value={detailExamSession.total_attendance ?? 0} />
        <DetailItem label="Total Siswa Mengumpulkan" value={detailExamSession.total_submit ?? 0} />
        <DetailItem label="Total Siswa Terindikasi Curang" value={detailExamSession.total_cheating ?? 0} />
        <DetailItem label="Total Siswa Mengumpulkan Pada Waktu Habis" value={detailExamSession.total_times_over ?? 0} />
      </BasicCard>

      <TitleWithIcon icon={<UsersIcon sx={{color: 'black'}} />} text="Daftar Peserta Ujian" iconBackground="yellow" />
      <BasicCard>
        <Grid container spacing={2} columns={12} justifyContent="space-between" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 5, md: 4, sm: 3 }} sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <CustomInput label="Kelas" fullWidth={true} type="text" options={optionExamMember} value={classIdSelected} onChange={(c) => setClassIdSelected(c.target.value)} placeholder="Kelas" />
          </Grid>
          <Grid size={{ lg: 5, md: 4, sm: 3 }} sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <Button fullWidth variant="contained" color='info' onClick={handleDownload} startIcon={<DownloadOutlined/>}>Download Peserta Ujian</Button>
            <Button fullWidth variant="contained" color='error' onClick={handleGenerateReport} startIcon={<MultilineChart />}>{ detailExamSession?.status_report === 'READY' ? 'Regenerate' : 'Generate' } Laporan</Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} columns={12} sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          }
        }}>
          <Grid size={{ xs: 12, lg: 12 }}>
            { classIdSelected && (<ApiTable url={`/academic/exam/session/attendance?exam_session_id=${sessionId}&class_id=${classIdSelected}`}
                                            isRefresh={isRefreshTable}
              pageSize={10} columns={columns} isPagination={false} />)
            }
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )

}

export default ExamSessionDetailPage