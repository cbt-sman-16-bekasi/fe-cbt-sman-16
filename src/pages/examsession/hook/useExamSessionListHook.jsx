import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Box, IconButton, Typography} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDate from "../../../hooks/useDate.js";

export function UseExamSessionListHook() {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dateHelper = useDate();
  const columns = [
    { field: "no", headerName: "NO", flex: 0.2, minWidth: 50 },
    {
      field: "detailUjian",
      headerName: "DETAIL UJIAN",
      flex: 1.5,
      minWidth: 200,
      renderCell: (row) => {
        const detailExam = row.detail_exam
        return (
          <Box>
            <Typography variant="body1" fontWeight="bold">{detailExam.name}</Typography>
            <Typography fontSize={12}>Detail</Typography>
            <ul style={{ paddingLeft: "16px", fontSize: "12px"}}>
              <li>Kelas: <strong>{detailExam.kelas ?? '-'}</strong></li>
              <li>Pelajaran: <strong>{detailExam.subject_code.subject ?? '-'}</strong></li>
            </ul>
          </Box>
        )
      },
    },
    { field: "name", headerName: "NAMA SESI UJIAN", flex: 1, minWidth: 150 },
    { field: "total_member", headerName: "JUMLAH SISWA", flex: 0.7, minWidth: 100 },
    { field: "start_date", headerName: "MULAI", flex: 1, minWidth: 150, renderCell: (row) => dateHelper.formattedWithTime(row.start_date) },
    { field: "end_date", headerName: "SELESAI", flex: 1, minWidth: 150, renderCell: (row) => dateHelper.formattedWithTime(row.end_date) },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.8,
      minWidth: 120,
      renderCell: (row) => (
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{
              bgcolor: "yellow",
              color: "black",
              "&:hover": { bgcolor: "gold" },
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => navigate(`/${userRole}/sesi-ujian/${row.ID}/update`)}
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkviolet" },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "darkred" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]


  return {
    search,
    setSearch,
    userRole,
    columns
  }
}