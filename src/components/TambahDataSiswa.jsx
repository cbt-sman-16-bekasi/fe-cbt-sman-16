import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahDataSiswa({ setError }) {
  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [namakelas, setNamakelas] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid item size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            NISN
          </Typography>
          <TextField
            fullWidth
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid item size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Siswa
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

        <Grid item size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Jenis Kelamin
          </Typography>
          <TextField
            fullWidth
            select
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="lak-laki">Lak-Laki</MenuItem>
            <MenuItem value="perempuan">Perempuan</MenuItem>
          </TextField>
        </Grid>

        <Grid item size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Kelas
          </Typography>
          <TextField
            fullWidth
            select
            value={namakelas}
            onChange={(e) => setNamakelas(e.target.value)}
            variant="outlined"
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='11'>11</MenuItem>
            <MenuItem value='12'>12</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="start" mb={4} direction='column'>

        <Grid item>
          <Typography variant="subtitle1" fontWeight="bold">
            Keterangan:
          </Typography>
        </Grid>

        <Grid item container spacing={2} alignItems="center" size={{ lg: 12 }}>
          <Grid item size={{ lg: 1.5 }}>
            <Chip
              label="Super Admin"
              sx={{
                backgroundColor: "rgba(138, 43, 226, 0.2)",
                color: "purple",
                border: "1px solid purple",
                fontWeight: "bold",
              }}
            />
          </Grid>
          <Grid item size={{ lg: 6 }}>
            <Typography variant="body2">Dapat Mengakses Semua Fitur</Typography>
          </Grid>
        </Grid>

        <Grid item container spacing={2} alignItems="center" size={{ lg: 12 }}>
          <Grid item size={{ lg: 1.5 }}>
            <Chip
              label="Guru"
              sx={{
                backgroundColor: "rgba(255, 223, 0, 0.2)",
                color: "goldenrod",
                border: "1px solid goldenrod",
                fontWeight: "bold",
              }}
            />
          </Grid>
          <Grid item size={{ lg: 6 }}>
            <Typography variant="body2">Dapat Mengakses Ujian</Typography>
          </Grid>
        </Grid>

      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => setError()}>Reset</Button>
        </Grid>

        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success'>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}
