import React, {useEffect, useState} from "react";
import {ActionIcon, Center, Container, Grid, Group, Paper, Space, TextInput, Title} from "@mantine/core"
import {findAllPessoas, findByNome} from "../../api/pessoa.service";
import {Pencil, Plus, Search, Trash} from "tabler-icons-react";
import {Pessoa} from "../../model/dto/pessoa";
import {useNavigate} from "react-router-dom";
import {AgGridReact} from "ag-grid-react";
import {ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent} from "ag-grid-community";
import dayjs from "dayjs";
import {useDebouncedValue} from "@mantine/hooks";

interface PessoaSearchViewProps {
  onRowDoubleClickEvent?: (evento: RowDoubleClickedEvent) => void;
}

const PessoaSearchView = (props: PessoaSearchViewProps | any) => {
  const [gridApi, setGridApi] = React.useState({} as GridApi);
  const [pessoas, setPessoas] = useState([] as Pessoa[]);
  const [searchNome, setSearchNome] = useState('');
  const [searchNomeDebounce] = useDebouncedValue(searchNome, 1000);
  const history = useNavigate();

  useEffect(() => {
    callFindAllPessoas();
  }, [searchNomeDebounce])

  const callFindAllPessoas = () => {
    findByNome(searchNomeDebounce).then((result: any) => {
      setPessoas(result.data);
    })
  };

  const editPessoa = (item?: Pessoa) => {
    history("/admin/paciente/edit", {state: {pessoa: item}})
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
      cellRenderer: (props: any) => {
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
      <Grid grow>
        <Grid.Col span={12}>
          <TextInput placeholder="Pesquisa por nome" onChange={value => setSearchNome(value.target.value)}/>
        </Grid.Col>
      </Grid>
      <Space h={10}/>
      <Group position="right">
        <ActionIcon variant="filled" color="green" onClick={() => editPessoa()}><Plus size={16}/></ActionIcon>
      </Group>
      <Space h={10}/>
      <Group style={{height: 200}}>
        <div className="ag-theme-alpine" style={{height: "100%", width: '100%'}}>
          <AgGridReact
              onGridReady={onGridReadyHandle}
              rowData={pessoas}
              columnDefs={columns}
              rowSelection="single"
              onRowDoubleClicked={props.onRowDoubleClickEvent || onRowDoubleClickedHandler}
          />
        </div>
      </Group>
    </Paper>
  </Container>
}

export default PessoaSearchView;