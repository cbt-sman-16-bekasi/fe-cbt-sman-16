import Grid from "@mui/material/Grid2";
import {Button, Dialog} from '@mui/material';
import {useModalExamCorrection} from "./hook/useModalExamCorrection.js";
import TitleWithIcon from "../../common/TitleWithIcon.jsx";
import {PencilLine} from "lucide-react";
import Box from "@mui/material/Box";
import DetailItem from "../../common/DetailItem.jsx";
import BasicCard from "../../common/BasicCard.jsx";
import Typography from "@mui/material/Typography";
import CustomInput from "../../form/FormInputTextField.jsx";

export default function ModalExamCorrection({ open, setHide, row, dataSession, isRefresh, isRefreshTable }) {

  const {
    answerStudent,
    setScore,
    finalScore,
    submitCorrectionScore
  } = useModalExamCorrection({row: row, dataSession: dataSession, setRefreshData: isRefresh, setHide: setHide, isRefreshTable: isRefreshTable})
  return (
    <Dialog open={open} onClose={() => setHide(false)} fullWidth maxWidth="lg"
            PaperProps={{
              sx: {
                marginTop: 4, // jarak dari atas
                alignSelf: 'flex-start', // posisikan ke atas
                borderRadius: 2,
              },
            }}>
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <TitleWithIcon icon={<PencilLine sx={{ color: 'white' }} />} text='Koreksi Jawaban' iconBackground="red" />
      </Grid>


      <BasicCard sx={{mb:4, padding: '20px', ml: 3, mr: 3}}>
        <DetailItem label="NISN" value={row?.nisn ?? '-'} />
        <DetailItem label="Nama Siswa" value={row?.name ?? '-'} />
        <DetailItem label="Kelas" value={row?.class ?? '-'} />
      </BasicCard>

      <BasicCard sx={{mb:4, padding: '20px', ml: 3, mr: 3, maxHeight: '500px', overflow: 'auto'}}>
        {answerStudent?.map((a,i) => {
          return (
            <Box
              key={i}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 3,
                mb: 4,
                backgroundColor: '#fafafa',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Soal {i + 1}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: a.question }} />

              <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ pr: { md: 1 } }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Jawaban User
                    </Typography>
                    <Box
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        p: 2,
                        minHeight: 100,
                        backgroundColor: '#fff',
                        width: '100'
                      }}
                    >
                      <Typography sx={{fontStyle: 'italic', color: 'red'}} dangerouslySetInnerHTML={{ __html: a.answer_user	 }} />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Kunci Jawaban
                    </Typography>
                    <Box
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        p: 2,
                        minHeight: 100,
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography sx={{fontStyle: 'italic', color: 'green'}} dangerouslySetInnerHTML={{ __html: a.answer_single }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  mt: 3,
                }}
              >
                <CustomInput label="Nilai" fullWidth={true} type="number" max={dataSession?.exam?.total_score} value={a.score} onChange={(s) => setScore(s?.target?.value, i)} placeholder="0" />
              </Box>
            </Box>)
        })}
      </BasicCard>
      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
        <Typography sx={{fontWeight: 'bold'}}>
          NILAI AKHIR <Typography sx={{ color: 'red', fontWeight: 'bold'}}>{finalScore}</Typography>
        </Typography>
        <Button sx={{ display: 'flex', mx: 2}} variant="contained" color='info' onClick={submitCorrectionScore}>
          Simpan
        </Button>
      </Grid>

    </Dialog >
  );
}
