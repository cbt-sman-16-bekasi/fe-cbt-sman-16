import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveTypeExams } from '../states/typeExams/action';
import { cbtColor } from '../../shared-theme/themePrimitives';

export default function TambahKodeUjian({ alert, roles, addTypeExams }) {
  const typeExams = useSelector((state) => state.typeExams.typeExams)

  const [namaUjian, setNamaUjian] = useState('')
  const [kodeKelas, setKodeKelas] = useState('')
  const [akses, setAkses] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveTypeExams({size: 1000}))
  }, [dispatch])

  function resetInputs() {
    setNamaUjian('')
    setKodeKelas('')
    setAkses('')
    setSelectedColor('')
  }

  const handleSubmit = async () => {
    if (!namaUjian || !kodeKelas) {
      alert('error', "Kode kelas dan nama kelas harus diisi!");
      return;
    }

    let duplicateCode = false;
    let duplicateName = false;

    if (Array.isArray(typeExams.records)) {
      typeExams.records.forEach((typeExam) => {
        if (typeExam.code.toLowerCase() === kodeKelas.toLowerCase()) {
          duplicateCode = true;
        }
        if (typeExam.name.trim().toLowerCase() === namaUjian.trim().toLowerCase()) {
          duplicateName = true;
        }
      });
    }

    if (duplicateCode || duplicateName) {
      let message = "Terdeteksi duplikasi:\n";
      if (duplicateCode) message += "- Kode ujian sudah digunakan.\n";
      if (duplicateName) message += "- Nama jenis ujian sudah digunakan.\n";
      message += "Silakan gunakan kode atau nama yang berbeda.";

      alert('error', message);
      return;
    }

    setIsSubmitting(true);
    try {
      await addTypeExams({ code_type_exam: kodeKelas, color: selectedColor, role: akses.toUpperCase(), type_exam: namaUjian });
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
            Jenis Ujian
          </Typography>
          <TextField
            fullWidth
            value={namaUjian}
            onChange={(e) => setNamaUjian(e.target.value)}
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
            value={akses}
            onChange={(e) => setAkses(e.target.value)}
            variant="outlined"
          >
            {roles.filter((role) => role.code !== 'STUDENT').map((role) => (
              <MenuItem key={role.ID} value={role.code}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>

        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" fontWeight="bold">Warna</Typography>
        </Grid>

        {Object.values(cbtColor.accents).slice(0, -2).map((color) => {
          const isSelected = selectedColor === color;
          return (
            <Grid key={color}>
              <Button
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: isSelected ? color : alpha(color, 0.6),
                  borderRadius: 2,
                  border: `2px solid ${color}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: color,
                  }
                }}
                onClick={() => setSelectedColor(color)}
              />
            </Grid>
          );
        })}

      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
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

TambahKodeUjian.propTypes = {
  alert: PropTypes.func.isRequired,
  roles: PropTypes.string.isRequired,
  addTypeExams: PropTypes.func.isRequired,
}