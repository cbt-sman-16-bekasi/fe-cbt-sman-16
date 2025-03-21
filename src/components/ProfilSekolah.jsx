import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Upload } from '@mui/icons-material';

export default function ProfilSekolah() {
  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [namakelas, setNamakelas] = useState('')
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Informasi Sekolah
      </Typography>

      <Typography component="h3" variant="h3" sx={{ mb: 3 }}>
        Profil Sekolah
      </Typography>

      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={2} alignItems="center" columns={12}>
            <Grid size={{ lg: 2 }}>

              <Card variant="outlined" sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1 }}>
                <CardContent>
                  <img src="/logo-sman16.png" alt="Logo Sekolah" />
                </CardContent>
              </Card>

            </Grid>

            <Grid size={{ lg: 9 }}>

              <Stack spacing={1.3} direction="row" alignItems="center">

                <Button variant="contained" >
                  Ganti Logo
                </Button>

                <Button variant="outlined" color="error">
                  Hapus
                </Button>

              </Stack>
              <Typography variant="caption" sx={{ color: "gray", mt: 1 }}>
                Image size 1080 × 1080 pixels. JPG and PNG files.
              </Typography>

            </Grid>
          </Grid>


          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama Sekolah
              </Typography>
              <TextField
                fullWidth
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Jenjang
              </Typography>
              <TextField
                fullWidth
                value={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NSS
              </Typography>
              <TextField
                fullWidth
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NPSN
              </Typography>
              <TextField
                fullWidth
                value={namakelas}
                onChange={(e) => setNamakelas(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nomor Telepon
              </Typography>
              <TextField
                fullWidth
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <TextField
                fullWidth
                value={namakelas}
                onChange={(e) => setNamakelas(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ lg: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Alamat Sekolah
              </Typography>
              <TextField
                fullWidth
                multiline
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ lg: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Banner
              </Typography>
              <Card fullWidth>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2 w-full h-40 relative">

                  <Upload className="w-10 h-10 " />
                  <Typography variant="body1" className="text-gray-700 font-medium">
                    Upload File Data Disini
                  </Typography>
                  <label htmlFor="fileUpload" className="text-purple-600 hover:underline text-sm cursor-pointer">
                    Upload File berbentuk Excel / CSV
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".csv, .xls, .xlsx"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />

                </CardContent>
              </Card>
              {file && (
                <Typography variant="body2" className="mt-2 text-gray-600 text-center">
                  File: {file.name}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" className='bg-slate-800 text-white'>Reset</Button>
            </Grid>

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" color='success'>Simpan</Button>
            </Grid>
          </Grid>


        </CardContent>
      </Card>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
