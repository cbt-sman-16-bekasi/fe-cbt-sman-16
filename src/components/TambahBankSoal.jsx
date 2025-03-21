import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahBankSoal({ setError }) {
  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [namakelas, setNamakelas] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ sm: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Mata Pelajaran
          </Typography>
          <TextField
            fullWidth
            select
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            variant="outlined"
          >
            <MenuItem value='Matematika'>Matematika</MenuItem>
            <MenuItem value='Bahasa'>Bahasa Indonesia</MenuItem>
            <MenuItem value='IPA'>IPA</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ sm: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Kode Kelas
          </Typography>
          <TextField
            fullWidth
            select
            value={namaSiswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            variant="outlined"
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='11'>11</MenuItem>
            <MenuItem value='12'>12</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ sm: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Jumlah Soal
          </Typography>
          <TextField
            fullWidth
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => setError()}>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success'>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}
