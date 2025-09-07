import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useSchoolProfileHook } from "./hooks/useSchoolProfileHook.jsx";
import { useEffect } from "react";
import { asyncGetSchoolInfo } from "../../states/school/action.js";

const UserProfile = () => {
  const {
    dispatch,
    authUser, setAuthUser,
    schoolCode, setSchoolCode,
    schoolData,
    schoolName, setSchoolName,
    jenjang, setJenjang,
    nss, setNss,
    npsn, setNpsn,
    principal, setPrincipal,
    vicePincipal, setVicePincipal,
    nipPrincipal, setNipPrincipal,
    nipVicePrincipal, setNipVicePrincipal,
    telp, setTelp,
    email, setEmail,
    address, setAddress,
    logo,
    banner, setBanner,
    setLogo,
    showLoading, hideLoading,
    isSubmitting,
    isEdit,
    handleEdit,
    handleFileChange,
    handleSubmit,
    handleReset,
    handleRemoveLogo,
  } = useSchoolProfileHook()

  useEffect(() => {
    const authUserFromStorage = JSON.parse(localStorage.getItem('authUser'));
    if (authUserFromStorage) {
      setAuthUser(authUserFromStorage);
      setSchoolCode(authUser?.SchoolCode);
    }
  }, []);

  useEffect(() => {
    if (schoolCode) {
      dispatch(asyncGetSchoolInfo(schoolCode));
    }
  }, [schoolCode, dispatch]);

  useEffect(() => {
    if (schoolData) {
      setSchoolName(schoolData?.school_name || '');
      setJenjang(schoolData?.level_of_education || '');
      setNss(schoolData?.nss || '');
      setNpsn(schoolData?.npsn || '');
      setTelp(schoolData?.phone || '');
      setEmail(schoolData?.email || '');
      setAddress(schoolData?.address || '');
      setPrincipal(schoolData?.principal_name || '');
      setVicePincipal(schoolData?.vice_principal_name || '');
      setNipPrincipal(schoolData?.principal_nip || '')
      setNipVicePrincipal(schoolData?.vice_principal_nip || '');

      setLogo({
        preview: schoolData?.logo,
        file: null
      });


      setBanner({
        preview: schoolData?.banner,
        file: null
      });

    }
  }, [schoolData]);

  useEffect(() => {
    if (!schoolData) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [schoolData]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Card sx={{ flexGrow: 1, mb: 9, mt: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          {/* logo */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            {/* Logo */}
            <Grid item>
              <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1, borderRadius: '50%' }}>
                <CardContent>
                  <img
                    src={logo.preview}
                    alt="Logo Sekolah"
                    style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Tombol */}
            {isEdit && (
              <>
                <Grid item>
                  <Stack spacing={1.3} direction="row" justifyContent="center" alignItems="center">
                    <Button variant="contained" component="label" color='info'>
                      Ganti Logo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </Button>

                    <Button variant="outlined" color="error" onClick={handleRemoveLogo}>
                      Hapus
                    </Button>
                  </Stack>
                </Grid>

                {/* Info Text */}
                <Grid item>
                  <Typography variant="caption" sx={{ color: "gray", mt: 1, textAlign: "center" }}>
                    Image size 1080 × 1080 pixels. JPG and PNG files.
                  </Typography>
                </Grid>
              </>
            )}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Kepala Sekolah
              </Typography>
              <TextField
                fullWidth
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                variant="outlined"
                disabled={!isEdit}
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NIP Kepala Sekolah
              </Typography>
              <TextField
                fullWidth
                value={nipPrincipal}
                onChange={(e) => setNipPrincipal(e.target.value)}
                variant="outlined"
                disabled={!isEdit}
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Wakil Kepala Sekolah
              </Typography>
              <TextField
                fullWidth
                value={vicePincipal}
                onChange={(e) => setVicePincipal(e.target.value)}
                variant="outlined"
                disabled={!isEdit}
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NIP Wakil Kepala Sekolah
              </Typography>
              <TextField
                fullWidth
                value={nipVicePrincipal}
                onChange={(e) => setNipVicePrincipal(e.target.value)}
                variant="outlined"
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
              />
            </Grid>

          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            {isEdit && (
              <Grid size={{ sm: 1.3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleEdit({ isCancel: true });
                    handleReset();
                  }}
                >
                  Batal
                </Button>
              </Grid>
            )}
            <Grid size={{ sm: 1.3 }}>
              {isEdit ? (
                <Button fullWidth variant="contained" color='warning'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => handleEdit({ isCancel: false })}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;