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
import ModalChangePassword from "../../components/page/profile/ModalChangePassword.jsx";
import CustomInput from "../../components/form/FormInputTextField.jsx";

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
    onChangePasswordModal,
    modalPassword,
    isEdit,
    handleEdit,
    isTeacher, setIsTeacher,
    handleRemovePhoto,
  } = useUserProfileHook();

  const sizeProps = isTeacher
    ? { sm: 12, lg: 6 }
    : { sm: 12 };

  useEffect(() => {
    if (authUser) {
      setName(authUser?.detail.name || '');
      setNuptk(authUser?.detail?.nuptk || '');
      setUserRole(authUser?.role.name || '');
      setUsername(authUser?.username || '');
      setIsTeacher(authUser?.role?.code === 'TEACHER');

      // setPhotoProfile({
      //   preview: `${authUser.logo || ''}`,
      //   file: null
      // });
    }
  }, [authUser, setName, setNuptk, setUserRole, setUsername]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <ModalChangePassword isOpen={modalPassword} isHide={onChangePasswordModal} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text="Detail Profil" iconBackground="purple" />

      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          {/* photo profile */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <img
                    src={photoProfile.preview}
                    alt="user photo"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                    }}
                  />
                </CardContent>

                {isEdit && (
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      disabled={!isEdit}
                    >
                      Ganti Foto
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      disabled={!isEdit}
                      onClick={handleRemovePhoto}
                    >
                      Hapus
                    </Button>
                  </Stack>
                )}

                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", mt: 2, textAlign: "center" }}
                >
                  Ukuran gambar 1080 × 1080 piksel. Hanya file JPG atau PNG.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid size={{ sm: 3 }}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={onChangePasswordModal}
              >
                Ganti Password
              </Button>
            </Grid>

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={sizeProps}>
              <CustomInput label="Nama User" fullWidth={true} value={name}
                disabled={!isEdit}
                onChange={(c) => setName(c.target.value)}
                placeholder="Nama User" />
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Username" fullWidth={true} value={username}
              onChange={(c) => setUsername(c.target.value)}
              disabled={!isEdit}
              placeholder="Username" />
            <CustomInput label="Hak Akses" fullWidth={true} disabled value={userRole}
              placeholder="Hak Akses" />
          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            {isEdit && (
              <Grid size={{ sm: 1.3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
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
                  color="success"
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