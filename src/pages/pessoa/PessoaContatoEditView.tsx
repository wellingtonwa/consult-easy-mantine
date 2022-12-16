import React from "react";
import {Button, Group, Input, Select, Space, TextInput} from "@mantine/core";
import {useForm, yupResolver} from "@mantine/form";
import {PessoaContato} from "../../model/dto/pessoaContato";
import {TIPO_CONTATO_VALUES, EMAIL} from "../../model/dto/enum/tipoContratoEnum";
import InputMasked from "../../component/InputMasked";
import * as Yup from "yup";
import {TELEFONE} from "../../model/dto/TipoContatoEnum";

const PessoaContatoEditView: React.ComponentType<any> = (props: any) => {

  const schemaValidation = Yup.object().shape({
    tipoContato: Yup.string().required('Selecione o tipo de contato'),
    email: Yup.string().email('Email incorreto').when('tipoContato', { is: 'EMAIL', then: Yup.string().required('Preencha o e-mail') }),
    telefone: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone Inválido').when('tipoContato', {is: 'TELEFONE', then: Yup.string().required('Preencha o número de contato')}),
  });

  const form = useForm<PessoaContato>({
    initialValues: props.selectedItem,
    validate: yupResolver(schemaValidation),
  });

  const tipoContatoChangeHandler = (data:any) => {
    form.setValues({tipoContato: data});
  };

  const submeterFormulario = () => {
    if (!form.validate().hasErrors) {
      props.handleSubmit(form.values);
    }
  };

  return (<>
    <form>
      <Select label="Tipo Contato" {...form.getInputProps('tipoContato')} data={TIPO_CONTATO_VALUES} onChange={tipoContatoChangeHandler}/>
      <Space h={10}/>
      {form.values && form.values.tipoContato === EMAIL.value && <TextInput placeholder="Informe o e-mail" type="email" {...form.getInputProps('email')}/>}
      {form.values && form.values.tipoContato === TELEFONE.value && <InputMasked field={'telefone'} form={form} mask={['(99) 9999-9999', '(99) 99999-9999']}/>}
      <Space h={10}/>
      <Group>
        <Button onClick={submeterFormulario}>Salvar</Button>
        <Button onClick={props.handleCancel}>Cancelar</Button>
      </Group>
    </form>
  </>);

};

export default PessoaContatoEditView;