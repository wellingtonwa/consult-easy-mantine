import React from "react";
import {Button, Container, Paper, Space, Table, TextInput, Title} from "@mantine/core";
import {useHistory} from "react-router";
import {Pessoa} from "../../model/dto/pessoa";
import {useForm} from "@mantine/form";
import {DatePicker} from "@mantine/dates";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
import {DeviceFloppy, Disc, X} from "tabler-icons-react";
import {updatePessoa} from "../../api/pessoa.service";
import {showNotification} from "@mantine/notifications";

type HistoryState = { pessoa: Pessoa };

const PessoaEditView = (props: any) => {
    const history = useHistory<HistoryState>();
    const paciente = history.location.state.pessoa || {enderecos: [], contatos: []};
    const form = useForm({initialValues: paciente});

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

    const getContatoRows = () => {
        return form.values.contatos?.map((contato, key) => <tr key={key}>
            <td>{contato.id}</td>
            <td>{contato.tipoContato}</td>
            <td>{contato.contato}</td>
        </tr>)
    };

    const getEnderecosRows = () => {
        return form.values.enderecos?.map((endereco) => <tr key={endereco.id}>
            <td>{endereco.id}</td>
            <td>{endereco.cidade?.nome}</td>
            <td>{endereco.logradouro}</td>
        </tr>)
    };

    return <Container size="xl">
        <Paper p={"md"}>
            <Title order={1}>Editar Paciente</Title>

            <Space h={10}/>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput placeholder="nome" label="Nome"{...form.getInputProps('nome')}/>

                <DatePicker label="Data de Nascimento" locale="pt-br" inputFormat="DD/MM/YYYY" value={dayjs(form.values.dataNascimento).toDate()}
                            onChange={value => form.setFieldValue("dataNascimento", dayjs(value).toString())}/>
                <TextInput placeholder="Escola" label="Escola"{...form.getInputProps('escola')}/>

                <Title order={3}>Contatos</Title>
                <Table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Tipo</td>
                        <td>Contato</td>
                    </tr>
                    </thead>
                    <tbody>
                    {getContatoRows()}
                    </tbody>
                </Table>

                <Title order={3}>Endereços</Title>
                <Table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Tipo</td>
                        <td>Contato</td>
                    </tr>
                    </thead>
                    <tbody>
                    {getEnderecosRows()}
                    </tbody>
                </Table>

                <Button leftIcon={<DeviceFloppy/>} color={"green"} type="submit">Salvar</Button>
                <Button leftIcon={<X/>} color={"red"} onClick={()=> history.goBack()}>Cancelar</Button>
            </form>
        </Paper>
    </Container>

}

export default PessoaEditView;