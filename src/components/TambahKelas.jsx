import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TambahKelas({ createClass, setError }) {
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = () => {
    if (!classCode || !className) {
      alert("Kode kelas dan nama kelas harus diisi!");
      return;
    }
    createClass({ class_code: classCode, class_name: className });
  };

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid size={{ sm: 12, lg: 6 }} >
          <Typography variant="subtitle1" fontWeight="bold">
            Kode Kelas
          </Typography>
          <TextField
            fullWidth
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid size={{ sm: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Kelas
          </Typography>
          <TextField
            fullWidth
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={2}>
        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => setError()}>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit}>
            Simpan
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

TambahKelas.propTypes = {
  createClass: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}