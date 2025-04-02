import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import { Button, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetClassCode, asyncGetUserRoles } from '../states/common/action';
import EditAkses from './EditAkses';
import { asyncUpdateTeacher } from '../states/teachers/action';
import EditKelas from './EditKelas';
import { asyncUpdateClass } from '../states/classes/action';

export default function LayoutEditData({ desc }) {
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const roles = useSelector((state) => state.common.userRoles);
  const classes = useSelector((state) => state.common.classCodes)

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPath = pathSegments.slice(1, 3).join("/");
  const id = pathSegments[3] || null;

  useEffect(() => {
    dispatch(asyncGetUserRoles());
    dispatch(asyncGetClassCode());
  }, [dispatch]);

  const handleShowAlert = (status, message) => {
    setAlertSeverity(status);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const onUpdateAccess = async ({ id, name, nuptk, role, username }) => {
    try {
      await dispatch(asyncUpdateTeacher({ id, name, nuptk, role, username }));
      handleShowAlert('success', 'Update berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal mengupdate.');
    }
  };

  const onUpdateClass = async ({ id, class_code, class_name }) => {
    try {
      await dispatch(asyncUpdateClass({ id, class_code, class_name }));
      handleShowAlert('success', 'Update berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal mengupdate.');
    }
  };

  const renderContent = () => {
    switch (currentPath) {
      case "akses-system/edit":
        return <EditAkses roles={roles} updateAccess={onUpdateAccess} id={id} />;
      case "kelas/edit":
        return <EditKelas classes={classes} updateClass={onUpdateClass} id={id} />;
      default:
        return <Typography>Konten tidak tersedia</Typography>;
    }
  };

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
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        {desc}
      </Typography>

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
              <Typography variant="body1" sx={{ mt: 1 }}>
                {alertMessage}
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

LayoutEditData.propTypes = {
  desc: PropTypes.string.isRequired,
};
