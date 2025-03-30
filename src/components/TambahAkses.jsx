import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TambahAkses({ addAccess, setError }) {
  const [nuptk, setNuptk] = useState('')
  const [namaGuru, setNamaGuru] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [akses, setAkses] = useState('')

  const handleSubmit = () => {
    if (!nuptk || !namaGuru || !username || !password || !akses) {
      alert('Semua Input Wajib Diisi!')
      return
    }
    addAccess({ name: namaGuru, nuptk: nuptk, role: akses.toUpperCase(), username: username })
  }

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            NUPTK
          </Typography>
          <TextField
            fullWidth
            value={nuptk}
            onChange={(e) => setNuptk(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Guru
          </Typography>
          <TextField
            fullWidth
            value={namaGuru}
            onChange={(e) => setNamaGuru(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Username
          </Typography>
          <TextField
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Password
          </Typography>
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid size={{ lg: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pilih Akses
          </Typography>
          <TextField
            fullWidth
            select
            value={akses}
            onChange={(e) => setAkses(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Guru">Guru</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="start" mb={4} direction='column'>

        <Grid >
          <Typography variant="subtitle1" fontWeight="bold">
            Keterangan:
          </Typography>
        </Grid>

        <Grid container spacing={2} alignItems="center" size={{ lg: 12 }}>
          <Grid size={{ lg: 1.5 }}>
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
          <Grid size={{ lg: 6 }}>
            <Typography variant="body2">Dapat Mengakses Semua Fitur</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" size={{ lg: 12 }}>
          <Grid size={{ lg: 1.5 }}>
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
          <Grid size={{ lg: 6 }}>
            <Typography variant="body2">Dapat Mengakses Ujian</Typography>
          </Grid>
        </Grid>

      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => setError()}>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit}>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}

TambahAkses.propTypes = {
  addAccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}