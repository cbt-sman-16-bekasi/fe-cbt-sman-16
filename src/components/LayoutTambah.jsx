import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { Button, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import TambahAkses from './TambahAkses';
import TambahKelas from './TambahKelas';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import TambahMapel from './TambahMapel';
import TambahKodeUjian from './TambahKodeUjian';
import TambahDataSiswa from './TambahDataSiswa';

export default function LayoutTambah({ desc }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(true);

  const renderContent = () => {
    switch (location.pathname) {
      case "/akses-system/tambah":
        return <TambahAkses setError={handleDisplayError} />
      case "/kelas/tambah":
        return <TambahKelas setError={handleDisplayError} />
      case "/mata-pelajaran/tambah":
        return <TambahMapel setError={handleDisplayError} />
      case "/kode-jenis-ujian/tambah":
        return <TambahKodeUjian setError={handleDisplayError} />
      case "/data-siswa/tambah":
        return <TambahDataSiswa setError={handleDisplayError} />
      default:
        return <Typography>Konten tidak tersedia</Typography>
    }
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      if (location.pathname.includes("/akses-system")) {
        navigate("/akses-system");
      } else if (location.pathname.includes("/kelas")) {
        navigate("/kelas");
      } else {
        navigate("/");
      }
    }
  };

  const handleDisplayError = () => {
    setDisplayError((prev) => !prev)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        {desc}
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={6}>
        <Grid item size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        {desc}
      </Typography>

      {displayError && (
        <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
          <Grid item size={{ lg: 12 }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="error" sx={{ py: 1, px: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Error!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Silahkan masukkan data dengan lengkap
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          {renderContent()}
        </CardContent>
      </Card>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}


LayoutTambah.propTypes = {
  desc: PropTypes.string.isRequired,
}
