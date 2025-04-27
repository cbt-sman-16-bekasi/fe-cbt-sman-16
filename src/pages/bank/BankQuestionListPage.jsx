import { useBankQuestionListHook } from "./hook/useBankQuestionListHook.js";
import Grid from "@mui/material/Grid2";
import { Alert, AlertTitle, Button, IconButton } from "@mui/material";
import { FiberManualRecord, RocketLaunch } from "@mui/icons-material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ApiTable from "../../components/ApiTable.jsx";
import { useTheme } from "@mui/material/styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBarWithFilter from "../../components/common/SearchBarWithFilter.jsx";

const BankQuestionListPage = () => {
  const {
    columns,
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    handleSettings,
    handleEdit,
    handleDelete,
    isRefreshList,
    authUser,
    searchOptions,
  } = useBankQuestionListHook()
  const bulletPoints = [
    'Penyimpanan Soal: Semua soal dari setiap ujian dan sesi ujian yang dibuat akan disimpan dalam Bank Soal.',
    'Penggunaan Kembali: Soal-soal yang ada dalam Bank Soal dapat digunakan kembali untuk ujian di masa mendatang.',
    'Penambahan Soal: Bapak/Ibu dapat menambahkan soal baru ke dalam Bank Soal untuk memperkaya koleksi soal.',
  ];

  console.log(authUser);
  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Apakah kamu yakin ingin melanjutkan proses <strong>Bank Soal</strong> ini?
        </p>
      </div>
    )
  }

  const action = {
    field: "aksi",
    headerName: "AKSI",
    flex: 1,
    minWidth: 150,
    renderCell: (row) => {
      const theme = useTheme();
      const isDarkMode = theme.palette.mode === "dark";

      return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", height: "100%" }}>
          {/* Tombol Settings */}
          <IconButton
            size="small"
            sx={{
              bgcolor: "yellow",
              color: isDarkMode ? "white" : "black",
              "&:hover": { bgcolor: "gold" },
            }}
            onClick={() => handleSettings(row.ID)}
          >
            <SettingsOutlinedIcon />
          </IconButton>

          {/* Tombol Edit */}
          {authUser.role.code === 'ADMIN' && (<IconButton
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkviolet" },
            }}
            onClick={() => handleEdit(row.ID)}
          >
            <EditIcon />
          </IconButton>)}

          {authUser.role.code === 'ADMIN' && (<IconButton
            size="small"
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "darkred" },
            }}
            onClick={() => handleDelete(messageDelete(), row.ID)}
          >
            <DeleteIcon />
          </IconButton>)}
        </div>
      );
    },
  }

  columns.push(action)

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Alert icon={<RocketLaunch fontSize="small" color="info" />} variant="outlined" severity="info" sx={{ p: 1 }}>
            <AlertTitle fontSize="medium">Perhatian!</AlertTitle>
            Bank Soal adalah fitur yang menyimpan semua soal dari setiap ujian dan sesi ujian yang Anda telah di buat:
            <List sx={{ display: 'flex', flexDirection: 'column', gap: -8 }}>
              {bulletPoints.map((point, index) => (
                <ListItem key={index} alignItems="flex-start" disableGutters>
                  <ListItemIcon sx={{ minWidth: '20px' }}>
                    <FiberManualRecord fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Alert>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${userRole}/bank-soal/tambah`}>
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
          <ApiTable url="/academic/bank/all" isRefresh={isRefreshList} pageSize={10} columns={columns} searchKey={searchBy} searchValue={search} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BankQuestionListPage