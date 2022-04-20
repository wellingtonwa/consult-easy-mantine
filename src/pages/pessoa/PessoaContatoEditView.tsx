import React from "react";
import {Container, Paper, Select, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import 'dayjs/locale/pt-br';
import {PessoaContato} from "../../model/dto/pessoaContato";
import {TIPO_CONTATO_VALUES} from "../../model/dto/TipoContatoEnum";
import DetailForm from "../../component/DetailForm";

const PessoaContatoEditView = (props: any) => {
  const {selectedItem, formProps} = props;
  const form = useForm<PessoaContato>({initialValues: selectedItem});


  return <Container size="xl">
    <Paper p={"md"}>
      <DetailForm handleSubmit={props.handleSubmit} handleCancel={props.handleCancel}
                  formProps={formProps}>
        <Title order={1}>Editar Contato</Title>
        <Select
            data={TIPO_CONTATO_VALUES}
            {...form.getInputProps('tipoContato')}
        />
        <TextInput placeholder="contato" label="Contato"{...form.getInputProps('contato')}/>
      </DetailForm>
    </Paper>
  </Container>

}

export default PessoaContatoEditView;