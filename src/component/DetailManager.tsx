import React, {ReactNode, useEffect, useRef, useState} from "react";
import {ActionIcon, Button, Group, Table, Text, TextInput, Title} from "@mantine/core";
import {getObjectSubValue} from "../util/ger.util";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import {AgGridReact} from "ag-grid-react";
import {ColDef, ColGroupDef} from "ag-grid-community/dist/lib/entities/colDef";
import {RowClickedEvent} from "ag-grid-community/dist/lib/events";
import {useModals} from "@mantine/modals";

export interface ColumnProps {
  headerText: string;
  field: string;
  formatter?: (row: any, coluna: ColumnProps) => any;
}

export interface DetailManagerProps {
  columnProps: (ColDef | ColGroupDef)[];
  propName: string;
  keyField: string;
  detailView: React.ComponentType<any>;
  formProps: any;
  title: string;
}


const DetailManager = (props: DetailManagerProps) => {
  const modals = useModals();
  const [rowIndex, setRowIndex] = useState(null as (number | null));
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState(null as any);
  const [selectedItem, setSelectedItem] = useState(undefined as any);
  const {formProps, columnProps, propName, keyField, title} = props;
  const Detail = props.detailView;


  useEffect(() => {
        setTableData(formProps.values[propName])
      },
      [])

  const onRowClickHandler = (event: RowClickedEvent) => {
    setSelectedItem(event.data);
    setRowIndex(event.rowIndex);
  }

  const openEditForm = () => {
    const id = modals.openModal({
      size:"55%",
      children: <><Detail selectedItem={selectedItem} handleSubmit={onSubmitDetailForm} formProps={props.formProps}></Detail> </>,
    });
  }

  const onSubmitDetailForm = async (data:any) => {
    let editedItens;
    console.log(data);
    if (isEditing) {
      editedItens = tableData.map((it:any) => {
        if (Number(it.rowIndex) === Number(data.rowIndex)) {
          return {
            ...it,
            ...data,
          };
        }
        return it;
      });
    }
    setIsEditing(false);
  };

  return <>
    <Group>
      <Title order={3}>{title}</Title>
      <ActionIcon variant="filled" color="green"><Plus/></ActionIcon>
      <ActionIcon variant="filled" color="yellow" onClick={openEditForm}><Pencil/></ActionIcon>
      <ActionIcon variant="filled" color="red"><Trash/></ActionIcon>
    </Group>
    <div className="ag-theme-alpine" style={{height: 200, width: '100%'}}>
      <AgGridReact
          rowData={formProps.values[propName]}
          columnDefs={columnProps}
          onRowClicked={onRowClickHandler}
      />
    </div>
  </>;
}

export default DetailManager;