import React, {FC, useState} from "react";
import {ActionIcon, Modal, Text, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Search} from "tabler-icons-react";
import PessoaSearchView from "./PessoaSearchView";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {UseFormReturnType} from "@mantine/form";

interface PessoaISProps {
  onClose?: () => void;
  title?: string;
  formProps: UseFormReturnType<any>;
  attributeName: string;
}

const PessoaIS: FC<PessoaISProps> = ({title, attributeName, formProps}) => {

  const [opened, openedHandler] = useDisclosure(false);
  const [nome, setNome] = useState("");

  const onRowDoubleClickedHandler = (evento: RowDoubleClickedEvent) => {
    formProps.setFieldValue(attributeName, evento.data);
    setNome(`${evento.data.id} - ${evento.data.nome}`);
    openedHandler.close();
  };

  return (
      <>
        <Modal
            opened={opened}
            onClose={openedHandler.close}
            title={<Text size="xl">Paciente</Text>}
            size="xl"
        >
          <PessoaSearchView onRowDoubleClickEvent={onRowDoubleClickedHandler}/>
        </Modal>

        <TextInput placeholder="Selecionar o paciente" value={nome} rightSection={<ActionIcon onClick={() => openedHandler.open()}><Search/></ActionIcon>}
                   disabled/>
      </>
  );
};

export default PessoaIS;