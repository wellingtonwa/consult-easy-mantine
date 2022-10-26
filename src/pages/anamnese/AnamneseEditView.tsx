import {FC} from "react";
import {Center, Container, Paper, Space, Title} from "@mantine/core";
import {RichTextEditor} from "@mantine/rte";
import {useDisclosure} from "@mantine/hooks";
import PessoaIS from "../pessoa/PessoaIS";
import {useForm} from "@mantine/form";
import {Anamnese} from "../../model/dto/anamnese";

const AnamneseEditView: FC = () => {

  const [showPessoaIS, showPessoaISHandler] = useDisclosure(false);
  const form = useForm<Anamnese>({
    initialValues: {}
  });

  return (
      <Container size="xl">
        <Paper p="md">
          <Title order={1}>
            <Center>Anamnese</Center>
            <Space h={10}/>
            <PessoaIS onClose={() => console.log('asdasd')} title={'Vai'} formProps={form} attributeName="pessoa"/>
            <Space h={10}/>
            <RichTextEditor value={""} onChange={() => console.log("asd")}/>
          </Title>
        </Paper>
      </Container>
  );
}

export default AnamneseEditView;
