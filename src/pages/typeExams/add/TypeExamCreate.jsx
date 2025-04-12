import { alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import { ModeEditOutlined } from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useTypeExamCreateHook } from "./useTypeExamCreateHook.js";
import PropTypes from "prop-types";

export function TypeExamCreate({ isUpdatePage = false }) {
  const {
    examName, setExamName,
    classCode, setClassCode,
    access, setAccess,
    selectedColor, setSelectedColor,
    optionsColor,
    optionsUserRoles,
    handleSubmitCreate,
    resetForm,
  } = useTypeExamCreateHook({ updatePage: isUpdatePage })

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <TitleWithIcon icon={<ModeEditOutlined sx={{ color: 'white' }} />} text={isUpdatePage ? 'Edit Kode Ujian' : 'Tambah Kode Ujian'} iconBackground="red" />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput label="Jenis Ujian" fullWidth={true} value={examName} onChange={(c) => setExamName(c.target.value)} placeholder="Nama Jenis Ujian" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput label="Buat Kode Jenis Ujian" fullWidth={true} value={classCode} onChange={(c) => setClassCode(c.target.value)} placeholder="Kode Jenis Ujian" />
            </Grid>

          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <CustomInput label="Akses" fullWidth={true} options={optionsUserRoles} value={access} onChange={(c) => setAccess(c.target.value)} placeholder="Akses" />

          </Grid>


          <Grid container spacing={2} columns={12} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold">Warna</Typography>
            </Grid>

            {optionsColor.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <Grid key={color}>
                  <Button
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: isSelected ? color : alpha(color, 0.2),
                      borderRadius: 2,
                      border: `2px solid ${color}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: color,
                      }
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                </Grid>
              );
            })}

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

TypeExamCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}
