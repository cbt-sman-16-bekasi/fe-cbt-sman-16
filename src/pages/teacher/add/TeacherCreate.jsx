import Box from "@mui/material/Box";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import { Button, Card, CardContent, Dialog, DialogActions, IconButton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TitleWithIcon from "../../../components/common/TitleWithIcon.jsx";
import {
  MenuBookRounded,
  ModeEditOutlined
} from "@mui/icons-material";
import CustomInput from "../../../components/form/FormInputTextField.jsx";
import { useTeacherCreateHook } from "./useTeacherCreateHook.js";
import PropTypes from "prop-types";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BasicCard from "../../../components/common/BasicCard.jsx";
import ApiTable from "../../../components/ApiTable.jsx";
import { BookMarkedIcon } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";

export function TeacherCreate({ isUpdatePage = false }) {
  const {
    name, setName,
    nuptk, setNuptk,
    gender, setGender,
    optionsEnableAccess,
    optionsGender,
    handleSubmitCreate,
    access,
    setAccess,
    resetForm,
    id,
    columns,
    optionsSubject, subject,
    optionClass,
    setSubject, setClassData, classData,
    showAddSubject, setShowAddSubject,
    handleSubmitTeacherClassSubject,
    isRefreshList,
    handleDelete
  } = useTeacherCreateHook({ updatePage: isUpdatePage })

  columns.push({
    field: "aksi",
    headerName: "AKSI",
    flex: 0.5,
    minWidth: 120,
    renderCell: (row) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "red",
            color: "white",
            "&:hover": { bgcolor: "darkred" },
          }}
          onClick={() => handleDelete(row.ID)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  })

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
            <CustomInput label="Hak Akses" fullWidth={true} options={optionsEnableAccess} value={access} onChange={(c) => setAccess(c.target.value)} placeholder="Hak Akses" />
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

      {isUpdatePage && (
        <>
          <TitleWithIcon icon={<MenuBookRounded sx={{ color: 'white' }} />} text={'Mata Pelajaran dan Kelas'} iconBackground="gray" />
          <BasicCard>
            <Grid container spacing={2} columns={12} justifyContent="space-between" alignItems="center" mb={2} mt={3}>
              <Grid size={{ lg: 2 }} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Button fullWidth variant="contained" color='cbtPrimary' startIcon={<AddBoxOutlinedIcon />} onClick={() => setShowAddSubject(true)}>Tambah Mata Pelajaran</Button>
              </Grid>
            </Grid>
            <Grid container spacing={1} columns={12} sx={{
              '--Grid-borderWidth': '1px',
              borderTop: 'var(--Grid-borderWidth) solid',
              borderLeft: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
              '& > div': {
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider',
              }
            }}>
              <Grid size={{ xs: 12, lg: 12 }}>
                <ApiTable url={`/academic/teacher/${id}/class-subject/all`} pageSize={10} columns={columns} isPagination={false} isRefresh={isRefreshList} />
              </Grid>
            </Grid>
          </BasicCard>

          <Dialog open={showAddSubject} fullWidth maxWidth="sm">
            <Stack sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', gap: 1, p: 2 }}>
              <TitleWithIcon icon={<BookMarkedIcon sx={{ color: 'white' }} />} text='Mata Pelajaran & Kelas' iconBackground="white" />
            </Stack>
            <Grid container sx={{ p: 2, display: 'flex', alignItems: 'start', justifyContent: 'left', gap: 1 }}>
              <CustomInput label="Mata Pelajaran" fullWidth options={optionsSubject}
                type="text" value={subject} onChange={(c) => setSubject(c.target.value)}
                sx={{ width: '100% !important' }}
                placeholder="Mata Pelajaran" />
              <CustomInput label="Kelas" fullWidth options={optionClass} multiple
                type="text" value={classData} onChange={(c) => setClassData(c.target.value)}
                sx={{ width: '100% !important' }}
                placeholder="Kelas" />
            </Grid>

            <DialogActions sx={{ justifyContent: 'end', mb: 2 }}>
              <Button onClick={() => setShowAddSubject(false)} color="inherit">Batal</Button>
              <Button onClick={handleSubmitTeacherClassSubject} color="info" variant="contained">Simpan</Button>
            </DialogActions>
          </Dialog>
        </>
      )}

    </Box>
  )
}

TeacherCreate.propTypes = {
  isUpdatePage: PropTypes.bool
}
