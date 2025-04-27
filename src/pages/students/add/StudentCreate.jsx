import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useStudentCreateHook } from "./useStudentCreateHook.js";
import PropTypes from "prop-types";

export function StudentCreate({ isUpdatePage = false }) {
  const {
    nisn, setNisn,
    name, setName,
    gender, setGender,
    classCode, setClassCode,
    optionsClass,
    optionsGender,
    handleSubmitCreate,
    resetForm,
  } = useStudentCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text="Detail Siswa" iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="NISN" fullWidth={true} type="text" value={nisn} onChange={(c) => setNisn(c.target.value)} placeholder="Nisn Siswa" />

            <CustomInput label="Nama Siswa" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama Siswa" />
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Jenis Kelamin" fullWidth={true} options={optionsGender} value={gender} onChange={(c) => setGender(c.target.value)} placeholder="Jenis Kelamin" />

            <CustomInput label="Kelas" fullWidth={true} options={optionsClass} value={classCode} onChange={(c) => setClassCode(c.target.value)} placeholder="Kelas"
            />
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

StudentCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}