import React from "react";
import {Container} from '@mantine/core';


const Auth = (props: any) => {

  return (
      <Container fluid>
          {props.children}
      </Container>
  );
};

export default Auth;
