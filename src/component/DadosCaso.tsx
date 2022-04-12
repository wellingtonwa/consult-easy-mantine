import React from "react";
import { Text } from "@mantine/core";

const link = "https://mantis.projetusti.com.br/view.php?id=";

interface DadosCasoProps {
  dadosCaso: any;
}


const DadosCaso = (props: DadosCasoProps) => {

  const { dadosCaso } = props;

  return <Text>
            <a
                href={`${link}${dadosCaso.numeroCaso}`}
                rel="noopener noreferrer"
                target="_blank"
                title="Link para o caso"
            >
              <b>Resumo:</b> {dadosCaso.resumo}<br/>
            </a>
            <b>Categoria:</b> {dadosCaso.categoria}<br/>
            <b>Estado:</b> {dadosCaso.estado}<br/>
            <b>Aberto em:</b> {dadosCaso.dataEnvio}<br/>
            <b>Cliente:</b> {dadosCaso.codigoCliente}<br/>
            <b>Complexidade:</b> {dadosCaso.complexidade}<br/>
            <b>prioridade:</b> {dadosCaso.complexidade}<br/>
            <b>Versão:</b> {dadosCaso.versao}
          </Text>
}

export default DadosCaso;