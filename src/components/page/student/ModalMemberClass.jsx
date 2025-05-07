import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Grid from "@mui/material/Grid2";
import { Button, Dialog, DialogContent } from '@mui/material';
import { People } from '@mui/icons-material';
import { Link } from "react-router";
import { useModalMemberClassHook } from "./hook/useModalMemberClassHook.jsx";
import TitleWithIcon from "../../common/TitleWithIcon.jsx";
import SearchBarWithFilter from "../../common/SearchBarWithFilter.jsx";
import ApiTable from "../../ApiTable.jsx";
import ServerSearchAutocomplete from "../../common/ServerSearchAutocomplete.jsx";

export default function ModalMemberClass({ open, setHide, classId }) {

  const {
    userRole,
    setSearch,
    search,
    searchBy, setSearchBy,
    isRefreshList, columns,
    optionSearchStudent
  } = useModalMemberClassHook()

  return (
    <Dialog open={open} onClose={() => setHide(false)} fullWidth maxWidth="md">
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <TitleWithIcon icon={<People sx={{ color: 'white' }} />} text='Anggota Kelas' iconBackground="red" />
      </Grid>
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <ServerSearchAutocomplete
          url="/academic/student/all"
          optionLabel="name"
          optionValue="id"
          searchKey="name"
          multiple={true}
        />
        <Link to={`/${userRole}/data-siswa/tambah`}>
          <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}>Tambah Anggota</Button>
        </Link>
      </Grid>


      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" >
          <Grid lg={4}>
            <SearchBarWithFilter
              searchOptions={optionSearchStudent}
              onFilterChange={({ searchBy, search: searchData, filters }) => {
                setSearch(searchData)
                setSearchBy(searchBy)
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
            <ApiTable url={`/academic/student/all?class_id=${classId}`} pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog >
  );
}
