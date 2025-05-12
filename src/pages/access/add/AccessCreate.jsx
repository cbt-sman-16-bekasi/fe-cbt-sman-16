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
    username, setUsername,
    handleSubmitCreate,
    resetForm,
  } = useAccessCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text={isUpdatePage ? "Detail Akses" : 'Tambah Akses'} iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Username" fullWidth={true} type="text" value={username} onChange={(c) => setUsername(c.target.value)} placeholder="username" />

            <CustomInput label="Nama User" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama User" />

          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" my={2}>

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
