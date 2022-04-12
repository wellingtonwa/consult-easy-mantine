import React from "react";
import {ActionIcon, AppShell, Group, Header, Navbar, Text} from "@mantine/core";
import {Sword} from "tabler-icons-react";
import menu from "../menu";
import MenuItem from "../component/MenuItem";

const Admin = (props: any) => {

  const appShellTheme = () => {
    return (theme: any) => ({
      main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]},
    });
  }

  const getMenus = () => {
    return menu.map((prop: any, key: any) => {
      return (
          <MenuItem label={prop.label} link={prop.path}>
            <ActionIcon component={prop.icon}/>
            <Text size="lg">{prop.label}</Text>
          </MenuItem>
      )
    });
  }

  return <AppShell
      padding="md"
      header={<Header height={60} p="xs">
        <Group>
          <ActionIcon variant="transparent"><Sword size={32}/></ActionIcon>
          <Text size="xl">Consult-easy</Text>
        </Group>
      </Header>}
      navbar={<Navbar width={{base: 300}} p="xs">
        {getMenus()}
      </Navbar>}
      styles={appShellTheme()}
  >
      {props.children}
  </AppShell>
}

export default Admin;