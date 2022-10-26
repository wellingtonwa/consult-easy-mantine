import React from "react";
import {AgGridReact} from "ag-grid-react";
import {Group} from "@mantine/core";
import {GridApi, GridReadyEvent, SelectionChangedEvent} from "ag-grid-community";

interface SearchGridProps {
  title: string;
  keyField: string;
  editView: React.ComponentType<any>;
  columns: any[];
  addOnTop?: boolean;
  tableData: any;
  formProps: any;
}

const SearchGrid = (props: SearchGridProps) => {

  const [gridApi, setGridApi] = React.useState({} as GridApi);
  const { columns, tableData } = props;

  const onGridReadyHandle = (gridReady: GridReadyEvent) => {
    setGridApi(gridReady.api);
    gridReady.api.sizeColumnsToFit();
  };

  const handleOnSelect = (event: SelectionChangedEvent) => {
    if (gridApi.getSelectedRows() && gridApi.getSelectedRows().length) {
      // setSelectedItem(gridApi.getSelectedRows()[0]);
    }
  };

  return <>
    <Group style={{height: 200}}>
      <div className="ag-theme-alpine" style={{height: "100%", width: '100%'}}>
        <AgGridReact
            onGridReady={onGridReadyHandle}
            rowData={tableData}
            columnDefs={columns}
            rowSelection="single"
            // onRowDoubleClicked={onRowDoubleClickedHandler}
            onSelectionChanged={handleOnSelect}
        />
      </div>
    </Group>
  </>

}

export default SearchGrid;