import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import Box from "@mui/material/Box";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {ModeEditOutlined} from "@mui/icons-material";
import BasicCard from "../../../components/common/BasicCard.jsx";
import Grid from "@mui/material/Grid2";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import {useExamSessionCreateHook} from "./useExamSessionCreateHook.js";
import {Button} from "@mui/material";

export function ExamSessionCreatePage({isUpdatePage = false}) {
  const {
    name, setName,
    examCode, setExamCode,
    optionExam,
    startDate, setStartDate,
    endDate, setEndDate,
    resetForm, submitForm
  } = useExamSessionCreateHook({isUpdatePage: isUpdatePage})
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Sesi Ujian' : 'Tambah Sesi Ujian'} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{color: 'white'}} />} text="Detail Sesi Ujian" iconBackground="red" />
      <BasicCard>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <CustomInput label="Nama Sesi Ujian" fullWidth={true} type="text" value={name} onChange={(c) => setName(c.target.value)} placeholder="Sesi Ujian" />
          <CustomInput label="Nama Ujian" fullWidth={true} type="text" options={optionExam} value={examCode} onChange={(c) => setExamCode(c.target.value)} placeholder="Pilih Nama Ujian" />
        </Grid>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <CustomInput label="Waktu Mulai" fullWidth={true} value={startDate} onChange={setStartDate} type="customdate"/>
          <CustomInput label="Waktu Selesai" fullWidth={true} value={endDate} onChange={setEndDate} type="customdate"/>
        </Grid>

        <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="outlined" color='secondary'  onClick={resetForm}>Reset</Button>
          </Grid>

          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="contained" color='cbtPrimary' onClick={submitForm}>Simpan</Button>
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )
}