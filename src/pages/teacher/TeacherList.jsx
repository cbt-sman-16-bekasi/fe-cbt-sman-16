import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useTeacherHook } from "./hooks/useTeacherHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ApiTable from "../../components/ApiTable.jsx";

const TeacherList = () => {
  const {
    search,
    setSearch,
    userRole,
    columns,
    isRefreshList
  } = useTeacherHook()

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" my={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/guru/tambah`}>
            <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}> Tambah</Button>
          </Link>
        </Grid>
        <Grid lg={4}>
          <TextField
            variant="outlined"
            placeholder="Cari Berdasarkan..."
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
          <ApiTable url="/academic/teacher/all" pageSize={10} columns={columns} searchKey="name" searchValue={search} isRefresh={isRefreshList} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeacherList;