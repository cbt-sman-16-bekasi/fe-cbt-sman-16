import { Box, Button, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router";
import Copyright from "../internals/components/Copyright";
import ExamQuestionList from "./ExamQuestionList";


function AddQuestions() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      if (location.pathname.includes("/akses-system")) {
        navigate("/akses-system");
      } else if (location.pathname.includes("/kelas")) {
        navigate("/kelas");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h2" sx={{ mb: 5 }}>
        Tambah Soal
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={6}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={6}>
        <Grid size={{ sm: 12 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <ExamQuestionList />
        </Grid>
      </Grid>


      <Copyright sx={{ my: 4 }} />
    </Box>
  )
}

export default AddQuestions
