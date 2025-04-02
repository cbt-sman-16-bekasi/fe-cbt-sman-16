import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahKodeUjian() {
  const [namaMapel, setNamaMapel] = useState('')
  const [kodeKelas, setKodeKelas] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid size={{ sm: 12, lg: 6 }} >
          <Typography variant="subtitle1" fontWeight="bold">
            Jenis Ujian
          </Typography>
          <TextField
            fullWidth
            value={namaMapel}
            onChange={(e) => setNamaMapel(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ sm: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Buat Kode Ujian
          </Typography>

          <TextField
            fullWidth
            value={kodeKelas}
            onChange={(e) => setKodeKelas(e.target.value)}
            variant="outlined"
          >
          </TextField>

        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid size={{ sm: 12, lg: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pilih Akses
          </Typography>

          <TextField
            fullWidth
            select
            value={kodeKelas}
            onChange={(e) => setKodeKelas(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="10">Admin</MenuItem>
            <MenuItem value="11">Admin</MenuItem>
            <MenuItem value="12">Admin</MenuItem>
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
