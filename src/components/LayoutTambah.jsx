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
import { asyncCreateTypeExam } from '../states/exams/action';
import { asyncGetUserRoles } from '../states/common/action';

export default function LayoutTambah({ desc }) {
  const roles = useSelector((state) => state.common.userRoles)
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";

  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(true);

  useEffect(() => {
    dispatch(asyncGetUserRoles())
  }, [dispatch])

  const onCreateClass = ({ class_code, class_name }) => {
    dispatch(asyncCreateClass({ class_code, class_name }));
  }

  const onAddStudent = ({ class_id, gender, name, nisn }) => {
    dispatch(asyncCreateStudent({ class_id, gender, name, nisn }));
  }

  const onAddSubjects = ({ class_code, subject_code }) => {
    dispatch(asyncCreateSubject({ class_code, subject_code }))
  }

  const onAddAccess = ({ name, nuptk, role, username }) => {
    dispatch(asyncCreateTeacher({ name, nuptk, role, username }))
  }

  const onCreateExams = ({ code_type_exam, color, role, type_exam }) => {
    dispatch(asyncCreateTypeExam({ code_type_exam, color, role, type_exam }))
  }

  const renderContent = () => {
    switch (`/${currentPath}`) {
      case "/kelas/tambah":
        return <TambahKelas createClass={onCreateClass} setError={handleDisplayError} />
      case "/akses-system/tambah":
        return <TambahAkses addAccess={onAddAccess} setError={handleDisplayError} />
      case "/mata-pelajaran/tambah":
        return <TambahMapel addSubject={onAddSubjects} setError={handleDisplayError} />
      case "/kode-jenis-ujian/tambah":
        return <TambahKodeUjian setError={handleDisplayError} />
      case "/data-siswa/tambah":
        return <TambahDataSiswa addStudent={onAddStudent} setError={handleDisplayError} />
      case "/ujian/tambah":
        return <TambahUjian createExams={onCreateExams} setError={handleDisplayError} />
      case "/sesi-ujian/tambah":
        return <TambahSesiUjian setError={handleDisplayError} />
      case "/bank-soal/tambah":
        return <TambahBankSoal setError={handleDisplayError} />
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
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button fullWidth variant="contained" onClick={handleBack}> Kembali</Button>
        </Grid>
      </Grid>

      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        {desc}
      </Typography>

      {displayError && (
        <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
          <Grid size={{ sm: 12 }}>
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
