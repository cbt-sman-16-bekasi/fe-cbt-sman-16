import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {ModeEditOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import BasicCard from "../../../components/common/BasicCard.jsx";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import Grid from "@mui/material/Grid2";
import {useBankQuestionCreateHook} from "./useBankQuestionCreateHook.js";
import {Button} from "@mui/material";

const BankQuestionCreatePage = ({isUpdatePage = false}) => {
  const {
    subject,
    setSubject,
    setClassCode,
    optionSubject,
    optionsClass,
    classCode,
    optionsTypeQuestion,
    typeQuestion, setTypeQuestion,
    handleSubmitCreate,
    resetForm
  } = useBankQuestionCreateHook({isUpdatePage})
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Bank Soal' : 'Tambah Bank Soal'} />
      <TitleWithIcon icon={<ModeEditOutlined sx={{color: 'white'}} />} text="Detail Bank Soal" iconBackground="red" />
      <BasicCard>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <CustomInput label="Nama Mata Pelajaran" fullWidth={true} options={optionSubject} value={subject}
                       onChange={(c) => setSubject(c.target.value)}
                       placeholder="Nama Mata Pelajaran"/>
          <CustomInput label="Kode Kelas" fullWidth={true} type="text" value={classCode} options={optionsClass}
                       onChange={(c) => setClassCode(c.target.value)} placeholder="Kode Kelas"/>
        </Grid>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <CustomInput label="Jenis Soal" fullWidth={true} options={optionsTypeQuestion} value={typeQuestion}
                       onChange={(c) => setTypeQuestion(c.target.value)}
                       placeholder="Jenis Soal"/>
        </Grid>
        <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="outlined" color='secondary'  onClick={resetForm}>Reset</Button>
          </Grid>

          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="contained" color='cbtPrimary' onClick={handleSubmitCreate}>Simpan</Button>
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )
}

export default BankQuestionCreatePage