import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahKelas() {
  const [nuptk, setNuptk] = useState('')
  const [namaGuru, setNamaGuru] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pilihAkses, setPilihAkses] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid item size={{ lg: 6 }}>
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

        <Grid item size={{ lg: 6 }}>
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

        <Grid item size={{ lg: 6 }}>
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

        <Grid item size={{ lg: 6 }}>
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
        <Grid item size={{ lg: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pilih Akses
          </Typography>
          <TextField
            fullWidth
            select
            value={pilihAkses}
            onChange={(e) => setPilihAkses(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Super Admin">Super Admin</MenuItem>
            <MenuItem value="Guru">Guru</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white'>Reset</Button>
        </Grid>

        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success'>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}
