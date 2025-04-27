import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, CircularProgress, Paper
} from "@mui/material";
import PropTypes from "prop-types";
import useApi from "../utils/rest/api.js";
import { useDebounce } from "../hooks/useDebounce.js";
import { useTheme } from "@mui/material/styles";

export default function ApiTable({
  url,
  columns,
  searchKey = '',
  searchValue,
  pageSize = 10,
  isPagination = true,
  isRefresh = false
}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500); // 500ms debounce
  const isDarkMode = useTheme().palette.mode === 'dark';

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isPagination) {
        const { data } = await useApi.fetchPagination(url, {
          page,
          size: rowsPerPage,
          searchKey,
          searchValue
        });
        const { records, totalRecord } = data;
        setData(records ?? []);
        setTotalRows(totalRecord);
      }

      if (!isPagination) {
        const { data } = await useApi.fetch(url)
        setData(data ?? [])
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, debouncedSearch, isRefresh]);

  const numberSort = (index) => {
    return (index + 1) + (page * rowsPerPage);
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>

      {/* Table */}
      <TableContainer sx={{ borderBottom: '1px solid black' }}>
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
                <TableRow key={row.id || index}
                  sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: !isDarkMode ? index % 2 === 0 ? '#f9f9f9' : '#ffffff' : 'transparent' }}
                >
                  {columns.map((col) => (
                    col.field === 'no' ? (<TableCell key={`${row.id || index}-${col.field}`}>
                      {numberSort(index)}
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
      {isPagination && (<TablePagination
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
      />)}
    </Paper>
  );
}

ApiTable.propTypes = {
  columns: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  searchKey: PropTypes.string,
  searchValue: PropTypes.string,
  isPagination: PropTypes.bool,
  isRefresh: PropTypes.any,
};

ApiTable.defaultProps = {
  columns: [],
  url: '',
  pageSize: 10
};