import React from "react";
import {Button, Container, Group, Paper, Space, TextInput, Title} from "@mantine/core";
import {useHistory} from "react-router";
import {Pessoa} from "../../model/dto/pessoa";
import {useForm} from "@mantine/form";
import {DatePicker} from "@mantine/dates";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
import {DeviceFloppy, X} from "tabler-icons-react";
import {savePessoa, updatePessoa} from "../../api/pessoa.service";
import {showNotification} from "@mantine/notifications";
import DetailManager from "../../component/DetailManager/DetailManager";
import PessoaContatoEditView from "./PessoaContatoEditView";
import PessoaEnderecoEditView from "./PessoaEnderecoEditView";
import {ValueGetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {TIPO_CONTATO_VALUES} from "../../model/dto/enum/tipoContratoEnum";

type HistoryState = { pessoa: Pessoa };

const PessoaEditView = (props: any) => {
  const history = useHistory<HistoryState>();
  const paciente = history.location.state.pessoa || {enderecos: [], contatos: []};
  const form = useForm({initialValues: paciente});

  const handleSubmit = (values: Pessoa) => {
    let saveUpdatePromisse;
    if (values.id) {
      saveUpdatePromisse = updatePessoa(values);
    } else {
      saveUpdatePromisse = savePessoa(values);
    }
    saveUpdatePromisse.then(result => {
      showNotification({
        message: 'Paciente salvo com sucesso',
        color: 'blue'
      });
      history.goBack();
    }).catch(reason => {
      console.log(reason);
    })
  };

  const contatoColumns: any = [
    {
      field: 'id',
      headerName: 'ID'
    }, {
      field: 'tipoContato',
      headerName: "Tipo de Contato",
      valueGetter: (param: ValueGetterParams) => {
        const result = TIPO_CONTATO_VALUES.find(it => it.value ===param.data.tipoContato);
        return result ? result.label : "";
      }
    },
    {
      field: 'contato',
      headerName: 'Contato'
    }];

  const enderecoColumns: any = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'logradouro',
      headerName: 'Logradouro'
    },
    {
      field: 'numero',
      headerName: 'Número'
    },
    {
      field: 'complemento',
      headerName: 'Complemento'
    },
    {
      field: 'bairro',
      headerName: 'Bairro'
    },
    {
      field: 'cidade.nome',
      headerName: "Cidade"
    }];

  return <Container size="xl">
    <Paper p={"md"}>
      <Title order={1}>Editar Paciente</Title>

      <Space h={10}/>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="nome" label="Nome"{...form.getInputProps('nome')}/>

        <DatePicker label="Data de Nascimento" locale="pt-br" inputFormat="DD/MM/YYYY"
                    value={dayjs(form.values.dataNascimento).toDate()}
                    onChange={value => form.setFieldValue("dataNascimento", dayjs(value).format('YYYY-MM-DD').toString())}/>
        <TextInput placeholder="Escola" label="Escola"{...form.getInputProps('escola')}/>

        <Space h={10}/>
        <DetailManager
            title="Contatos"
            columns={contatoColumns}
            keyField='id'
            detailView={PessoaContatoEditView}
            propName="contatos"
            formProps={form}
        />

        <Space h={10}/>
        <DetailManager
            title="Endereços"
            columns={enderecoColumns}
            keyField='id'
            detailView={PessoaEnderecoEditView}
            propName="enderecos"
            formProps={form}
        />

        <Space h={15}/>
        <Group>
          <Button leftIcon={<DeviceFloppy/>} color={"green"} type="submit">Salvar</Button>
          <Button leftIcon={<X/>} color={"red"} onClick={() => history.goBack()}>Cancelar</Button>
        </Group>
      </form>
    </Paper>
  </Container>
};

export default PessoaEditView;