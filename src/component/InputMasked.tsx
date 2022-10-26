import React, {useState} from "react";
import {Input} from "@mantine/core";
import ReactInputMask from "react-input-mask";
import {UseFormReturnType} from "@mantine/form";

interface InputMaskedProps {
  label?: string;
  field: string;
  form: UseFormReturnType<any>;
  mask: string[] | string;
}

const InputMask = (props:InputMaskedProps) => {
  const [mask, setMask] = useState(typeof props.mask === 'string' ? props.mask : props.mask[0]);



  const getCleanValue = (formatValue:string) => formatValue.replace(/[^A-Za-z0-9_]/g, '').trim();

  const adjustMask = (value: string, eq = false) => {
    const valueClean = getCleanValue(value);
    const maskClean = getCleanValue(mask);
    const propsMask: string[] = typeof props.mask === 'string' ? [] : props.mask;

    let newMask = null;

    if (valueClean.length === maskClean.length) {
      newMask = propsMask.find(it => getCleanValue(it).length > valueClean.length);
    } else if (eq) {
      newMask = propsMask.find(it => getCleanValue(it).length === valueClean.length);
    }

    if (newMask) {
      setMask(newMask);
    }

    return valueClean.length === maskClean.length || !!newMask;
  };

  return <Input.Wrapper label={props.label} error={props.form.errors[props.field]}>
          <Input component={ReactInputMask} mask={mask} {...props.form.getInputProps(props.field)}/>
      </Input.Wrapper>;

}

export default InputMask;