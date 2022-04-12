import React from "react";
import {Outlet} from "react-router-dom";
import {Container} from '@mantine/core';


const Auth = (props: any) => {

  return (
      <Container fluid>
        <Outlet/>
      </Container>
  );
};

export default Auth;
