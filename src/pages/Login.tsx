import React, { useState} from "react";
import { Button, Center, Group, Paper, TextInput, Title} from '@mantine/core';
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { doLogin } from "../api/login.service";
import { setToken } from "../util/auth.util";
import { Redirect } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { setData } from "../store/ducks/global.duck";

const Login = () => {

  const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => {
    return state.data;
  });

  const form = useForm({
    initialValues: {
      email: '',
      senha: undefined
    }
  });

  const handleSubmit = (values: any) => {
    doLogin(values).then(response => {
      setToken(response.data.token);
      setLoginSuccess(true);
      dispatch(setData(response.data.token))
    }).catch(reason => {
      showNotification({
        message: 'Usuário ou senha incorreta',
        color: 'red'
      })
    })
  }

  return <Paper sx={{maxWidth: 350}} shadow="lg" mx="auto" p={10}>
    {loginSuccess && <Redirect to="/admin/home"/> }
      <Center>
        <Title order={3}>Login</Title>
      </Center>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {token}
        <TextInput placeholder="E-mail" type="email"
                   {...form.getInputProps('email')}/>
        <TextInput placeholder="Senha" type="password" mt="md"
                   {...form.getInputProps('senha')}/>
        <Group mt={10}>
          <Button type="submit">Entrar</Button>
        </Group>
      </form>
    </Paper>
}

export default Login;