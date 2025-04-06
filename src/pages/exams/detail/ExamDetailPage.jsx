import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {DocumentScannerSharp, DownloadOutlined, InfoSharp, UploadFileOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import BasicCard from "../../../components/common/BasicCard.jsx";
import DetailItem from "../../../components/common/DetailItem.jsx";
import {Button, Chip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {useExamDetailHook} from "./useExamDetailHook.jsx";
import ApiTable from "../../../components/ApiTable.jsx";

const ExamDetailPage = () => {

  const {
    id,
    name, typeExam, subject,
    duration,
    classCode,
    totalQuestion,
    totalScore,
    columns,
    navigate,
    userRole,
    examCode,
    typeQuestion,
    isRefreshList
  } = useExamDetailHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<InfoSharp sx={{color: 'white'}} />} text="Detail Ujian" iconBackground="red" />
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
        <DetailItem label="Durasi (Menit)" value={duration} />
        <DetailItem label="Jumlah Soal" value={totalQuestion} />
        <DetailItem label="Total Nilai" value={totalScore} />
      </BasicCard>

      <TitleWithIcon icon={<DocumentScannerSharp sx={{color: 'white'}} />} text="Soal Ujian" iconBackground="red" />
      <BasicCard>
        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="contained" color='cbtPrimary' onClick={() => navigate(`/${userRole}/ujian/${id}/detail/question/create?examCode=${examCode}&typeQuestion=${typeQuestion}`)} startIcon={<AddBoxOutlinedIcon/>}>Tambah Soal</Button>
          </Grid>
          <Grid size={{ lg: 3 }} sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <Button fullWidth variant="contained" color='warning' startIcon={<UploadFileOutlined/>}>Import Soal</Button>
            <Button fullWidth variant="contained" color='success' startIcon={<DownloadOutlined/>}>Download Sample</Button>
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
            <ApiTable url={`/academic/exam/${id}/question`} pageSize={10} columns={columns} isPagination={false} isRefresh={isRefreshList} />
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )

}

export default ExamDetailPage