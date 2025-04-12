import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useAccessCreateHook } from "./useAccessCreateHook.js";
import PropTypes from "prop-types";

export function AccessCreate({ isUpdatePage = false }) {
  const {
    name, setName,
    nuptk, setNuptk,
    username, setUsername,
    password, setPassword,
    access, setAccess,
    optionsAccess,
    handleSubmitCreate,
    resetForm,
  } = useAccessCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Ujian' : 'Tambah Ujian'} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text="Detail Ujian" iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="NUPTK" fullWidth={true} type="text" value={nuptk} onChange={(c) => setNuptk(c.target.value)} placeholder="nuptk" />

            <CustomInput label="Nama Guru" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama Guru" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Username" fullWidth={true} value={username} onChange={(c) => setUsername(c.target.value)} placeholder="Username" />

            <CustomInput label="Password" fullWidth={true} value={password} onChange={(c) => setPassword(c.target.value)} placeholder="password" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Akses" fullWidth={true} options={optionsAccess} value={access} onChange={(c) => setAccess(c.target.value)} placeholder="Akses" />

          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2} mt={3}>

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="outlined" color='secondary' onClick={resetForm}>Reset</Button>
            </Grid>

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
