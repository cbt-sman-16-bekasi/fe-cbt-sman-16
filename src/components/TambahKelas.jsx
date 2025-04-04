import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function TambahKelas({ alert, classCodes, createClass }) {
  const classes = useSelector((state) => state.classes.classes)

  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetInputs() {
    setClassCode('');
    setClassName('');
  }

  const handleSubmit = async () => {
    if (!classCode || !className) {
      alert('error', "Kode kelas dan nama kelas harus diisi!");
      return;
    }

    if (!classes || !classes.records) {
      alert('error', "Data kelas belum dimuat, coba lagi.");
      return;
    }

    const isDuplicate = classes.records.some(
      (kelas) =>
        kelas.classCode.toString() === classCode.toString() &&
        kelas.className.trim().toLowerCase() === className.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert('error', "Nama kelas ini sudah ada dalam kode kelas yang sama! Gunakan nama lain.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createClass({ class_code: classCode, class_name: className });
      resetInputs();
    } catch (error) {
      console.error("Error saat menambahkan kelas:", error);
      alert("Gagal menambahkan kelas, coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
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
            select
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            variant="outlined"
          >
            {classCodes.map((classCode) => (
              <MenuItem key={classCode.code} value={classCode.code}>
                {classCode.name}
              </MenuItem>
            ))}
          </TextField>
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
          <Button fullWidth variant="contained" className='bg-slate-800 text-white'>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

TambahKelas.propTypes = {
  alert: PropTypes.func.isRequired,
  classCodes: PropTypes.object.isRequired,
  createClass: PropTypes.func.isRequired,
}