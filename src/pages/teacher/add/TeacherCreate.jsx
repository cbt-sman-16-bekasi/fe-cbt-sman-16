import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useTeacherCreateHook } from "./useTeacherCreateHook.js";
import PropTypes from "prop-types";

export function TeacherCreate({ isUpdatePage = false }) {
  const {
    name, setName,
    nuptk, setNuptk,
    gender, setGender,
    subject, setSubject,
    access, setAccess,
    isEnable, setIsEnable,
    optionsEnableAccess,
    optionsSubject,
    optionsGender,
    optionsAccess,
    handleSubmitCreate,
    resetForm,
  } = useTeacherCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text={isUpdatePage ? "Detail Data Guru" : 'Tambah Data Guru'} iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="NUPTK" fullWidth={true} type="text" value={nuptk} onChange={(c) => setNuptk(c.target.value)} placeholder="nuptk" />

            <CustomInput label="Nama Guru" fullWidth={true} value={name}
              onChange={(c) => setName(c.target.value)}
              placeholder="Nama Guru" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Jenis Kelamin" fullWidth={true} options={optionsGender} value={gender} onChange={(c) => setGender(c.target.value)} placeholder="Jenis Kelamin" />

            <CustomInput label="Hak Akses" fullWidth={true} options={optionsEnableAccess} value={isEnable} onChange={(c) => setIsEnable(c.target.value)} placeholder="Hak Akses" />

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Mata Pelajaran" oneLineInput={true} fullWidth={true} multiple={true} options={optionsSubject} value={subject} onChange={(c) => setSubject(c.target.value)} placeholder="Mata Pelajaran" />

          </Grid>

          {isEnable &&
            <Grid container spacing={3} alignItems="center" columns={12}>

              <CustomInput label="Pilih Akses" oneLineInput={true} fullWidth={true} options={optionsAccess} value={access} onChange={(c) => setAccess(c.target.value)} placeholder="Pilih Akses" />

            </Grid>
          }

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

TeacherCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}
