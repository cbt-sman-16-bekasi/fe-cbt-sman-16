import {useGenerateTokenFormHook} from "./hook/useGenerateTokenFormHook.js";
import BasicCard from "../../common/BasicCard.jsx";
import Grid from "@mui/material/Grid2";
import CustomInput from "../../form/FormInputTextField.jsx";
import {Button} from "@mui/material";

const FormGenerateToken = ({onChangeGenerate}) => {
  const {
    examCode, setExamCode,
    optionExam,
    startDate, setStartDate,
    endDate, setEndDate,
    examSession, setExamSession,
    optionExamSession,
    handleGenerate
  } = useGenerateTokenFormHook({onChangeGenerate: onChangeGenerate})

  return (
    <BasicCard sx={{mb:4}}>
      <Grid container spacing={3} alignItems="center" columns={12}>
        <CustomInput label="Nama Ujian" fullWidth={true} type="text" options={optionExam} value={examCode} onChange={(c) => setExamCode(c.target.value)} placeholder="Pilih Nama Ujian" />
        <CustomInput label="Nama Sesi Ujian" fullWidth={true} type="text" options={optionExamSession} value={examSession} onChange={(c) => setExamSession(c.target.value)} placeholder="Sesi Ujian" />
      </Grid>
      <Grid container spacing={3} alignItems="center" columns={12}>
        <CustomInput label="Waktu Mulai" fullWidth={true} value={startDate} onChange={setStartDate} type="customdate"/>
        <CustomInput label="Waktu Selesai" fullWidth={true} value={endDate} onChange={setEndDate} type="customdate"/>
      </Grid>


      <Grid container spacing={2} columns={12} justifyContent="center" alignItems="center" mb={2} mt={3}>
        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='cbtPrimary' onClick={handleGenerate}>Generate Token</Button>
        </Grid>
      </Grid>
    </BasicCard>
  )
}

export default FormGenerateToken