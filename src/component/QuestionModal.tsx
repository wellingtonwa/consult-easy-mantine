import React from "react";
import {Modal,  Button, Group, Text} from '@mantine/core';

interface QuestionModalProps {
  open: boolean;
  title?: string;
  question: string;
  confirmAction: () => void;
  confirmText?: string;
  cancelAction: () => void;
  cancelText?: string;
  onClose: () => void
}

const QuestionModal = (props: QuestionModalProps) => {

  const {open, title, question, confirmAction, cancelAction, onClose, confirmText, cancelText} = props;

  return <Modal opened={open} title={title} onClose={onClose}>
    <Group direction={"column"}>
      <Text>{question}</Text>
      <Group direction={"row"} p={10}>
        <Button onClick={confirmAction} color="green">{confirmText || 'Ok'}</Button>
        <Button onClick={cancelAction} color="red">{cancelText || "Cancel"}</Button>
      </Group>
    </Group>

  </Modal>
}

export default QuestionModal;