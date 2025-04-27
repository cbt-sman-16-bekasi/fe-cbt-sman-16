import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Alert, AlertTitle, Button } from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { UseExamHook } from "./hooks/useExamHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const ExamList = () => {
  const {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    columns,
    isRefreshList,
    searchOptions,
  } = UseExamHook()

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Alert icon={<RocketLaunch fontSize="small" color="info" />} variant="outlined" severity="info" sx={{ p: 1 }}>
            <AlertTitle fontSize="medium">Perhatian!</AlertTitle>
            Untuk menambahkan soal di setaip ujian, silahkan klik tombol <b>setting</b> <SettingsIcon sx={{ verticalAlign: "middle", fontSize: 18, color: "black", backgroundColor: 'yellow' }} />
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/ujian/tambah`}>
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
          <ApiTable url="/academic/exam/all" pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExamList;