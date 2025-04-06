import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {ModeEditOutlined} from "@mui/icons-material";
import PropTypes from "prop-types";
import {useExamCreateQuestionHook} from "./useExamCreateQuestionHook.js";
import BasicCard from "../../../components/common/BasicCard.jsx";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import Typography from "@mui/material/Typography";
import TiptapEditor from "../../../components/form/TiptapEditor.jsx";

export function ExamCreateQuestionPage({isUpdatePage = false}) {
  const {
    score, setScore,
    question, setQuestion,
    answer, setAnswer,
    optionA, setOptionA,
    optionB, setOptionB,
    optionC, setOptionC,
    optionD, setOptionD,
    optionE, setOptionE,
    typeQuestion,
    optionAnswer,
    handleSubmitCreate,
  } = useExamCreateQuestionHook({updatePage: isUpdatePage})
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Soal' : 'Tambah Soal'} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{color: 'white'}} />} text="Detail Soal" iconBackground="red" />
      <BasicCard>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <CustomInput label="Bobot Soal" placeholder="0" type="number" value={score} onChange={(c) => setScore(parseInt(c.target.value))}  fullWidth={true} />
          <CustomInput label="Jawaban" fullWidth={true} options={optionAnswer} value={answer} onChange={(c) => setAnswer(c.target.value)}/>
        </Grid>
        <Grid container spacing={3} alignItems="center" columns={12}>
          <Grid size={{ lg: 12 }}>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
              Pertanyaan
            </Typography>
            <TiptapEditor label="Pertanyaan" value={question} onChange={(html) => setQuestion(html)} />
          </Grid>
          {typeQuestion === 'ESSAY' ? (<>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Jawaban General
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionA} onChange={(html) => setOptionA(html)} />
            </Grid>
          </>) : (<>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Pilhan A
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionA} onChange={(html) => setOptionA(html)} />
            </Grid>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Pilhan B
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionB} onChange={(html) => setOptionB(html)} />
            </Grid>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Pilhan C
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionC} onChange={(html) => setOptionC(html)} />
            </Grid>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Pilhan D
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionD} onChange={(html) => setOptionD(html)} />
            </Grid>
            <Grid size={{ lg: 12 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Pilhan E
              </Typography>
              <TiptapEditor label="Pertanyaan" value={optionE} onChange={(html) => setOptionE(html)} />
            </Grid>
          </>)}
        </Grid>

        <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2} mt={3}>
          <Grid size={{ lg: 1.5 }}>
            <Button fullWidth variant="contained" color='cbtPrimary' onClick={handleSubmitCreate}>Simpan</Button>
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )
}

ExamCreateQuestionPage.propTypes = {
  isUpdatePage: PropTypes.bool
}