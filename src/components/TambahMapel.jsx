import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahMapel({ setError }) {
  const [namaMapel, setNamaMapel] = useState('')
  const [kodeKelas, setKodeKelas] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid item size={{ sm: 12, lg: 6 }} >
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Mata Pelajaran
          </Typography>
          <TextField
            fullWidth
            value={namaMapel}
            onChange={(e) => setNamaMapel(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid item size={{ sm: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Kode Kelas
          </Typography>

          <TextField
            fullWidth
            select
            value={kodeKelas}
            onChange={(e) => setKodeKelas(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
          </TextField>

        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={2}>
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
