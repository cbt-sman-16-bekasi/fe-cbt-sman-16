import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { DownloadOutlined, UploadFile, UploadFileOutlined } from "@mui/icons-material";
import { UseStudentHook } from "./hooks/useStudentHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import UploadFileDialog from "../../components/common/UploadFileDialog.jsx";
import TitleWithIcon from "../../components/common/TitleWithIcon.jsx";
import BasicCard from "../../components/common/BasicCard.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const StudentList = () => {
  const {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    columns,
    isRefreshList,
    handleUpload,
    openUpload,
    setOpenUpload,
    optionSearchStudent,
    handleDownloadTemplate
  } = UseStudentHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" my={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/data-siswa/tambah`}>
            <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}> Tambah</Button>
          </Link>
        </Grid>
        <Grid >
          <SearchBarWithFilter
            searchOptions={optionSearchStudent}
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

      <BasicCard>
        <Grid container spacing={2} columns={12} justifyContent="space-between" alignItems="center" ml={'auto'} >
          <Grid size={{ sm: 12 }} sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button fullWidth variant="contained" color='warning' startIcon={<UploadFileOutlined />} onClick={() => setOpenUpload(true)}>Import Data</Button>
            <Button fullWidth variant="contained" color='success' startIcon={<DownloadOutlined />} onClick={() => handleDownloadTemplate()}>Download Template Import</Button>
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
            <ApiTable url="/academic/student/all" pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} />
          </Grid>
        </Grid>
      </BasicCard>

      <UploadFileDialog
        title={<TitleWithIcon text="Upload File" icon={<UploadFile sx={{ color: 'white' }} />} iconBackground="red" />}
        subTitle="Silahkan untuk mengimpor Data Siswa. Pastikan data yang Anda masukkan sesuai dengan template yang telah disediakan!. Jika Anda belum memiliki template, harap unduh template yang tersedia"
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUpload={handleUpload}
      />
    </Box >
  )
}

export default StudentList;
