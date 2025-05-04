import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
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
    access, setAccess,
    optionsAccess,
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

            <CustomInput label="NUPTK" fullWidth={true} type="text" value={nuptk} onChange={(c) => setNuptk(c.target.value)} placeholder="nuptk" />

            <CustomInput label="Nama User" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama User" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Akses" fullWidth={true} options={optionsAccess} value={access} onChange={(c) => setAccess(c.target.value)} placeholder="Akses" />

          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="start" mb={4} direction='column'>
            <Grid size={{ sm: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Keterangan:
              </Typography>
            </Grid>

            <Grid container spacing={2} alignItems="center" size={{ lg: 12 }}>
              <Grid size={{ lg: 1.5 }}>
                <Chip
                  label="Super Admin"
                  sx={{
                    backgroundColor: "rgba(138, 43, 226, 0.2)",
                    color: "purple",
                    border: "1px solid purple",
                    fontWeight: "bold",
                  }}
                />
              </Grid>
              <Grid size={{ lg: 6 }}>
                <Typography variant="body2">Dapat Mengakses Semua Fitur</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" size={{ lg: 12 }}>
              <Grid size={{ lg: 1.5 }}>
                <Chip
                  label="Guru"
                  sx={{
                    backgroundColor: "rgba(255, 223, 0, 0.2)",
                    color: "goldenrod",
                    border: "1px solid goldenrod",
                    fontWeight: "bold",
                  }}
                />
              </Grid>
              <Grid size={{ lg: 6 }}>
                <Typography variant="body2">Dapat Mengakses Ujian</Typography>
              </Grid>
            </Grid>

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
