import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useSubjectCreateHook } from "./useSubjectCreateHook.js";
import PropTypes from "prop-types";

export function SubjectCreate({ isUpdatePage = false }) {
  const {
    classCode, setClassCode,
    className, setClassName,
    optionsClassCode,
    handleSubmitCreate,
    resetForm,
  } = useSubjectCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title={isUpdatePage ? 'Edit Kelas' : 'Tambah Kelas'} />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text="Detail Ujian" iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <CustomInput label="Nama Kelas" fullWidth={true} value={className} onChange={(c) => setClassName(c.target.value)} placeholder="Nama Kelas" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Kode Kelas" fullWidth={true} options={optionsClassCode} value={classCode} onChange={(c) => setClassCode(c.target.value)} placeholder="Kode Kelas" />

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

SubjectCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}
