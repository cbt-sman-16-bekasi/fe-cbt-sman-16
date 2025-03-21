import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

export default function TambahKelas({ setError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid size={{ sm: 12, lg: 6 }} >
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

        <Grid size={{ sm: 12, lg: 6 }}>
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

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={2}>
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
