import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useUserProfileHook } from "./hooks/useUserProfileHook.jsx";
import { useEffect } from "react";
import TitleWithIcon from "../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";

const UserProfile = () => {
  const {
    authUser,
    name, setName,
    nuptk, setNuptk,
    photoProfile,
    username, setUsername,
    userRole, setUserRole,
    showAlert,
    alertMessage,
    alertSeverity,
    isSubmitting,
    handleFileChange,
    handleUpdate,
    onOpenPasswordModal,
    isEdit,
    handleEdit,
  } = useUserProfileHook()

  useEffect(() => {
    if (authUser) {
      setName(authUser?.detail?.name || '');
      setNuptk(authUser?.nuptk || '');
      setUserRole(authUser?.role.name || '');
      setUsername(authUser?.username || '');

      // setPhotoProfile({
      //   preview: `${authUser.logo || ''}`,
      //   file: null
      // });
    }
  }, [authUser, setName, setNuptk, setUserRole, setUsername]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text="Detail Profil" iconBackground="red" />

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

          {/* photo profile */}
          <Grid container spacing={2} alignItems="center" columns={12}>
            <Grid size={{ lg: 2 }}>

              <Card variant="outlined" sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1 }}>
                <CardContent>
                  <img
                    src={photoProfile.preview}
                    alt="user photo"
                    style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }}
                  />
                </CardContent>
              </Card>

            </Grid>

            <Grid size={{ lg: 9 }}>

              <Stack spacing={1.3} direction="row" alignItems="center">

                <Button variant="contained" component="label" color='info'>
                  Ganti Photo
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
            <Grid size={{ sm: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Password
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="info"
                onClick={onOpenPasswordModal}
                disabled={!isEdit}
              >
                ganti password?
              </Button>
            </Grid>

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ sm: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama
              </Typography>
              <TextField
                fullWidth
                value={name}
                disabled={!isEdit}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
            <Grid size={{ sm: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                NUPTK
              </Typography>
              <TextField
                fullWidth
                value={nuptk}
                disabled={!isEdit}
                onChange={(e) => setNuptk(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ sm: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Username
              </Typography>
              <TextField
                fullWidth
                value={username}
                disabled={!isEdit}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ sm: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Hak Akses
              </Typography>
              <TextField
                fullWidth
                value={userRole}
                disabled={true}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            {isEdit && (
              <Grid size={{ sm: 1.3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-slate-800 text-white"
                  onClick={() => handleEdit({ isCancel: true })}
                >
                  Batal
                </Button>
              </Grid>
            )}
            <Grid size={{ sm: 1.3 }}>
              {isEdit ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  onClick={() => handleEdit({ isCancel: false })}
                  startIcon={<EditIcon />}                >
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