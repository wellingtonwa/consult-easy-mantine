import React, {useEffect} from "react";
import { Container } from "@mantine/core";
import {findAllPessoas} from "../api/pessoa.service";


const Home = () => {

  useEffect(() => {
    callFindPessoas();
  },[]);

  const callFindPessoas = () => {
    findAllPessoas().then(response => {
      console.log(response.data);
    });
  }

  return <Container>
    asdasdasdasssssdddddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaa
  </Container>
}

export default Home;