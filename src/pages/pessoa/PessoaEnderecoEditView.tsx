import React from "react";
import {Button, Group, Select, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {PessoaEndereco} from "../../model/dto/pessoaEndereco";

const PessoaEnderecoEditView: React.ComponentType<any> = (props: any) => {

    const form = useForm<PessoaEndereco>({
                                            initialValues: props.selectedItem,
                                        });

    return (<>
        <form>
            <TextInput label="Descrição" {...form.getInputProps('descricao')}/>
            <Space h={10}/>
            <TextInput label="CEP" {...form.getInputProps('cep')}/>
            <Space h={10}/>
            <TextInput label="Logradouro" {...form.getInputProps('logradouro')}/>
            <Space h={10}/>
            <TextInput label="Número" {...form.getInputProps('numero')}/>
            <Space h={10}/>
            <TextInput label="Bairro" {...form.getInputProps('bairro')}/>
            <Space h={10}/>
            <Group direction="row">
                <Button onClick={form.onSubmit(props.handleSubmit)}>Salvar</Button>
                <Button onClick={props.handleCancel}>Cancelar</Button>
            </Group>
        </form>
    </>);

};

export default PessoaEnderecoEditView;