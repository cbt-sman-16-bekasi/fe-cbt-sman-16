import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Alert, Card, CardContent, MenuItem, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { columns, rows } from "../internals/data/laporanNilaiData";
import { useState } from 'react';

export default function LaporanNilai() {
  const [masaAktif, setMasaAktif] = useState("");
  const [ujian, setUjian] = useState("");

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

      <Typography component="h3" variant="h3" sx={{ mb: 3, mt: 5 }}>
        Generate Laporan Nilai
      </Typography>

      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ lg: 12 }}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="outlined"
            severity="info"
            sx={{ p: 2 }}
          >
            <Typography variant="h6" fontWeight="bold">
              Perhatian!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Bapak dan Ibu dapat mengunduh hasil ujian peserta dengan langkah-langkah berikut:
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
              <Box component="li"><Typography variant="body2">Cari &quot;Nama Ujian&quot;.</Typography></Box>
              <Box component="li"><Typography variant="body2">Cari &quot;Sesi Ujian&quot;.</Typography></Box>
              <Box component="li"><Typography variant="body2">Klik Enter untuk mencari ujian yang sesuai.</Typography></Box>
              <Box component="li"><Typography variant="body2">Klik tombol &quot;Download&quot;  yang tersedia di samping nama ujian tersebut.</Typography></Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Dengan mengikuti langkah-langkah di atas, Anda akan mendapatkan laporan nilai peserta dengan mudah.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ flexGrow: 1, my: 4 }}>
        <CardContent>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama Ujian
              </Typography>
              <TextField
                fullWidth
                select
                value={masaAktif}
                onChange={(e) => setMasaAktif(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="30 Menit">30 Menit</MenuItem>
                <MenuItem value="60 Menit">60 Menit</MenuItem>
                <MenuItem value="120 Menit">120 Menit</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Sesi Ujian
              </Typography>
              <TextField
                fullWidth
                select
                value={ujian}
                onChange={(e) => setUjian(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="UH Bahasa Inggris">UH Bahasa Inggris</MenuItem>
                <MenuItem value="UTS Matematika">UTS Matematika</MenuItem>
                <MenuItem value="UAS Fisika">UAS Fisika</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid columns={columns} rows={rows} />
        </Grid>
      </Grid>

    </Box>
  );
}
