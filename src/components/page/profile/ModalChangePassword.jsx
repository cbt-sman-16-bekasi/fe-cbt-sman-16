import Grid from "@mui/material/Grid2";
import { Dialog, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox, InputAdornment, Stack, Alert, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useModal } from '../../common/ModalContext.jsx';
import TitleWithIcon from '../../common/TitleWithIcon.jsx';
import { useUserProfileHook } from '../../../pages/userprofile/hooks/useUserProfileHook.jsx';
import {useProfileChangePassword} from "./hook/useProfileChangePassword.js";

export default function ModalChangePassword({ isOpen, isHide}) {
  const {
      currentPassword, setCurrentPassword,
      newPassword, setNewPassword,
      confirmPassword, setConfirmPassword,
      showPassword, setShowPassword,
      passwordMatchError, handleSaveChanges
  } = useProfileChangePassword({hideModalChangePassword: isHide})


  return (
    <Dialog open={isOpen} onClose={isHide} fullWidth maxWidth="xs">
      <Stack sx={{ gap: 1, p: 2, border: '1px solid black' }}>
        <TitleWithIcon sx={{ mb: 0 }} icon={<Lock sx={{ color: 'white' }} />} text='Ubah Password' iconBackground="red" />
      </Stack>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ sm: 12 }}>
            <Typography variant='subtitle2' >Password Lama</Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          label="Tampilkan Password"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
          { (passwordMatchError === '' && confirmPassword && newPassword && currentPassword) && (<Button onClick={handleSaveChanges} variant="contained" color='success' fullWidth>
          Simpan
      </Button>)}
      </DialogActions>
    </Dialog >
  );
}
