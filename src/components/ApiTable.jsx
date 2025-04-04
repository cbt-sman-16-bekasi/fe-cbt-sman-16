import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, CircularProgress, Paper
} from "@mui/material";
import PropTypes from "prop-types";
import useApi from "../utils/rest/api.js";
import {useDebounce} from "../hooks/useDebounce.js";

export default function ApiTable({
                                   url,
                                   columns,
                                   searchKey,
                                   searchValue,
                                   pageSize = 10
                                 }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500); // 500ms debounce


  // Fetch data dari API
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await useApi.fetchPagination(url, {
        page,
        rowsPerPage,
        searchKey,
        searchValue
      });
      const { records, totalRecord } = data;
      setData(records);
      setTotalRows(totalRecord);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, debouncedSearch]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#130A36" }}>
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ color: "white", fontWeight: "bold" }}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((col) => (
                    col.field === 'no' ? (<TableCell key={`${row.id || index}-${col.field}`}>
                      {(index * page) + 1}
                    </TableCell>) : (
                    <TableCell key={`${row.id || index}-${col.field}`}>
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </TableCell>)
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

ApiTable.propTypes = {
  columns: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  searchKey: PropTypes.string,
  searchValue: PropTypes.string
};

ApiTable.defaultProps = {
  columns: [],
  url: '',
  pageSize: 10
};