import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomCkEditor from './CustomCkEditor';

export default function TambahUjian({ createExams }) {
  const [ujian, setUjian] = useState('')
  const [mapel, setMapel] = useState('')
  const [kelas, setKelas] = useState('')
  const [jenisUjian, setJenisUjian] = useState('')
  const [acakSoal, setAcakSoal] = useState('')
  const [acakJawaban, setAcakJawaban] = useState('')
  const [hasilAkhir, setHasilAkhir] = useState('')
  const [durasi, setDurasi] = useState('')

  const handleSubmit = () => {
    if (!ujian || !mapel || !kelas || !jenisUjian || !acakSoal || !acakJawaban || !hasilAkhir || !durasi) {
      alert("Semua Input Wajin Diisi!")
      return
    }
    createExams({ code_type_exam: ujian, color: mapel, role: acakSoal, type_exam: jenisUjian, })
  }

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Ujian
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
            Nama Mata Pelajaran
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
            Kelas
          </Typography>
          <TextField
            fullWidth
            select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="lak-laki">Lak-Laki</MenuItem>
            <MenuItem value="perempuan">Perempuan</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Jenis Ujian
          </Typography>
          <TextField
            fullWidth
            select
            value={jenisUjian}
            onChange={(e) => setJenisUjian(e.target.value)}
            variant="outlined"
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='11'>11</MenuItem>
            <MenuItem value='12'>12</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid size={{ lg: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Deskripsi Ujian
          </Typography>

          <CustomCkEditor type="classic" />

        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Acak Soal
          </Typography>
          <TextField
            fullWidth
            select
            value={acakSoal}
            onChange={(e) => setAcakSoal(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="ya">Ya</MenuItem>
            <MenuItem value="tidak">Tidak</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Acak Jawaban
          </Typography>
          <TextField
            fullWidth
            select
            value={acakJawaban}
            onChange={(e) => setAcakJawaban(e.target.value)}
            variant="outlined"
          >
            <MenuItem value='ya'>Ya</MenuItem>
            <MenuItem value='tidak'>Tidak</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Tampilkan Hasil Akhir
          </Typography>
          <TextField
            fullWidth
            select
            value={hasilAkhir}
            onChange={(e) => setHasilAkhir(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="ya">Ya</MenuItem>
            <MenuItem value="tidak">Tidak</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Durasi
          </Typography>
          <TextField
            fullWidth
            value={durasi}
            onChange={(e) => setDurasi(e.target.value)}
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
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit}>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}

TambahUjian.propTypes = {
  createExams: PropTypes.func.isRequired,
}