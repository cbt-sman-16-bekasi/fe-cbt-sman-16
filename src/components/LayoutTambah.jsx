import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import { asyncGetClassCode, asyncGetSubjects, asyncGetUserRoles } from '../states/common/action';
import { asyncCreateExam } from '../states/exams/action';
import { asyncCreateTypeExam } from '../states/typeExams/action';

export default function LayoutTambah({ desc }) {
  const roles = useSelector((state) => state.common.userRoles);
  const classCodes = useSelector((state) => state.common.classCodes)
  const subjectCodes = useSelector((state) => state.common.subjects)

  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  useEffect(() => {
    dispatch(asyncGetUserRoles());
    dispatch(asyncGetClassCode());
    dispatch(asyncGetSubjects());
  }, [dispatch]);

  const handleShowAlert = (status, message) => {
    setAlertSeverity(status);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const onAddStudent = async ({ class_id, gender, name, nisn }) => {
    try {
      const result = await dispatch(asyncCreateStudent({ class_id, gender, name, nisn }));
      handleShowAlert('success', 'Siswa berhasil ditambahkan!');
      return result
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan siswa.');
    }
  };

  const onAddAccess = async ({ name, nuptk, role, username }) => {
    try {
      const result = await dispatch(asyncCreateTeacher({ name, nuptk, role, username }));

      if (result?.success) {
        handleShowAlert('success', 'Akses berhasil ditambahkan!');
        return result
      } else {
        handleShowAlert('error', result?.error || 'Gagal menambahkan akses.');
        return result
      }
    } catch (error) {
      console.error('Full error:', error);
      handleShowAlert('error', error.message || 'Terjadi kesalahan tidak terduga');

    }
  };

  const onCreateClass = async ({ class_code, class_name }) => {
    try {
      const result = await dispatch(asyncCreateClass({ class_code, class_name }));
      handleShowAlert('success', 'Kelas berhasil ditambahkan!');
      return result
    } catch (error) {
      console.error('Error saat menambahkan data:', error);
      handleShowAlert('error', 'Gagal menambahkan kelas.');
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

  const onAddTypeExams = async ({ code_type_exam, color, role, type_exam }) => {
    try {
      await dispatch(asyncCreateTypeExam({ code_type_exam, color, role, type_exam }))
      handleShowAlert('success', 'Tipe Ujian Berhasil dibuat!')
    } catch (error) {
      console.error('Error saat menambahkan data: ', error)
      handleShowAlert('error', 'Gagal membuat tipe kode ujian.')
    }

  }

  const renderContent = () => {
    switch (`/${currentPath}`) {
      case "/akses-system/tambah":
        return <TambahAkses alert={handleShowAlert} roles={roles} addAccess={onAddAccess} />;
      case "/kelas/tambah":
        return <TambahKelas alert={handleShowAlert} classCodes={classCodes} createClass={onCreateClass} />;
      case "/mata-pelajaran/tambah":
        return <TambahMapel alert={handleShowAlert} classCodes={classCodes} subjectCodes={subjectCodes} addSubject={onAddSubjects} />;
      case "/kode-jenis-ujian/tambah":
        return <TambahKodeUjian alert={handleShowAlert} roles={roles} addTypeExams={onAddTypeExams} />;
      case "/data-siswa/tambah":
        return <TambahDataSiswa alert={handleShowAlert} classes={classCodes} addStudent={onAddStudent} />;
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
              <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
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
    </Box>
  );
}

LayoutTambah.propTypes = {
  desc: PropTypes.string.isRequired,
};
