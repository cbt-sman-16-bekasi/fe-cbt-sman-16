import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useClassesHook } from "./hooks/useClassesHook.jsx";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const ClassesList = () => {
  const {
    search,
    setSearch,
    userRole,
    columns,
    isRefreshList
  } = useClassesHook()

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" my={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/kelas/tambah`}>
            <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}> Tambah</Button>
          </Link>
        </Grid>
        <Grid lg={4}>
          <SearchBarWithFilter
            onFilterChange={({ searchBy, search: searchData, filters }) => {
              console.log("Search by:", searchBy);
              console.log("Search keyword:", search);
              console.log("Filters:", filters);
              setSearch(searchData)
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
          <ApiTable url="/academic/class/all" pageSize={10} columns={columns} searchKey="name" searchValue={search} isRefresh={isRefreshList} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClassesList;