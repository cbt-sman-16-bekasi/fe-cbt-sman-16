import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { Link, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import ApiTable from './ApiTable';

import { columns, formatRows } from '../internals/data/siswaData';
import { useDispatch, useSelector } from 'react-redux';
import CustomizedDataGrid from './CustomizedDataGrid';
import { asyncDeleteStudent, asyncReceiveStudents } from '../states/students/action';

export default function DataSiswa({ role }) {
  // const [search, setSearch] = useState('')

  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students)
  console.log(students)
  const navigate = useNavigate();

  const rows = formatRows(students.records);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncReceiveStudents());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah yakin ingin menghapus kelas ini?")) {
      dispatch(asyncDeleteStudent(id));
    }
  };

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>


      <Grid container spacing={2} columns={12} sx={{ my: 4 }} justifyContent="start" alignItems="center" mb={4}>
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
            // onChange={(e) => setSearch(e.target.value)}
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
          {/* <ApiTable url="/academic/student/all" pageSize={10} columns={columns} searchKey="name" searchValue={search} /> */}
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
