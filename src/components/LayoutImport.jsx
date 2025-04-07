import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';
import ImportDataSiswa from './ImportDataSiswa';
import { asyncCreateStudent } from '../states/students/action';
import { useDispatch } from 'react-redux';

export default function LayoutImport({ desc }) {
  const location = useLocation();
  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const onAddStudents = async ({ class_id, gender, name, nisn }) => {
    try {
      const result = await dispatch(asyncCreateStudent({ class_id, gender, name, nisn }));
      handleShowAlert('success', 'Siswa berhasil ditambahkan!');
      return result
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan siswa.');
    }
  };

  const renderContent = () => {
    switch (`/${currentPath}`) {
      case "/data-siswa/import":
        return <ImportDataSiswa alert={handleShowAlert} addStudents={onAddStudents} />
      default:
        return <Typography>Konten tidak tersedia</Typography>
    }
  }

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
      return;
    }
  };

  const handleShowAlert = (status, message) => {
    setAlertSeverity(status);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        {desc}
      </Typography>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={6}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      {showAlert && (
        <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Alert
              icon={alertSeverity === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
              variant="outlined"
              severity={alertSeverity}
              sx={{ py: 1, px: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                {alertSeverity === 'success' ? 'Berhasil!' : 'Error!'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                {alertMessage}
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
          {renderContent()}
        </CardContent>
      </Card>

    </Box>
  );
}


LayoutImport.propTypes = {
  desc: PropTypes.string.isRequired,
}
