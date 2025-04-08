import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

import SettingsUjian from './SettingsUjian';

export default function LayoutSettings({ role }) {
  const [displaySuccess, setDisplaySuccess] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/').slice(2);
  const id = pathParts.pop();
  const currentPath = `/${pathParts.join('/')}`;


  const renderContent = () => {
    switch (`${currentPath}`) {
      case "/ujian/settings":
        return <SettingsUjian id={id} setError={handleDisplaySuccess} role={role} />
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

  const handleDisplaySuccess = () => {
    setDisplaySuccess((prev) => !prev)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 4 }}>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={6}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      {displaySuccess && (
        <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="error" sx={{ py: 1, px: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Berhasil!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Silahkan masukkan data dengan lengkap
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      <Stack>
        {renderContent()}
      </Stack>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}


LayoutSettings.propTypes = {
  role: PropTypes.string.isRequired,
}
