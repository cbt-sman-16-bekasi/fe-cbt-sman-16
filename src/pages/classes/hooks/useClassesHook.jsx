import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Diversity3 from "@mui/icons-material/Diversity3";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";

export function useClassesHook({role = 'ADMIN'}) {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false)

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [classId, setClassId] = useState(null);
  const [openModalMember, setOpenModalMember] = useState(false);

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "classCode", headerName: "KODE KELAS", flex: 1, minWidth: 120 },
    { field: "className", headerName: "NAMA KELAS", flex: 1.5, minWidth: 150 },
    { field: "total_student", headerName: "JUMLAH SISWA", flex: 1.5, minWidth: 150 },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            onClick={() => onOpenMemberModal(row.ID)}
          >
            <Diversity3 sx={{ color: (theme) => theme.palette.text.darkGray, cursor: 'pointer' }} />
          </div>
            {role === 'ADMIN' && (
              <>
                <div
                  onClick={() => handleEdit(row.ID)}
                >
                  <EditIcon sx={{ color: (theme) => theme.palette.text.darkGray, cursor: 'pointer' }} />
                </div>
                <div
                  onClick={() => handleDelete(row.ID)}
                >
                  <DeleteIcon sx={{ color: (theme) => theme.palette.text.darkGray, cursor: 'pointer' }} />
                </div>
              </>
            )}
        </div >
      ),
    },
  ];

  const onOpenMemberModal = (id) => {
    setOpenModalMember(true)
    setClassId(id)
  };

  const handleEdit = (id) => {
    navigate(`/${userRole}/kelas/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Kelas</strong> ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/class/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const searchOptions = [{
    value: 'class_code',
    label: 'Kode Kelas',
  },
  {
    value: 'class_name',
    label: 'Nama Kelas'
  }];

  return {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    isRefreshList,
    columns,
    searchOptions,
    classId, setClassId,
    openModalMember, setOpenModalMember
  }

}