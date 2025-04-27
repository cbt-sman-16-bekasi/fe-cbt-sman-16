import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Grid from "@mui/material/Grid2";
import { Button, Dialog, DialogContent } from '@mui/material';
import { People } from '@mui/icons-material';
import { useModal } from './ModalContext';
import TitleWithIcon from './TitleWithIcon';
import { UseStudentHook } from '../../pages/students/hooks/useStudentHook';
import ApiTable from '../ApiTable';
import SearchBarWithFilter from "./SearchBarWithFilter";
import { Link } from "react-router";

export default function ModalMemberClass() {
  const { modalMemberClassOpen, hideModalMemberClass, modalMemberType } = useModal();

  const {
    search,
    setSearch,
    columns,
    userRole,
    isRefreshList,
  } = UseStudentHook()

  const isOpen = modalMemberClassOpen && modalMemberType === 'memberClass';

  return (
    <Dialog open={isOpen} onClose={hideModalMemberClass} fullWidth maxWidth="md">
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <TitleWithIcon icon={<People sx={{ color: 'white' }} />} text='Anggota Kelas' iconBackground="red" />

        <Link to={`/${userRole}/data-siswa/tambah`}>
          <Button fullWidth variant="contained" color="info" startIcon={<AddBoxOutlinedIcon />}>Tambah Anggota</Button>
        </Link>
      </Grid>


      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" >
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
            <ApiTable url="/academic/student/all" pageSize={10} columns={columns({ withEdit: false })} searchKey="name" searchValue={search} isRefresh={isRefreshList} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog >
  );
}
