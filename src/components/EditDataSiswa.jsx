import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveStudents } from '../states/students/action';

export default function EditDataSiswa({ classCodes, updateStudent }) {
  const { id } = useParams()
  const students = useSelector((state) => state.students.students)

  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [namaKelas, setNamaKelas] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveStudents())

    if (id) {
      const selectedStudent = students.records.find((std) => std.ID === parseInt(id));

      if (selectedStudent) {
        setNisn(selectedStudent.detail_student.nisn)
        setNamaSiswa(selectedStudent.detail_student.name)
        setJenisKelamin(selectedStudent.detail_student.gender.toLowerCase())
        setNamaKelas(selectedStudent.class_id)
      }
    }
  }, [id, students, dispatch])

  function resetInputs() {
    setNisn('')
    setNamaSiswa('')
    setJenisKelamin('')
    setNamaKelas('')
  }

  const handleSubmit = async () => {
    if (!nisn || !namaSiswa || !jenisKelamin || !namaKelas) {
      alert('Semua Input Wajib di Isi!')
      return
    }

    setIsSubmitting(true);
    try {
      await updateStudent({ id: parseInt(id), class_id: Number(namaKelas), gender: jenisKelamin, name: namaSiswa, nisn })
      resetInputs();
    } catch (error) {
      console.error('Error saat update:', error.response?.data || error.message);
      alert(`Gagal update: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

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
            Nama Kelas
          </Typography>
          <TextField
            fullWidth
            select
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
            variant="outlined"
          >
            {classCodes.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
              >
                {item.name}
              </MenuItem>
            ))}
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
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

EditDataSiswa.propTypes = {
  classCodes: PropTypes.func.isRequired,
  updateStudent: PropTypes.func.isRequired,
}