import BasicCard from "../../components/common/BasicCard.jsx";
import Box from "@mui/material/Box";
import AlertWithTitle from "../../components/common/AlertWithTitle.jsx";
import {Download, RocketLaunch} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import ApiTable from "../../components/ApiTable.jsx";
import {useReportPageHook} from "./hook/useReportPageHook.js";
import {Button } from "@mui/material";
import CustomInput from "../../components/form/FormInputTextField.jsx";

const ReportPage = () => {
  const {
    columns,
    dateHelper,
    handleDownload,
    examCode, setExamCode,
    optionExam, setOptionExam,
    examSession, setExamSession,
    optionExamSession, setOptionExamSession,
    isRefreshList
  } = useReportPageHook()

  columns.splice(3, 0, {
    field: "detail",
    headerName: "DETAIL UJIAN",
    flex: 0.8,
    minWidth: 120,
    renderCell: (row) => (
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ul style={{ fontSize: "12px" }}>
          <li>Jenis Ujian: <strong>{row.type_exam ?? '-'} </strong></li>
          <li>Pelajaran: <strong>{row.subject ?? '-'}</strong></li>
          <li>Kelas: <strong>{row.kelas ?? '-'} </strong></li>
          <li>Nama Sesi: <strong>{row.session_name ?? '-'} </strong></li>
          <li>Mulai: <strong>{dateHelper.formattedWithTime(row.start_date) ?? '-'} </strong></li>
          <li>Selesai: <strong>{dateHelper.formattedWithTime(row.end_date) ?? '-'} </strong></li>
        </ul>
      </Box>)
  })

  columns.push(
    {
      field: "start_date",
      headerName: "TANGGAL UJIAN",
      flex: 0.8,
      minWidth: 120,
      renderCell: (row) => dateHelper.formatted(row.start_date) ?? '-'
    }
  )

  columns.push(
    {
      field: "created_at",
      headerName: "TANGGAL LAPORAN DIBUAT",
      flex: 0.8,
      minWidth: 120,
      renderCell: (row) => dateHelper.formattedWithTime(row.UpdatedAt) ?? '-'
    }
  )

  columns.push(
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.8,
      minWidth: 120,
      renderCell: (row) => (
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button variant="contained" size="small" color="info" startIcon={<Download />} onClick={() => handleDownload(row.report_url)}> Unduh</Button>
        </Box>)
    })
  return (<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    <AlertWithTitle icon={<RocketLaunch fontSize="small" color="info" />} title="Laporan Nilai!"
                    message="Mengunduh laporan nilai dengan memilih terlebih dahulu Data Ujian kemudian sesuaikan terhadap sesi ujian masing-masing"
    />
    <BasicCard sx={{ width: '100%', mb: '20px'}}>
      <Grid container spacing={3} alignItems="center" columns={12}>
        <CustomInput label="Nama Ujian" fullWidth={true} type="text" options={optionExam} value={examCode} onChange={(c) => setExamCode(c.target.value)} placeholder="Pilih Nama Ujian" />
        <CustomInput label="Nama Sesi Ujian" fullWidth={true} type="text" options={optionExamSession} value={examSession} onChange={(c) => setExamSession(c.target.value)} placeholder="Sesi Ujian" />
      </Grid>
    </BasicCard>
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
        {examCode && (<ApiTable url={`/academic/exam/session/report?exam_code=${examCode}&sessionId=${examSession}`} isRefresh={isRefreshList} pageSize={10} columns={columns} isPagination={false} />)}
      </Grid>
    </Grid>
  </Box>)
}

export default ReportPage