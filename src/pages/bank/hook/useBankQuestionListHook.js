import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";

export function useBankQuestionListHook() {

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false)

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "subject", headerName: "MATA PELAJARAN", flex: 0.1, minWidth: 50, renderCell: (row) => row.detail_subject.subject ?? '-' },
    { field: "class_code", headerName: "KODE KELAS", flex: 0.1, minWidth: 50 },
    { field: "total_question", headerName: "JUMLAH SOAL", flex: 0.1, minWidth: 50, renderCell: (row) => row.total_question ?? 0 },
  ]

  const handleEdit = (id) => {
    navigate(`/${userRole}/bank-soal/${id}/update`)
  };

  const handleDelete = (messageDelete, id) => {
    showConfirm(messageDelete, async () => {
      showLoading()
      await useApi.delete({url: `/academic/bank/delete/${id}`})
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const handleSettings = (code) => {
    navigate(`/${userRole}/bank-soal/${code}/detail`)
  };

  return {
    authUser,
    userRole,
    search, setSearch,
    navigate,
    columns,
    isRefreshList,
    handleEdit,
    handleDelete,
    handleSettings
  }
}