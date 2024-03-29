import React from "react";
import {Button, Container, Group, Paper, Space, TextInput, Title} from "@mantine/core";
import {useLocation, useNavigate} from "react-router";
import {Pessoa} from "../../model/dto/pessoa";
import {useForm, yupResolver} from "@mantine/form";
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
import * as Yup from 'yup';
import {EMAIL} from "../../model/dto/TipoContatoEnum";

type HistoryState = { pessoa: Pessoa };

const PessoaEditView = (props: any) => {
  const history = useNavigate();
  const location: any = useLocation();
  const paciente = location.state.pessoa || {enderecos: [], contatos: []};
  const schema = Yup.object().shape({
    nome: Yup.string().min(2, 'O Nome deve ter no mínimo 2 caracteres.')
  });


  const form = useForm<Pessoa>({
    initialValues: paciente,
    validate: yupResolver(schema),
  });

  const handleSubmit = (values: Pessoa) => {
    if (!form.validate().hasErrors) {
      let saveUpdatePromisse;
      if (values.id) {
        saveUpdatePromisse = updatePessoa(values);
      } else {
        saveUpdatePromisse = savePessoa(values);
      }
      saveUpdatePromisse.then((result:any) => {
        showNotification({
          message: 'Paciente salvo com sucesso',
          color: 'blue'
        });
        history(-1);
      }).catch((reason:any) => {
        console.log(reason);
      })
    }
  };

  const contatoColumns: any = [
    {
      field: 'id',
      headerName: 'ID'
    }, {
      field: 'tipoContato',
      headerName: "Tipo de Contato",
      valueGetter: (param: ValueGetterParams) => {
        const result = TIPO_CONTATO_VALUES.find(it => it.value === param.data.tipoContato);
        return result ? result.label : "";
      }
    },
    {
      valueGetter: (params: any) => {
        console.log(params.getValue('email'), params.getValue('telefone'), params.data);
        let result = 'fail';
        if (params.data.tipoContato === EMAIL.value) {
          result = params.data.email;
        } else {
          result = params.data.telefone;
        }
        return result;
      },
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
          <Button leftIcon={<DeviceFloppy/>} color={"green"} type="submit" size="md">Salvar</Button>
          <Button leftIcon={<X/>} color={"red"} onClick={() => history(-1)} size="md">Cancelar</Button>
        </Group>
      </form>
    </Paper>
  </Container>
};

export default PessoaEditView;