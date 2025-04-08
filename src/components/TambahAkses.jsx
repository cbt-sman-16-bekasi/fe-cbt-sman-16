import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Chip, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveTeachers } from '../states/teachers/action';

export default function TambahAkses({ alert, roles, addAccess }) {
  const teachers = useSelector((state) => state.teachers.teachers)

  const [nuptk, setNuptk] = useState('')
  const [namaGuru, setNamaGuru] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [akses, setAkses] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveTeachers())
  }, [dispatch])

  function resetInputs() {
    setNuptk('');
    setNamaGuru('');
    setUsername('');
    setPassword('');
    setAkses('');
  }

  const handleSubmit = async () => {
    if (!nuptk || !namaGuru || !username || !password || !akses) {
      alert('error', 'Semua Input Wajib Diisi!');
      return;
    }

    const isNuptkExists = teachers.records.some((teacher) => teacher.nuptk === nuptk);
    if (isNuptkExists) {
      alert('error', 'NUPTK sudah terdaftar! Silakan gunakan NUPTK lain.');
      return;
    }

    const isUserIdExists = teachers.records.some((teacher) => teacher.user_id === parseInt(username));
    if (isUserIdExists) {
      alert('error', 'User ID sudah terdaftar! Silakan gunakan yang lain.');
      return;
    }

    const isUsernameExists = teachers.records.some((teacher) => teacher.detail_user?.username === username);
    if (isUsernameExists) {
      alert('error', 'Username sudah dipakai! Silakan gunakan username lain.');
      return;
    }

    const isnameExists = teachers.records.some((teacher) => teacher.name === namaGuru);
    if (isnameExists) {
      alert('error', 'Nama sudah dipakai! Silakan gunakan username lain.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addAccess({
        name: namaGuru,
        nuptk,
        password,
        role: akses.toUpperCase(),
        username
      });
      resetInputs();
    } catch (error) {
      console.error('Error saat menambahkan akses:', error);
      alert('Gagal menambahkan akses, coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid size={{ md: 12, lg: 6 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            NUPTK
          </Typography>
          <TextField
            fullWidth
            type="text"
            value={nuptk}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, '');
              setNuptk(onlyNums);
            }}
            variant="outlined"
          />

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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>

              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid size={{ sm: 12 }}>
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

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="start" mb={4} direction='column'>
        <Grid size={{ sm: 12 }}>
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
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={resetInputs}>Reset</Button>
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

TambahAkses.propTypes = {
  alert: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired,
  addAccess: PropTypes.func.isRequired,
}
