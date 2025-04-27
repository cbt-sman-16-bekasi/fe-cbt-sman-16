import Grid from "@mui/material/Grid2";
import { Dialog, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox, InputAdornment, Stack, Alert, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useModal } from './ModalContext';
import TitleWithIcon from './TitleWithIcon';
import { useUserProfileHook } from '../../pages/userprofile/hooks/useUserProfileHook';

export default function ModalChangePassword() {
  const { open, hideModal, type } = useModal();

  const {
    formPassword, setFormPassword,
    showPassword, setShowPassword,
    passwordMatchError, setPasswordMatchError,
    isPasswordValid,
    showAlert,
    alertMessage,
    alertSeverity,
    isSubmitting,
    handleUpdate,
  } = useUserProfileHook()

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setFormPassword((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'newPass' || field === 'confirm') {
        if (updated.confirm && updated.newPass !== updated.confirm) {
          setPasswordMatchError('Password tidak cocok');
        } else {
          setPasswordMatchError('');
        }
      }

      return updated;
    });
  };

  const isOpen = open && type === 'changePassword';

  return (
    <Dialog open={isOpen} onClose={hideModal} fullWidth maxWidth="xs">
      <Stack sx={{ gap: 1, p: 2, border: '1px solid black' }}>
        <TitleWithIcon sx={{ mb: 0 }} icon={<Lock sx={{ color: 'white' }} />} text='Ubah Password' iconBackground="red" />
      </Stack>

      {
        showAlert && (
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
        )
      }

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Typography variant='subtitle2' >Password Lama</Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={formPassword.current}
              onChange={handleChange('current')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Typography variant='subtitle2' >Password Baru</Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={formPassword.newPass}
              onChange={handleChange('newPass')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Typography variant='subtitle2' >Konfirmasi Password</Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={formPassword.confirm}
              onChange={handleChange('confirm')}
              error={!!passwordMatchError}
              helperText={passwordMatchError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />}
          label="Show Password"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleUpdate} variant="contained" color='success' fullWidth disabled={!isPasswordValid || isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog >
  );
}
