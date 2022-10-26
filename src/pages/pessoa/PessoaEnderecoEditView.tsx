import React from "react";
import {Button, Group, Input, Space, TextInput} from "@mantine/core";
import {useForm, yupResolver} from "@mantine/form";
import {PessoaEndereco} from "../../model/dto/pessoaEndereco";
import ReactInputMask from "react-input-mask";
import {consultarCep} from "../../api/cep.service";
import {Cidade} from "../../model/dto/cidade";
import {showNotification} from "@mantine/notifications";
import * as Yup from 'yup';

const PessoaEnderecoEditView: React.ComponentType<any> = (props: any) => {
  const schema = Yup.object().  shape({
    descricao: Yup.string().min(2, 'A descrição deve ter no mínimo 2 caracteres'),
    cep: Yup.string().required("Informe o CEP"),
    numero: Yup.string().required("Informe o Número")
  })

  const form = useForm<PessoaEndereco>({
    initialValues: props.selectedItem,
    validate: yupResolver(schema)
  });
  const formCidade = useForm<Cidade>({
    initialValues: form.values.cidade || {nome: ''}
  })
  const formEstado = useForm<Cidade>({
    initialValues: formCidade.values && formCidade.values.estado || {nome: ''}
  })

  const onChangeCep = (val: any) => {
    const sanitazedValue = val.target.value.replace(/[^0-9]/g, "");
    form.setFieldValue('cep', sanitazedValue);
    if (sanitazedValue.length === 8) {
      consultarCep(sanitazedValue).then((result:any) => {
        if (!!result.data) {
          form.setFieldValue('logradouro', result.data.logradouro)
          form.setFieldValue('bairro', result.data.bairro)
          formCidade.setValues(result.data.cidade || {nome: ''});
          formEstado.setValues(result.data.cidade && result.data.cidade.estado || {nome: ''});
          showNotification({
            message: 'CEP Encontrado',
            color: 'green'
          });
        } else {
          showNotification({
            message: 'CEP Inexistente',
            color: 'yellow'
          });
        }
      })
    }
  };

  const onSubmit = () => {
    console.log('asdsd');
    if (!form.validate().hasErrors) {
      let data = form.values;
      const dados = {...data, ...{cidade: {...formCidade.values, ...{estado: formEstado.values}}}}
      props.handleSubmit(dados);
    }
  }

  return <>
    <form>
      <TextInput label="Descrição" {...form.getInputProps('descricao')}/>
        <Space h={10}/>
        <Input.Wrapper label="CEP" error={form.errors.cep}>
          <Input component={ReactInputMask} mask={'99999-999'} {...form.getInputProps('cep')} onChange={onChangeCep}/>
        </Input.Wrapper>
      <Space h={10}/>
      <TextInput label="Logradouro" {...form.getInputProps('logradouro')}/>
      <Space h={10}/>
      <TextInput label="Número" {...form.getInputProps('numero')}/>
      <Space h={10}/>
      <TextInput label="Complemento" {...form.getInputProps('complemento')}/>
      <Space h={10}/>
      <TextInput label="Bairro" {...form.getInputProps('bairro')}/>
      <Space h={10}/>
      <TextInput label="Cidade" {...formCidade.getInputProps('nome')} disabled/>
      <Space h={10}/>
      <TextInput label="Estado" {...formEstado.getInputProps('nome')} disabled/>
      <Space h={10}/>
      <Group>
        <Button onClick={() =>  onSubmit()} size="md">Salvar</Button>
        <Button onClick={props.handleCancel} size="md">Cancelar</Button>
      </Group>
    </form>
  </>;

};

export default PessoaEnderecoEditView;