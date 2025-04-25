import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router";

export function useDashboardPageHook() {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // function getHakAksesColor(status) {
  //   const colors = {
  //     "Admin": "primary",
  //     "Guru": "success",
  //   };

  //   return (
  //     <Chip
  //       variant='outlined'
  //       label={status}
  //       color={colors[status] || "default"}
  //       size="small"
  //     />
  //   );
  // }

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "nuptk", headerName: "NAMA UJIAN", flex: 1, minWidth: 120 },
    { field: "name", headerName: "STATUS", flex: 1.5, minWidth: 150 },
    { field: "username", headerName: "WAKTU MULAI", flex: 1, minWidth: 120, renderCell: (row) => row.detail_user?.username || '-' },
    { field: "password", headerName: "WAKTU SELESAI", flex: 1, minWidth: 120, renderCell: (row) => row.detail_user?.username || '-' },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <VisibilityIcon
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkpurple" },
            }}
            onClick={() => handleView(row.ID)}
          >
            <EditIcon />
          </VisibilityIcon>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    navigate(`/${userRole}/akses-system/${id}/update`)
  };

  return {
    search,
    setSearch,
    userRole,
    columns
  }

}