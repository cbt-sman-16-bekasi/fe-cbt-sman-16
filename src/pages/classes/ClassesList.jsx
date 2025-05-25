import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useClassesHook } from "./hooks/useClassesHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";
import ModalMemberClass from "../../components/page/student/ModalMemberClass.jsx";

const ClassesList = ({role = 'ADMIN'}) => {
  const {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    columns,
    isRefreshList,
    searchOptions,
    classId,
    openModalMember, setOpenModalMember
  } = useClassesHook({role})

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <ModalMemberClass open={openModalMember} setHide={setOpenModalMember} classId={String(classId)} role={role} />

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" my={4}>
          {role === 'ADMIN' && (<Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Link to={`/${userRole}/kelas/tambah`}>
                  <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}> Tambah</Button>
              </Link>
          </Grid>)}
        <Grid >
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
        },
      }}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <ApiTable url="/academic/class/all" pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClassesList;