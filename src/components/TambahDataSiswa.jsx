import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveStudents } from '../states/students/action';
import { asyncReceiveClasses } from '../states/classes/action';

// let duplicateCode = false;
//     let duplicateName = false;

//     if (Array.isArray(typeExams.records)) {
//       typeExams.records.forEach((typeExam) => {
//         if (typeExam.code.toLowerCase() === kodeKelas.toLowerCase()) {
//           duplicateCode = true;
//         }
//         if (typeExam.name.trim().toLowerCase() === namaUjian.trim().toLowerCase()) {
//           duplicateName = true;
//         }
//       });
//     }

//     if (duplicateCode || duplicateName) {
//       let message = "Terdeteksi duplikasi:\n";
//       if (duplicateCode) message += "- Kode ujian sudah digunakan.\n";
//       if (duplicateName) message += "- Nama jenis ujian sudah digunakan.\n";
//       message += "Silakan gunakan kode atau nama yang berbeda.";

//       alert('error', message);
//       return;
//     }

export default function TambahDataSiswa({ alert, addStudent }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const classes = useSelector((state) => state.classes.classes);

  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [namaKelas, setNamaKelas] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    dispatch(asyncReceiveStudents())
    dispatch(asyncReceiveClasses());
  }, [dispatch])

  function resetInputs() {
    setNisn('');
    setNamaSiswa('');
    setJenisKelamin('');
    setNamaKelas('');
  }

  const handleSubmit = async () => {
    if (!nisn || !namaSiswa || !jenisKelamin || !namaKelas) {
      alert('error', 'Semua Input Wajib di Isi!');
      return;
    }

    let duplicateNisn = false;

    if (Array.isArray(students.records)) {
      students.records.forEach((student) => {
        if (student.nsin === nisn) {
          duplicateNisn = true;
        }
      });
    }

    if (duplicateNisn) {
      let message = "Terdeteksi duplikasi:\n";
      if (duplicateNisn) message += "- Nisn sudah digunakan.\n";
      message += "Silakan gunakan data yang berbeda.";

      alert('error', message);
      return;
    }

    setIsSubmitting(true);
    try {
      await addStudent({ class_id: parseInt(namaKelas), gender: jenisKelamin, name: namaSiswa, nisn });
      resetInputs()
    } catch (err) {
      console.error(err)
      alert('error', err.message || `Terjadi kesalahan`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            NISN
          </Typography>
          <TextField
            fullWidth
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Nama Siswa
          </Typography>
          <TextField
            fullWidth
            value={namaSiswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            variant="outlined"
          >
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Jenis Kelamin
          </Typography>
          <TextField
            fullWidth
            select
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="laki-laki">Laki-Laki</MenuItem>
            <MenuItem value="perempuan">Perempuan</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Kelas
          </Typography>
          <TextField
            fullWidth
            select
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
            variant="outlined"
          >
            {
              (classes.records || []).map((cls) => (
                <MenuItem key={cls.ID} value={cls.ID}>
                  {cls.className}
                </MenuItem>
              ))
            }
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
          <Button fullWidth variant="contained" className='bg-slate-800 text-white'>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

TambahDataSiswa.propTypes = {
  alert: PropTypes.object.isRequired,
  addStudent: PropTypes.func.isRequired,
}