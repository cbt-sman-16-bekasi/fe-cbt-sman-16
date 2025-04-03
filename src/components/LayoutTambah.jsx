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
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect, useState } from 'react';
import TambahMapel from './TambahMapel';
import TambahKodeUjian from './TambahKodeUjian';
import TambahDataSiswa from './TambahDataSiswa';
import TambahUjian from './TambahUjian';
import TambahSesiUjian from './TambahSesiUjian';
import TambahBankSoal from './TambahBankSoal';
import { asyncCreateClass } from '../states/classes/action';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateStudent } from '../states/students/action';
import { asyncCreateSubject } from '../states/subjects/action';
import { asyncCreateTeacher } from '../states/teachers/action';
import { asyncCreateExam } from '../states/exams/action';
import { asyncGetUserRoles } from '../states/common/action';

export default function LayoutTambah({ desc }) {
  const roles = useSelector((state) => state.common.userRoles);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  useEffect(() => {
    dispatch(asyncGetUserRoles());
  }, [dispatch]);

  const handleShowAlert = (status, message) => {
    setAlertSeverity(status);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const onAddAccess = async ({ name, nuptk, role, username }) => {
    try {
      await dispatch(asyncCreateTeacher({ name, nuptk, role, username }));
      handleShowAlert('success', 'Akses berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan akses.');
    }
  };

  const onCreateClass = async ({ class_code, class_name }) => {
    try {
      await dispatch(asyncCreateClass({ class_code, class_name }));
      handleShowAlert('success', 'Kelas berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan kelas.');
    }
  };

  const onAddStudent = async ({ class_id, gender, name, nisn }) => {
    try {
      await dispatch(asyncCreateStudent({ class_id, gender, name, nisn }));
      handleShowAlert('success', 'Siswa berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan siswa.');
    }
  };

  const onAddSubjects = async ({ class_code, subject_code }) => {
    try {
      await dispatch(asyncCreateSubject({ class_code, subject_code }));
      handleShowAlert('success', 'Mata pelajaran berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan mata pelajaran.');
    }
  };

  const onCreateExams = async ({ code_type_exam, color, role, type_exam }) => {
    try {
      await dispatch(asyncCreateExam({ code_type_exam, color, role, type_exam }));
      handleShowAlert('success', 'Kode ujian berhasil dibuat!');
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal membuat kode ujian.');
    }
  };

  const renderContent = () => {
    switch (`/${currentPath}`) {
      case "/akses-system/tambah":
        return <TambahAkses roles={roles} addAccess={onAddAccess} />;
      case "/kelas/tambah":
        return <TambahKelas createClass={onCreateClass} />;
      case "/mata-pelajaran/tambah":
        return <TambahMapel addSubject={onAddSubjects} />;
      case "/kode-jenis-ujian/tambah":
        return <TambahKodeUjian />;
      case "/data-siswa/tambah":
        return <TambahDataSiswa addStudent={onAddStudent} />;
      case "/ujian/tambah":
        return <TambahUjian createExams={onCreateExams} />;
      case "/sesi-ujian/tambah":
        return <TambahSesiUjian />;
      case "/bank-soal/tambah":
        return <TambahBankSoal />;
      default:
        return <Typography>Konten tidak tersedia</Typography>;
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
      return;
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

LayoutTambah.propTypes = {
  desc: PropTypes.string.isRequired,
};
