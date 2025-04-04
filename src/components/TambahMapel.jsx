import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function TambahMapel({ alert, classCodes, subjectCodes, addSubject }) {
  const subjects = useSelector((state) => state.subjects.subjects)

  console.log(subjectCodes)

  const [namaMapel, setNamaMapel] = useState('')
  const [kodeKelas, setKodeKelas] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetInputs() {
    setNamaMapel('')
    setKodeKelas('')
  }

  // const handleSubmit = () => {
  //   if (!namaMapel || !kodeKelas) {
  //     alert("Semua Input Wajib Diisi!")
  //     return
  //   }
  //   addSubject({ class_code: kodeKelas, subject_code: namaMapel })
  // }

  const handleSubmit = async () => {
    if (!namaMapel || !kodeKelas) {
      alert('error', "Nama mata pelajaran dan kode kelas harus diisi!");
      return;
    }

    if (!subjects || !subjects.records) {
      alert('error', "Data mapel belum dimuat, coba lagi.");
      return;
    }

    const isDuplicate = subjects.records.some(
      (mapel) =>
        mapel.classCode.toString() === kodeKelas.toString() &&
        mapel.subjectCode.trim().toLowerCase() === namaMapel.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert('error', "Nama mapel ini sudah ada dalam kode kelas yang sama! Gunakan nama lain.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addSubject({ class_code: kodeKelas, subject_code: namaMapel });
      resetInputs();
    } catch (error) {
      console.error("Error saat menambahkan kelas:", error);
      alert('error', "Gagal menambahkan kelas, coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12} sx={{ padding: '0px' }}>

        <Grid size={{ sm: 12, lg: 6 }} >
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Mata Pelajaran
          </Typography>
          <TextField
            fullWidth
            select
            value={namaMapel}
            onChange={(e) => setNamaMapel(e.target.value)}
            variant="outlined"
          >
            {subjectCodes.map((sub) => (
              <MenuItem key={sub.ID} value={sub.code} >
                {sub.subject}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ sm: 12, lg: 6 }}>
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
            {classCodes.map((item) => (
              <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
            ))}
          </TextField>

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

TambahMapel.propTypes = {
  alert: PropTypes.func.isRequired,
  classCodes: PropTypes.object.isRequired,
  subjectCodes: PropTypes.object.isRequired,
  addSubject: PropTypes.func.isRequired,
}