import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Alert, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { columns, rows } from "../internals/data/ujianData";
import { Link } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';

export default function BankSoal() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Bank Soal
      </Typography>

      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Perhatian!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Bank Soal adalah fitur yang menyimpan semua soal dari setiap ujian dan sesi ujian yang telah di buat:
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'
              }}
            >
              <Box component="li"><Typography variant="body2"><b>Penyimpanan Soal:</b> Semua soal dari setiap ujian dan sesi ujian yang dibuat akan disimpan dalam Bank Soal.</Typography></Box>
              <Box component="li"><Typography variant="body2"><b>Penggunaan Kembali:</b> Soal-soal yang ada dalam Bank Soal dapat digunakan kembali untuk ujian di masa mendatang.</Typography></Box>
              <Box component="li"><Typography variant="body2"><b>Penambahan Soal:</b> Bapak/Ibu dapat menambahkan soal baru ke dalam Bank Soal untuk memperkaya koleksi soal.</Typography></Box>
            </Box>
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid item size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to='/bank-soal/tambah'>
            <Button fullWidth variant="contained"><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
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
