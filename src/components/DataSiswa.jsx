import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { columns, rows } from '../internals/data/siswaData';

export default function DataSiswa() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Data Siswa
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid item size={{ lg: 1 }}>
          <Button variant="contained" fullWidth className='bg-slate-800 text-white'><AddBoxOutlinedIcon /> Tambah</Button>
        </Grid>

        <Grid item size={{ lg: 1 }}>
          <Button variant="contained" color='success' fullWidth><UploadFileOutlinedIcon /> Import</Button>
        </Grid>

        <Grid item size={{ lg: 3 }}>
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
          <CustomizedDataGrid columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box >
  );
}
