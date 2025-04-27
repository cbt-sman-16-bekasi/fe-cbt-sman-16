import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";
import { useAccessHook } from "./hooks/useAccessHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const AccessList = () => {
  const {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    columns,
    isRefreshList,
    searchOptions,
  } = useAccessHook()

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Alert icon={<RocketLaunch fontSize="small" color="info" />} variant="outlined" severity="info" sx={{ p: 1 }}>
            <AlertTitle fontSize="medium">Perhatian!</AlertTitle>

            <Typography variant="body1" sx={{ mt: 1 }}>
              Dalam sistem ini terdapat dua jenis hak akses utama yang diberikan kepada pengguna, yaitu:
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>1. Super Admin</b>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'
              }}
            >
              <Box component="li"><Typography variant="body2">Super Admin memiliki hak tertinggi dalam sistem.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengakses dan mengelola seluruh menu dan fitur yang ada dalam sistem.</Typography></Box>
              <Box component="li"><Typography variant="body2">Menambahkan, mengedit, dan menghapus data pengguna termasuk admin dan guru.</Typography></Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>2. Guru</b>
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 2,
                mt: 1,
                mb: 0,
                listStyleType: 'disc'
              }}
            >
              <Box component="li"><Typography variant="body2">Guru memiliki hak akases yang lebih terbatas, fokus pada pengelolaan ujian dan penilaian.</Typography></Box>
              <Box component="li"><Typography variant="body2">Mengatur setting ujian, termasuk jadwal, durasi, dan aturan ujian, mengakses dan mengunduh laporan nilai siswa untuk ujian yang mereka kelola.</Typography></Box>
            </Box>
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/akses-system/tambah`}>
            <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}> Tambah</Button>
          </Link>
        </Grid>
        <Grid lg={4}>
          <SearchBarWithFilter
            searchOptions={searchOptions}
            onFilterChange={({ searchBy: searchByData, search: searchData, filters }) => {
              console.log("Search by:", searchByData);
              console.log("Search keyword:", searchData);
              console.log("Filters:", filters);
              setSearch(searchData);
              setSearchBy(searchByData);
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
          <ApiTable url="/academic/teacher/all" pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccessList;