import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Box, IconButton, Typography} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDate from "../../../hooks/useDate.js";
import useApi from "../../../utils/rest/api.js";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";

export function UseExamSessionListHook() {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dateHelper = useDate();
  const {showConfirm} = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false)

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
              <li>Kelas: <strong>{row.exam_member !== null ? row.exam_member.map(r => r.detail_class.className).join(', ') : '-'} </strong></li>
              <li>Pelajaran: <strong>{detailExam.subject_code.subject ?? '-'}</strong></li>
            </ul>
          </Box>
        )
      },
    },
    { field: "name", headerName: "NAMA SESI UJIAN", flex: 1, minWidth: 150 },
    { field: "total_student", headerName: "JUMLAH SISWA", flex: 0.7, minWidth: 100 },
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
            onClick={() => navigate(`/${userRole}/sesi-ujian/${row.ID}/detail?sessionId=${row.session_id}`)}
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
            onClick={() => handleDelete(row.ID)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Sesi ujian yang akan dihapus saat ini memiliki keterkaitan dengan beberapa data penting, di antaranya:
        </p>
        <ul style={{ paddingLeft: 18, marginTop: 4, textAlign: 'left' }}>
          <li>📌 Data <strong>kehadiran peserta</strong></li>
          <li>📌 Catatan <strong>jawaban peserta</strong></li>
          <li>📌 Laporan hasil <strong>pelaksanaan ujian</strong></li>
        </ul>
        <p style={{ marginTop: 12, color: '#b91c1c', textAlign: 'left' }}>
          Menghapus sesi ini akan menyebabkan seluruh data yang berkaitan juga terhapus secara permanen dan tidak dapat dikembalikan.
        </p>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Apakah Anda yakin ingin melanjutkan proses penghapusan sesi ujian ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({url: `/academic/exam/session/delete/${id}`})
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const searchOptions = [
    {label: 'Nama Ujian', value: 'detail_exam.name'},
    {label: 'Nama Sesi Ujian', value: 'name'},
  ]

  return {
    search,
    setSearch,
    userRole,
    columns,
    isRefreshList,
    searchOptions
  }
}