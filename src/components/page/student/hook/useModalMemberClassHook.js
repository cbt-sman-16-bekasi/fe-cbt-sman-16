import {useSelector} from "react-redux";
import {useState} from "react";

export function useModalMemberClassHook() {

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false);
  const columns = []

  const optionSearchStudent = [
    {label: 'Nama Siswa', value: 'name'},
    {label: 'NISN', value: 'nisn'},
  ]

  return {
    userRole,
    search, setSearch,
    isRefreshList, setRefreshList,
    searchBy, setSearchBy,
    columns,
    optionSearchStudent
  }
}