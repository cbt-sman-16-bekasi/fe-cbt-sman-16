import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { UseExamSessionListHook } from "./hook/useExamSessionListHook.jsx";
import AlertWithTitle from "../../components/common/AlertWithTitle.jsx";
import ApiTable from "../../components/ApiTable.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const ExamSessionListPage = () => {
  const {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    columns,
    isRefreshList,
    searchOptions
  } = UseExamSessionListHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <AlertWithTitle icon={<RocketLaunch fontSize="small" color="info" />} title="Setting Session Ujian!"
        message="Setting sesi ujian digunakan untuk <strong>menjadwalkan waktu pelaksanaan ujian</strong>. Anda dapat menentukan kapan ujian akan dimulai dan kapan ujian akan berakhir. Pastikan untuk mengatur waktu dengan tepat agar semua peserta dapat mengikuti ujian sesuai jadwal yang telah ditentukan."
      />

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/sesi-ujian/tambah`}>
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
          <ApiTable url="/academic/exam/session/all" isRefresh={isRefreshList} pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExamSessionListPage;