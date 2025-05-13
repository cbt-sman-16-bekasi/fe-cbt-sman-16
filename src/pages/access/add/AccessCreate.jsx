import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import {Alert, AlertTitle, Button, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {ModeEditOutlined} from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useAccessCreateHook } from "./useAccessCreateHook.js";
import PropTypes from "prop-types";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export function AccessCreate({ isUpdatePage = false }) {
  const {
    name, setName,
    username, setUsername,
    handleSubmitCreate,
    resetForm,
    status, setStatus,
    statusOption
  } = useAccessCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text={isUpdatePage ? "Detail Akses" : 'Tambah Akses'} iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        {!isUpdatePage && (
          <Alert icon={<WarningAmberIcon fontSize="small" color="yellow" />} variant="outlined" severity="info" sx={{ p: 1, mb: 3 }}>
            <AlertTitle fontSize="medium" fontWeight={800}>PERHATIAN!</AlertTitle>
            Pembuatan data user hanya untuk akses sebagai <strong>Admin</strong>, Untuk akses Guru dapat di akses dari halaman guru dan untuk akses Siswa diakses dari halaman siswa
          </Alert>
        )}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Username"
                         subLabel="Username hanya untuk akun, disarankan tidak menggunakan spasi"
                         fullWidth={true} type="text" value={username} onChange={(c) => setUsername(c.target.value)} placeholder="username" />

            <CustomInput label="Nama User" subLabel="Perubahan atas nama hanya untuk data Akun tidak merubah data di Guru atau lainnya" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama User" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Status Akun" fullWidth={true}
                         type="multiple"
                         value={status} onChange={(c) => setStatus(c.target.value)}
                         options={statusOption}
                         placeholder="Status" />

          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" my={2}>

            { !isUpdatePage && (
              <Grid size={{ lg: 1.5 }}>
                <Button fullWidth variant="outlined" color='secondary' onClick={resetForm}>Reset</Button>
              </Grid>
            )}

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" color='cbtPrimary' onClick={handleSubmitCreate}>Simpan</Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

    </Box>
  )
}

AccessCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}
