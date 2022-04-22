import React from "react";
import {Button, Group, Select, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {PessoaContato} from "../../model/dto/pessoaContato";
import {TIPO_CONTATO_VALUES} from "../../model/dto/enum/tipoContratoEnum";

const PessoaContatoEditView: React.ComponentType<any> = (props: any) => {

    const form = useForm<PessoaContato>({
                               initialValues: props.selectedItem,
    });

    return (<>
            <form>
                <Select label="Tipo Contato" {...form.getInputProps('tipoContato')} data={TIPO_CONTATO_VALUES}/>
                <TextInput label="Contato" {...form.getInputProps('contato')}/>


                <Space h={10}/>
                <Group direction="row">
                    <Button onClick={form.onSubmit(props.handleSubmit)}>Salvar</Button>
                    <Button onClick={props.handleCancel}>Cancelar</Button>
                </Group>
            </form>
        </>);

};

export default PessoaContatoEditView;