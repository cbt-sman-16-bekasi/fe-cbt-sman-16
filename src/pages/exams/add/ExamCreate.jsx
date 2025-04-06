import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import {Button, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {ModeEditOutlined} from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import {useExamCreateHook} from "./useExamCreateHook.js";
import TiptapEditor from "../../../components/form/TiptapEditor.jsx";
import PropTypes from "prop-types";

export function ExamCreate({isUpdatePage = false}) {
  const {
    optionsTypeQuestion,
    optionsTrueOrFalse,
    typeQuestion, setTypeQuestion,
    score, setScore,
    randomQuestion, setRandomQuestion,
    randomAnswer, setRandomAnswer,
    duration, setDuration,
    showResult, setShowResult,
    name, setName,
    subject, setSubject,
    classCode, setClassCode,
    description, setDescription,
    optionSubject,
    optionsClass,
    optionsTypeExam,
    typeExam, setTypeExam,
    handleSubmitCreate,
    resetForm
  } = useExamCreateHook({updatePage: isUpdatePage})
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Ujian' : 'Tambah Ujian'} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{color: 'white'}} />} text="Detail Ujian" iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Nama Ujian" fullWidth={true} type="text" value={name} onChange={(c) => setName(c.target.value)} placeholder="Ujian Akhir Sekolah"/>
            <CustomInput label="Nama Mata Pelajaran" fullWidth={true} options={optionSubject} value={subject}
                         onChange={(c) => setSubject(c.target.value)}
                         placeholder="Nama Mata Pelajaran"/>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Kelas" fullWidth={true} multiple={true} options={optionsClass} value={classCode} onChange={(c) => setClassCode(c.target.value)} placeholder="Kelas"/>
            <CustomInput label="Jenis Ujian" fullWidth={true} options={optionsTypeExam} value={typeExam} onChange={(c) => setTypeExam(c.target.value)} placeholder="UH"/>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Deskripsi Ujian
              </Typography>
              <TiptapEditor label="Deskripsi Ujian" value={description} onChange={(html) => setDescription(html)} />

            </Grid>
            {/*<h3>Preview HTML:</h3>*/}
            {/*<div dangerouslySetInnerHTML={{ __html: description }} />*/}
          </Grid>
        </CardContent>
      </Card>

      <TitleWithIcon icon={<ModeEditOutlined sx={{color: 'black'}} />} text="Setting Ujian" iconBackground="yellow" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Jenis Soal" fullWidth={true} options={optionsTypeQuestion} value={typeQuestion} onChange={(c) => setTypeQuestion(c.target.value)}/>
            <CustomInput label="Bobot Soal" placeholder="0" type="number" value={score} onChange={(c) => setScore(parseInt(c.target.value))}  fullWidth={true} />
          </Grid>
          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Acak Soal" fullWidth={true} options={optionsTrueOrFalse} onChange={(c) => setRandomQuestion(c.target.value)}  value={randomQuestion}/>
            <CustomInput label="Acak Jawaban" fullWidth={true} options={optionsTrueOrFalse} onChange={(c) => setRandomAnswer(c.target.value)}  value={randomAnswer}/>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Tampilkan Hasil Akhir" fullWidth={true} options={optionsTrueOrFalse} value={showResult} onChange={(c) => setShowResult(c.target.value)}/>
            <CustomInput label="Durasi (Menit)" fullWidth={true} type="number" value={duration} onChange={(c) => setDuration(parseInt(c.target.value))}/>
          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2} mt={3}>
            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="outlined" color='secondary'  onClick={resetForm}>Reset</Button>
            </Grid>

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" color='cbtPrimary' onClick={handleSubmitCreate}>Simpan</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

ExamCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}