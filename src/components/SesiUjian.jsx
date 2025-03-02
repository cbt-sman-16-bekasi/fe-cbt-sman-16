import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Alert, Button, InputAdornment, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { columns, rows } from "../internals/data/sesiUjianData";

export default function SesiUjian() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Setting Sesi Ujian
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Setting sesi ujian digunakan untuk <b>menjadwalkan waktu pelaksanaan ujian</b>. Anda dapat menentukan kapan ujian akan dimulai dan kapan ujian akan berakhir. Pastikan untuk mengatur waktu dengan tepat agar semua peserta dapat mengikuti ujian sesuai jadwal yang telah ditentukan.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Sesi Ujian
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid item size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained"><AddBoxOutlinedIcon /> Tambah</Button>
        </Grid>
        <Grid item lg={4}>
          <TextField
            variant="outlined"
            placeholder="Cari Berdasarkan..."
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

      </Grid>
      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
