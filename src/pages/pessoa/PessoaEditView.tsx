import React from "react";
import {Button, Container, Paper, Space, TextInput, Title} from "@mantine/core";
import {useHistory} from "react-router";
import {Pessoa} from "../../model/dto/pessoa";
import {useForm} from "@mantine/form";
import {DatePicker} from "@mantine/dates";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
import {DeviceFloppy, X} from "tabler-icons-react";
import {updatePessoa} from "../../api/pessoa.service";
import {showNotification} from "@mantine/notifications";
import DetailManager from "../../component/DetailManager";
import {ColDef} from "ag-grid-community/dist/lib/entities/colDef";
import PessoaContatoEditView from "./PessoaContatoEditView";

type HistoryState = { pessoa: Pessoa };

const PessoaEditView = (props: any) => {
  const history = useHistory<HistoryState>();
  const paciente = history.location.state.pessoa || {enderecos: [], contatos: []};
  const form = useForm({initialValues: paciente});

  const contatoColumnProps: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id'
    },
    {
      headerName: 'Tipo Contato',
      field: 'tipoContato',
    },
    {
      headerName: 'Contato',
      field: 'contato',
    }
  ];

  const handleSubmit = (values: Pessoa) => {
    updatePessoa(values).then(result => {
      showNotification({
        message: 'Paciente salvo com sucesso',
        color: 'blue'
      });
      history.goBack();
    }).catch(reason => {
      console.log(reason);
    })
  };

  const enderecoColumnProps: ColDef[] = [
    {
      headerName: "ID",
      field: 'id'
    },
    {
      headerName: "Cidade",
      field: 'cidade.nome'
    },
    {
      headerName: "Logradouro",
      field: 'logradouro'
    }
  ];


  return <Container size="xl">
    <Paper p={"md"}>
      <Title order={1}>Editar Paciente</Title>

      <Space h={10}/>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="nome" label="Nome"{...form.getInputProps('nome')}/>

        <DatePicker label="Data de Nascimento" locale="pt-br" inputFormat="DD/MM/YYYY" value={dayjs(form.values.dataNascimento).toDate()}
                    onChange={value => form.setFieldValue("dataNascimento", dayjs(value).toString())}/>
        <TextInput placeholder="Escola" label="Escola"{...form.getInputProps('escola')}/>

        <Space h={10}/>

        <DetailManager
            title="Contatos"
            columnProps={contatoColumnProps}
            formProps={form}
            detailView={PessoaContatoEditView}
            propName="contatos"
            keyField="id"/>

        <Space h={10}/>

        <DetailManager
            title="Endereços"
            columnProps={enderecoColumnProps}
            formProps={form}
            detailView={PessoaContatoEditView}
            propName="enderecos"
            keyField="id"/>

        <Space h={10}/>
      <Button leftIcon={<DeviceFloppy/>} color={"green"} type="submit">Salvar</Button>
      <Button leftIcon={<X/>} color={"red"} onClick={() => history.goBack()}>Cancelar</Button>
    </form>
  </Paper>
</Container>

}

export default PessoaEditView;