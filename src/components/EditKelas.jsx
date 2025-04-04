import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function EditKelas({ classCodes, updateClass }) {
  const { id } = useParams()
  const classes = useSelector((state) => state.classes.classes)

  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const selectedClass = classes.records.find((cls) => cls.ID === parseInt(id));

      if (selectedClass) {
        setClassCode(selectedClass.classCode);
        setClassName(selectedClass.className);
      }
    }
  }, [id, classes]);

  function resetInputs() {
    setClassCode('');
    setClassName('');
  }

  const handleSubmit = async () => {
    console.log('Data yang akan dikirim:', {
      id,
      class_code: classCode,
      class_name: className
    });

    if (!classCode || !className) {
      alert("Kode kelas dan nama kelas harus diisi!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateClass({ id, class_code: classCode, class_name: className });
      console.log('Response dari API:', result);
      resetInputs();
    } catch (error) {
      console.error('Error saat update:', error.response?.data || error.message);
      alert(`Gagal update: ${error.response?.data?.message || error.message}`);
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

EditKelas.propTypes = {
  classCodes: PropTypes.object.isRequired,
  updateClass: PropTypes.func.isRequired,
}