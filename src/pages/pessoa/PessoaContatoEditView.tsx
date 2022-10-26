import React from "react";
import {Button, Group, Input, Select, Space, TextInput} from "@mantine/core";
import {useForm, yupResolver} from "@mantine/form";
import {PessoaContato} from "../../model/dto/pessoaContato";
import {TIPO_CONTATO_VALUES, EMAIL} from "../../model/dto/enum/tipoContratoEnum";
import InputMasked from "../../component/InputMasked";
import * as Yup from "yup";

const PessoaContatoEditView: React.ComponentType<any> = (props: any) => {

  const schemaValidationEmail = Yup.object().  shape({
    contato: Yup.string().email("Email incorreto")
  })

  const schemaValidationContato = Yup.object().  shape({
    contato: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/)
  })

  const form = useForm<PessoaContato>({
    initialValues: props.selectedItem,
    validate: yupResolver(schemaValidationEmail),
  });

  const vai = () => {
    console.log(form.validate());
    props.handleSubmit(form.values);
  }

  return (<>
    <form>
      <Select label="Tipo Contato" {...form.getInputProps('tipoContato')} data={TIPO_CONTATO_VALUES}/>
      <Space h={10}/>
      {props.selectedItem && props.selectedItem.tipoContato === EMAIL.value && <TextInput placeholder="Informe o e-mail" type="email" label="e-mail" {...form.getInputProps('contato')}/>}
      {props.selectedItem && props.selectedItem.tipoContato !== EMAIL.value && <InputMasked field={'contato'} form={form} mask={'(99) 99999-9999'}/>}
      <Space h={10}/>
      <Group>
        <Button onClick={vai}>Salvar</Button>
        <Button onClick={props.handleCancel}>Cancelar</Button>
      </Group>
    </form>
  </>);

};

export default PessoaContatoEditView;