import React from "react";
import {Container} from '@mantine/core';
import {Outlet} from "react-router-dom";


const Auth = (props: any) => {

  return (
      <Container fluid>
          <Outlet/>
      </Container>
  );
};

export default Auth;
