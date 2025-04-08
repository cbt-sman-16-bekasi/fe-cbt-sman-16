import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

// export default function CustomizedDataGrid({ columns, rows, checkboxSelection = false, loading }) {
//   return (
//     <DataGrid
//       checkboxSelection={checkboxSelection}
//       rows={rows}
//       columns={columns}
//       getRowClassName={(params) =>
//         params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
//       }
//       getRowHeight={() => 'auto'}
//       initialState={{
//         pagination: { paginationModel: { pageSize: 20 } },
//       }}
//       loading={loading}
//       pageSizeOptions={[10, 20, 50]}
//       disableColumnResize
//       density="comfortable"
//       sx={{
//         "& .MuiDataGrid-cell": {
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'start',
//           py: "12px",
//         },
//         '& .MuiDataGrid-columnHeaders': {
//           bgColor: 'rgba(255, 7, 0, 0.55)',
//         },
//       }}

export default function CustomizedDataGrid({
  columns,
  rows,
  checkboxSelection = false,
  loading,
  paginationModel,
  onPaginationModelChange
}) {
  return (
    <DataGrid
      checkboxSelection={checkboxSelection}
      rows={rows}
      columns={columns}
      pagination
      paginationMode="client"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[10, 30, 50]}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      getRowHeight={() => 'auto'}
      loading={loading}
      disableColumnResize
      density="comfortable"
      sx={{
        "& .MuiDataGrid-cell": {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          py: "12px",
        },
        '& .MuiDataGrid-columnHeaders': {
          bgColor: 'rgba(255, 7, 0, 0.55)',
        },
      }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}



CustomizedDataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  checkboxSelection: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  paginationModel: PropTypes.object.isRequired,
  onPaginationModelChange: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};


CustomizedDataGrid.defaultProps = {
  columns: [],
  rows: [],
  checkboxSelection: false,
  loading: false,
};