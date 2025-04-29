import { useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";

export function UseStudentHook() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false)
  const [openUpload, setOpenUpload] = useState(false);

  const handleUpload = async (file) => {
    try {
      showLoading()
      const { status, message } = await useApi.uploadFile({
        url: `/academic/student/template/upload`,
        file: file,
        fieldName: 'file'
      });

      setRefreshList(true)
      hideLoading();
      showModal(message, status)
    } catch (err) {
      console.log(err)
      hideLoading();
      showModal("Failed upload file", "error")
    }
  };

  const handleDownloadTemplate = async () => {
    await useApi.download({ url: `/academic/student/template/download` })
  };

  const handleEdit = (id) => {
    navigate(`/${userRole}/data-siswa/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Siswa</strong> ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/student/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "nisn", headerName: "NISN", flex: 0.5, minWidth: 120, renderCell: (row) => row.nisn },
    {
      field: "name", headerName: "NAMA SISWA", flex: 1.5, minWidth: 150, renderCell: (row) => row.name.toUpperCase()
    },
    { field: "gender", headerName: "JENIS KELAMIN", flex: 1, minWidth: 120, renderCell: (row) => row.gender.toUpperCase() },
    { field: "class", headerName: "KELAS", flex: 1, minWidth: 120, renderCell: (row) => row.class_name },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkpurple" },
            }}
            onClick={() => handleEdit(row?.id)}
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
            onClick={() => handleDelete(row?.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const optionSearchStudent = [
    {label: 'Nama Siswa', value: 'name'},
    {label: 'NISN', value: 'nisn'},
  ]

  return {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    isRefreshList,
    columns,
    handleUpload,
    openUpload,
    setOpenUpload,optionSearchStudent,
    handleDownloadTemplate,
  }

}