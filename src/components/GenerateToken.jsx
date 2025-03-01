import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Alert, Button, Card, CardContent, MenuItem, Paper, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { columns, rows } from "../internals/data/generateTokenData";
import { useState } from 'react';

export default function GenerateToken() {
  const [token, setToken] = useState(0);
  const [masaAktif, setMasaAktif] = useState("");
  const [ujian, setUjian] = useState("");

  const handleGenerateToken = () => {
    setToken(Math.floor(100000 + Math.random() * 900000));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Generate Token Ujian
      </Typography>

      <Typography component="h3" variant="h3" sx={{ mb: 3 }}>
        Generate Token
      </Typography>

      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="info" sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Perhatian!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Silahkan klik Generate Token untuk dapat mendapatkan token yang akan diberikan ke siswa. Masa aktif token berlaku selama satu hari.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ flexGrow: 1, my: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            Token Test
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 1,
              p: 2,
              bgcolor: "#FFFDE7",
              border: "1px solid #FFEB3B",
              borderRadius: 1,
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" fontWeight="bold" color='black'>
              {token}
            </Typography>
          </Paper>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ flexGrow: 1, my: 4 }}>
        <CardContent>
          {/* Form Section */}
          <Grid container spacing={3} alignItems="center" columns={12}>
            {/* Masa Aktif */}
            <Grid item size={{ lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Masa Aktif
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

            {/* Daftar Tes */}
            <Grid item size={{ lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Daftar Tes
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

        {/* Generate Button */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "purple",
              color: "white",
              fontWeight: "bold",
              px: 6,
              py: 3.5,
              fontSize: "16px",
              "&:hover": { backgroundColor: "darkviolet" },
            }}
            onClick={handleGenerateToken}
          >
            Generate Token
          </Button>
        </Box>
      </Card>


      <Typography component="h3" variant="h3" sx={{ mb: 3 }}>
        Daftar Token
      </Typography>

      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
