import React from 'react';
import {Button, Group} from "@mantine/core";

const DetailForm = (props: any) => {
  const formProps = props.formProps;

  const onSubmit = async () => {
      let data = formProps.values;
      props.handleSubmit(data);
  };

  return <>
    {props.children}
    <Group direction="row">
        <Button type="submit" color="primary" onClick={onSubmit}>Salvar</Button>
        <Button color="secondary" onClick={props.handleCancel}>Cancelar</Button>
    </Group>
  </>;
}

export default  DetailForm;