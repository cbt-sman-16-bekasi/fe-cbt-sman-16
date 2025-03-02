import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { Button, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import TambahAkses from './TambahAkses';
import TambahKelas from './TambahKelas';

export default function LayoutTambah({ desc }) {
  const location = useLocation();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (location.pathname) {
      case "/akses-system/tambah":
        return <TambahAkses />
      case "/kelas/tambah":
        return <TambahKelas />
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

      <Card variant="outlined" sx={{ flexGrow: 1, mb: 4 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
