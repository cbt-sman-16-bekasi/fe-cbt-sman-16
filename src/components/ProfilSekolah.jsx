import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { asyncGetSchoolInfo, asyncUpdateSchool } from '../states/school/action'

export default function ProfilSekolah() {
  const dispatch = useDispatch()

  const [schoolName, setSchoolName] = useState('')
  const [jenjang, setJenjang] = useState('')
  const [nss, setNss] = useState('')
  const [npsn, setNpsn] = useState('')
  const [telp, setTelp] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [logo, setLogo] = useState({ preview: '', file: null });
  const [banner, setBanner] = useState({ preview: '', file: null });

  const [authUser, setAuthUser] = useState([]);
  const [schoolCode, setSchoolCode] = useState();
  const schoolData = useSelector((state) => state.school.schoolInfo)

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem('authUser')));
    setSchoolCode(authUser?.SchoolCode)

    if (schoolCode) {
      dispatch(asyncGetSchoolInfo(schoolCode));
    }
  }, [authUser?.SchoolCode, dispatch, schoolCode]);

  useEffect(() => {
    if (schoolData) {
      setSchoolName(schoolData.school_name || '');
      setJenjang(schoolData.level_of_education || '');
      setNss(schoolData.nss || '');
      setNpsn(schoolData.npsn || '');
      setTelp(schoolData.phone || '');
      setEmail(schoolData.email || '');
      setAddress(schoolData.address || '');

      setLogo({
        preview: `data:${getImageMimeType(schoolData.logo)};base64,${schoolData.logo || ''}`,
        file: null
      });


      setBanner({
        preview: `data:${getImageMimeType(schoolData.banner)};base64,${schoolData.banner || ''}`,
        file: null
      });

    }
  }, [schoolData]);

  const getImageMimeType = (base64) => {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBORw0')) return 'image/png';
    return 'image/*';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const base64Logo = logo.file ? await fileToBase64(logo.file) : schoolData.logo;
      const base64Banner = banner.file ? await fileToBase64(banner.file) : schoolData.banner;
      const payload = {
        // school code buat async func ulang receive data school nya lagi
        schoolCode,
        school_name: schoolName,
        level_of_education: jenjang,
        nss,
        npsn,
        phone: telp,
        email,
        address,
        logo: base64Logo || '',
        banner: base64Banner || '',
      };

      const result = await dispatch(asyncUpdateSchool(payload));

      if (result) {
        setAlertSeverity('success');
        setAlertMessage('Berhasil menyimpan data sekolah');
      } else {
        setAlertSeverity('error');
        setAlertMessage(`Gagal menyimpan`);
      }

      setShowAlert(true);
    } catch (err) {
      console.error(err);
      alert('error', err.message || `Terjadi kesalahan saat parsing file.`);
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleReset = () => {
    setSchoolName(schoolData.school_name || '');
    setJenjang(schoolData.level_of_education || '');
    setNss(schoolData.nss || '');
    setNpsn(schoolData.npsn || '');
    setTelp(schoolData.phone || '');
    setEmail(schoolData.email || '');
    setAddress(schoolData.address || '');

    setLogo({
      preview: `data:${getImageMimeType(schoolData.logo)};base64,${schoolData.logo || ''}`,
      file: null
    });

    setBanner({
      preview: `data:${getImageMimeType(schoolData.banner)};base64,${schoolData.banner || ''}`,
      file: null
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const field = event.target.name;

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);

      if (field === 'logo') {
        setLogo({ preview: fileURL, file: selectedFile });
      } else if (field === 'banner') {
        setBanner({ preview: fileURL, file: selectedFile });
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // ambil bagian base64-nya aja
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5 }}>
        Informasi Sekolah
      </Typography>

      <Typography component="h3" variant="h3" sx={{ mb: 3 }}>
        Profil Sekolah
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

          {/* logo */}
          <Grid container spacing={2} alignItems="center" columns={12}>
            <Grid size={{ lg: 2 }}>

              <Card variant="outlined" sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1 }}>
                <CardContent>
                  <img
                    src={logo.preview}
                    alt="Logo Sekolah"
                    style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>

            </Grid>

            <Grid size={{ lg: 9 }}>

              <Stack spacing={1.3} direction="row" alignItems="center">

                <Button variant="contained" component="label">
                  Ganti Logo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="logo"
                    onChange={handleFileChange}
                  />
                </Button>

                <Button variant="outlined" color="error">
                  Hapus
                </Button>

              </Stack>
              <Typography variant="caption" sx={{ color: "gray", mt: 1 }}>
                Image size 1080 × 1080 pixels. JPG and PNG files.
              </Typography>

            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama Sekolah
              </Typography>
              <TextField
                fullWidth
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Jenjang
              </Typography>
              <TextField
                fullWidth
                value={jenjang}
                onChange={(e) => setJenjang(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NSS
              </Typography>
              <TextField
                fullWidth
                value={nss}
                onChange={(e) => setNss(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NPSN
              </Typography>
              <TextField
                fullWidth
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nomor Telepon
              </Typography>
              <TextField
                fullWidth
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ sm: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Alamat Sekolah
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                size="medium"
              />
            </Grid>

          </Grid>

          {/* banner */}
          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ sm: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Banner
              </Typography>
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2 w-full h-40 relative">

                  <Upload className="w-10 h-10 " />
                  <Typography variant="body1" className="text-gray-700 font-medium">
                    Upload File Banner
                  </Typography>
                  <label htmlFor="fileUpload" className="text-purple-600 hover:underline text-sm cursor-pointer">
                    JPG and PNG files
                  </label>
                  <input
                    name="banner"
                    id="fileUpload"
                    type="file"
                    accept=".jpg, .png"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </CardContent>
              </Card>
              {banner.preview && (
                <img
                  src={banner.preview}
                  alt="Preview Banner"
                  style={{ width: '100%', height: 'auto', marginTop: '1rem', objectFit: 'cover' }}
                />
              )}

            </Grid>
          </Grid>

          {/* button submit */}
          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={handleReset}>
                Reset
              </Button>
            </Grid>

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" color='success' onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Box>
  );
}
