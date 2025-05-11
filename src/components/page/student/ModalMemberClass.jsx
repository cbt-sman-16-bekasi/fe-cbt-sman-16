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
import UnderMaintenance from "../../common/UnderMaintenance.jsx";

export default function ModalMemberClass({ open, setHide, classId }) {

  const {
    userRole,
    setSearch,
    search,
    searchBy, setSearchBy,
    isRefreshList, columns,
    optionSearchStudent
  } = useModalMemberClassHook()

  const isMaintenance = false;

  return (
    <Dialog open={open} onClose={() => setHide(false)} fullWidth maxWidth="md">
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <TitleWithIcon icon={<People sx={{ color: 'white' }} />} text='Anggota Kelas' iconBackground="red" />
      </Grid>
      {!isMaintenance && (
        <>
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
                <ApiTable url={`/academic/class/${classId}/member`} pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} isRefresh={isRefreshList} isPagination={false} />
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}

      {isMaintenance && (<UnderMaintenance />)}
    </Dialog >
  );
}
