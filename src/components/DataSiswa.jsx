import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { columns, formatRows } from '../internals/data/siswaData';
import { Link, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteStudent, asyncReceiveStudents } from '../states/students/action';
import { useEffect, useState } from 'react';

export default function DataSiswa({ role }) {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = formatRows(students.records);
  console.log(students.records)

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncReceiveStudents({ size: 1000 }));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus data siswa ini?")) {
      dispatch(asyncDeleteStudent(id));
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Data Siswa
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }}>
          <Link to={`/${role}/data-siswa/tambah`}>
            <Button fullWidth variant="contained" className='bg-slate-800 text-white'><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Link to={`/${role}/data-siswa/import`}>
            <Button fullWidth variant="contained" color='success'><UploadFileOutlinedIcon /> Import</Button>
          </Link>
        </Grid>

        <Grid size={{ lg: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Cari Berdasarkan..."
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

      </Grid>

      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid
            columns={columns({ handleDelete, navigate, role })}
            rows={rows}
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />

        </Grid>
      </Grid>

    </Box >
  );
}

DataSiswa.propTypes = {
  role: PropTypes.string.isRequired
}