import {useDetailBankQuestionHook} from "./useDetailBankQuestionHook.js";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {
  DocumentScannerSharp,
  DownloadOutlined,
  InfoSharp, UploadFile,
  UploadFileOutlined
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import BasicCard from "../../../components/common/BasicCard.jsx";
import DetailItem from "../../../components/common/DetailItem.jsx";
import Grid from "@mui/material/Grid2";
import ApiTable from "../../../components/ApiTable.jsx";
import {Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UploadFileDialog from "../../../components/common/UploadFileDialog.jsx";

const DetailBankQuestionPage = () => {
  const {
    subject,
    classCode,
    typeQuestion,
    code,
    totalQuestion,
    isRefresh,
    columns,
    handleEdit,
    handleDelete,
    userRole,
    navigate,
    openUpload, setOpenUpload,
    handleDownloadTemplate,
    handleUpload
  } = useDetailBankQuestionHook()

  columns.push({ field: "question", headerName: "SOAL", flex: 0.1, minWidth: 50, renderCell: (row) => (<div dangerouslySetInnerHTML={{ __html: row.question }} />)})
  columns.push({ field: "answer_single", headerName: "JAWABAN", flex: 0.1, minWidth: 50, renderCell: (row) => (<div dangerouslySetInnerHTML={{ __html: row.answer_single }} />)})

  const messageConfirmDelete = () => {
    return (<>
      <strong>Apakah anda yakin ingin menghapus soal ini ?</strong>
    </>)
  }

  columns.push({
    field: "aksi",
    headerName: "AKSI",
    flex: 1,
    minWidth: 150,
    renderCell: (row) => {
      return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", height: "100%" }}>
          {/* Tombol Edit */}
          <IconButton
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkviolet" },
            }}
            onClick={() => handleEdit(row.ID)}
          >
            <EditIcon />
          </IconButton>

          {/* Tombol Delete */}
          <IconButton
            size="small"
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "darkred" },
            }}
            onClick={() => handleDelete(messageConfirmDelete(), row.ID)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
  })
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<InfoSharp sx={{color: 'white'}} />} text="Detail Bank Soal" iconBackground="red" />
      <BasicCard sx={{mb:4, padding: '40px'}}>
        <DetailItem label="Mata Pelajaran" value={subject} />
        <DetailItem label="Kode Kelas" value={classCode} />
        <DetailItem label="Jumlah Soal" value={totalQuestion} />
        <DetailItem label="Jenis Soal" value={typeQuestion ?? '-'} />
      </BasicCard>
      <TitleWithIcon icon={<DocumentScannerSharp sx={{color: 'white'}} />} text="Soal Ujian" iconBackground="red" />
      <BasicCard>
        <Grid container spacing={2} columns={12} justifyContent="space-between" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 2 }} sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <Button fullWidth variant="contained" color='cbtPrimary' onClick={() => navigate(`/${userRole}/bank-soal/${code}/detail/question/create?typeQuestion=${typeQuestion.replaceAll(' ', '_')}`)} startIcon={<AddBoxOutlinedIcon/>}>Tambah Soal</Button>
          </Grid>
          <Grid size={{ lg: 3 }} sx={{display: "flex", flexDirection: "row", gap: 2}}>
            <Button fullWidth variant="contained" color='warning' disabled startIcon={<UploadFileOutlined/>} onClick={() => setOpenUpload(true)}>Import Soal</Button>
            <Button fullWidth variant="contained" color='success' disabled startIcon={<DownloadOutlined/>} onClick={() => handleDownloadTemplate()}>Download Sample</Button>
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
            <ApiTable url={`/academic/bank/question/${code}`} pageSize={10} columns={columns} isPagination={false} isRefresh={isRefresh} />
          </Grid>
        </Grid>
      </BasicCard>



      <UploadFileDialog
        title={<TitleWithIcon text="Upload File" icon={<UploadFile sx={{color: 'white'}} />} iconBackground="red" />}
        subTitle="Silahkan untuk mengimpor Soal. Pastikan data yang Anda masukkan sesuai dengan template yang telah disediakan!. Jika Anda belum memiliki template, harap unduh template yang tersedia"
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUpload={handleUpload}
        accept=".docx"
      />
    </Box>
  )
}

export default DetailBankQuestionPage