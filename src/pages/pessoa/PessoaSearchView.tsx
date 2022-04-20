import React, {useEffect, useState} from "react";
import {ActionIcon, Container, Group, Paper, Space, Table} from "@mantine/core"
import {findAllPessoas} from "../../api/pessoa.service";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import {Pessoa} from "../../model/dto/pessoa";
import {useHistory} from "react-router-dom";

const PessoaSearchView = (props: any) => {
  const [pessoas, setPessoas] = useState([] as Pessoa[]);
  const history = useHistory();

  useEffect(() => {
    callFindAllPessoas();
  }, [])

  const callFindAllPessoas = () => {
    findAllPessoas().then(result => {
      setPessoas(result.data);
    })
  };

  const editPessoa = (item?: Pessoa) => {
    history.push({pathname: "/admin/paciente/edit", state: {pessoa: item}})
  };

  const rows = () => {
    return pessoas.map((pessoa: any, key: number) => <tr key={key}>
      <td>{pessoa.id}</td>
      <td>{pessoa.nome}</td>
      <td>
        <Group direction="row">
          <ActionIcon variant="filled" onClick={() => editPessoa(pessoa)}><Pencil size={16}/></ActionIcon>
          <ActionIcon variant="filled"><Trash size={16}/></ActionIcon>
        </Group>
      </td>
    </tr>)
  };

  return <Container size="xl">
    <Paper p="md">
      <ActionIcon variant="filled" color="green" onClick={() => editPessoa()}><Plus size={16}/></ActionIcon>
      <Space h={10}/>
      <Table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {rows()}
        </tbody>
      </Table>
    </Paper>
  </Container>
}

export default PessoaSearchView;