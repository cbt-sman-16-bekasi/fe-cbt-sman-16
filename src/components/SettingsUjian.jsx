import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent, Chip, InputAdornment, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { rows } from '../internals/data/ujianData';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default function SettingsUjian({ id, setError, role }) {
  const [ujian, setUjian] = useState('')

  useEffect(() => {
    const dataUjian = rows.find((item) => item.id === Number(id));
    if (dataUjian) {
      setUjian(dataUjian);
    } else {
      setError(true);
    }
  }, [id, setError]);

  const getChipColor = (jenisUjian) => {
    switch (jenisUjian) {
      case "UTS":
        return "primary";
      case "UH":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <>
      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        Detail Ujian
      </Typography>

      <Card variant="outlined" sx={{ flexGrow: 1, py: 0, mb: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <TableContainer component={Paper} sx={{ background: 'transparent' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Jenis Ujian</TableCell>
                  <TableCell>
                    <Chip
                      variant="outlined"
                      label={ujian.jenisUjian}
                      sx={{ p: 2 }}
                      color={getChipColor(ujian.jenisUjian)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Nama Ujian</TableCell>
                  <TableCell>{ujian.namaUjian}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Mata Pelajaran</TableCell>
                  <TableCell>{ujian.mataPelajaran}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Kelas</TableCell>
                  <TableCell>{ujian.kelas}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Durasi (Menit)</TableCell>
                  <TableCell>{ujian.durasi}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Jumlah Soal</TableCell>
                  <TableCell>{ujian.jumlahSoal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '20%' }}>Jumlah Total Nilai</TableCell>
                  <TableCell>{ujian.totalNilai}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        Soal Ujian
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }}>
          <Link to={`/${role}/ujian/settings/${ujian.id}/tambah-soal`}>
            <Button fullWidth variant="contained" className='bg-slate-800 text-white'><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Link to='/ujian/import'>
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

      <Card variant="outlined" sx={{ flexGrow: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem', mb: 2 }}>
        </CardContent>
      </Card>
    </>
  );
}

SettingsUjian.propTypes = {
  desc: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}