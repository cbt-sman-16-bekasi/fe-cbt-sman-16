import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import CkEditor from './CkEditor';

export default function TambahSesiUjian() {
  const [ujian, setUjian] = useState('')
  const [mapel, setMapel] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisUjian, setJenisUjian] = useState('')
  const [acakSoal, setAcakSoal] = useState('')
  const [acakJawaban, setAcakJawaban] = useState('')
  const [hasilAkhir, setHasilAkhir] = useState('')
  const [durasi, setDurasi] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Sesi Ujian
          </Typography>
          <TextField
            fullWidth
            value={ujian}
            onChange={(e) => setUjian(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Ujian
          </Typography>
          <TextField
            fullWidth
            value={mapel}
            onChange={(e) => setMapel(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Waktu Mulai
          </Typography>
          <TextField
            fullWidth
            type='date'
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Waktu Selesai
          </Typography>
          <TextField
            fullWidth
            type='date'
            value={jenisUjian}
            onChange={(e) => setJenisUjian(e.target.value)}
            variant="outlined"
          >
          </TextField>
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

    </>
  );
}
