import React, {useEffect, useState} from "react";
import {ActionIcon, Center, Container, Group, Paper, Space, Title} from "@mantine/core"
import {findAllPessoas} from "../../api/pessoa.service";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import {Pessoa} from "../../model/dto/pessoa";
import {useHistory} from "react-router-dom";
import {AgGridReact} from "ag-grid-react";
import {ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent} from "ag-grid-community";
import dayjs from "dayjs";

const PessoaSearchView = (props: any) => {
    const [gridApi, setGridApi] = React.useState({} as GridApi);
    const [pessoas, setPessoas] = useState([] as Pessoa[]);
    const history = useHistory();

    useEffect(() => {
        callFindAllPessoas();
    }, [])

    const callFindAllPessoas = () => {
        findAllPessoas().then(result => {
            setPessoas(result.data);
        })
    };

    const editPessoa = (item?: Pessoa) => {
        history.push({pathname: "/admin/paciente/edit", state: {pessoa: item}})
    };

    const onGridReadyHandle = (gridReady: GridReadyEvent) => {
        setGridApi(gridReady.api);
        gridReady.api.sizeColumnsToFit();
    };

    const onRowDoubleClickedHandler = (evento: RowDoubleClickedEvent) => {
        editPessoa(evento.data);
    };

    const columns: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id'
        },
        {
            headerName: 'Nome',
            field: 'nome'
        },
        {
            headerName: 'Dt. Nascimento',
            field: 'dataNascimento',
            valueGetter: params => {
                const dataNascimento = params.data.dataNascimento;
                return dataNascimento ? dayjs(dataNascimento).format('DD-MM-YYYY').toString() : "";
            }
        },
        {
            headerName: 'Escola',
            field: 'escola'
        },
        {
            headerName: 'Ações',
            cellRenderer: (props:any) => {
                return <Group>
                    <ActionIcon onClick={() => editPessoa(props.data)} color="green" variant="filled"><Pencil/></ActionIcon>
                    <ActionIcon color="red" variant="filled"><Trash/></ActionIcon>
                </Group>;
            }
        },
        ];
    return <Container size="xl">
        <Paper p="md">
            <Center>
                <Title order={2}>Pacientes</Title>
            </Center>
            <ActionIcon variant="filled" color="green" onClick={() => editPessoa()}><Plus size={16}/></ActionIcon>
            <Space h={10}/>
            <Group style={{height: 200}}>
                <div className="ag-theme-alpine" style={{height: "100%", width: '100%'}}>
                    <AgGridReact
                        onGridReady={onGridReadyHandle}
                        rowData={pessoas}
                        columnDefs={columns}
                        rowSelection="single"
                        onRowDoubleClicked={onRowDoubleClickedHandler}
                    />
                </div>
            </Group>
        </Paper>
    </Container>
}

export default PessoaSearchView;