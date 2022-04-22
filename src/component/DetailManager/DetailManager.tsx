import React, {FC} from 'react';
import {ActionIcon, Group, Modal, Text, Title} from "@mantine/core";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import QuestionModal from "../QuestionModal";
import {showNotification} from "@mantine/notifications";
import {useModals} from "@mantine/modals";
import {AgGridReact} from "ag-grid-react"
import {GridApi, RowSelectedEvent} from "ag-grid-community";
import {useDisclosure} from "@mantine/hooks";

interface DetailManagerProps {
    title: string;
    keyField: string;
    detailView: React.ComponentType<any>;
    columns: any[];
    propName: string;
    addOnTop?: boolean;
    formProps: any;
}

const DetailManager = (props: DetailManagerProps) => {

    const [gridApi, setGridApi] = React.useState({} as GridApi);
    const modals = useModals();
    const [formVisible, setFormVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState({} as any);
    const [selectedItem, setSelectedItem] = React.useState({} as any);
    const [isEditing, setIsEditing] = React.useState(false);
    const [showDetailView, showDetailViewHandler] = useDisclosure(false);
    const Detail = props.detailView as FC<any>;
    const columns = props.columns;
    const rawData = props.formProps.values[props.propName];

    React.useEffect(() => {
                        setTableData(setIndex(rawData))
                    },
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    []);

    const setIndex = (data: any) => {
        return (
            data &&
            data.map((it: any, index: number) => {
                return {
                    ...it,
                    rowIndex: index,
                };
            })
        );
    };

    const openEditDialog = () => {
        if (selectedItem && selectedItem.rowIndex >= 0) {
            setSelectedItem(selectedItem);
            setIsEditing(true);
            showDetailViewHandler.open();
        } else {
            showDefaultAlert();
        }
    };

    const openInsertDialog = () => {
        setSelectedItem({});
        setIsEditing(false);
        showDetailViewHandler.open();
    };

    const onSubmitDetailForm = async (data: any) => {
        let editedItens;
        if (isEditing) {
            editedItens = tableData.map((it: any) => {
                if (Number(it.rowIndex) === Number(data.rowIndex)) {
                    return {
                        ...it,
                        ...data,
                    };
                }
                return it;
            });
        } else {
            if (props.addOnTop) {
                editedItens = setIndex([data, ...tableData]);
            } else {
                editedItens = [...tableData, {...data, rowIndex: tableData.length}];
            }
        }
        setFormVisible(false);
        setIsEditing(false);
        showDetailViewHandler.close();
        setDataWhenFinishOperation(editedItens);
    };

    const setDataWhenFinishOperation = (data: any) => {
        props.formProps.setFieldValue(props.propName, data, false);
        setTableData(data);
        setSelectedItem(null);
    };

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    const handleOnSelect = (row: RowSelectedEvent) => {
        setSelectedItem(row.data);
    };

    const removeSelectedItem = () => {
        if (selectedItem) {
            modals.openConfirmModal({
                                        title: 'Por favor confirme a ação',
                                        children: (
                                            <Text>Deseja realmente remover o registro selecionado?</Text>
                                        ),
                                        labels: {confirm: 'Sim', cancel: "Não"},
                                        onConfirm: () => {
                                            const filteredItens = tableData.filter(
                                                (it: any) => Number(it.rowIndex) !== Number(selectedItem.rowIndex));
                                            setDataWhenFinishOperation(filteredItens)
                                        },
                                        onCancel: () => console.log("cancelado!")
                                    });
        } else {
            showDefaultAlert();
        }
    };

    const showDefaultAlert = () => {
        showNotification({
                             message: 'Selecione ao menos um registro',
                             color: 'blue'
                         });
    };

    const onGridReadyHandle = (api: any) => {
        setGridApi(api);
    };

    return <>

        <Group>
            <Title order={3}>{props.title}</Title>
            <Group direction="row">
                <ActionIcon size="sm" onClick={openInsertDialog} variant="filled" color="green">
                    <Plus/>
                </ActionIcon>
                <ActionIcon size="sm" onClick={openEditDialog} variant="filled" color="yellow">
                    <Pencil/>
                </ActionIcon>
                <ActionIcon size="sm" onClick={removeSelectedItem} variant="filled" color="red">
                    <Trash/>
                </ActionIcon>
            </Group>
        </Group>
        <Group>
            <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
                <AgGridReact
                    onGridReady={onGridReadyHandle}
                    rowData={tableData}
                    columnDefs={columns}
                    rowSelection="single"
                    onRowSelected={handleOnSelect}
                />
            </div>
        </Group>
        <Modal
            opened={showDetailView}
            onClose={() => showDetailViewHandler.close()}
            title={<>{props.title}</>}
        >
            <Detail
                selectedItem={selectedItem}
                handleSubmit={onSubmitDetailForm}
                handleCancel={() => showDetailViewHandler.close()}
                parentFormProps={props.formProps}
            />
        </Modal>
        <QuestionModal
            open={formVisible}
            onClose={toggleFormVisibility}
            question={"Deseja realmente apagar este registro?"}
            confirmAction={() => console.log("Implementar")}
            cancelAction={() => toggleFormVisibility}
        />
    </>;

};

export default DetailManager;