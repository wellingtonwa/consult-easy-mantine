import React, {useEffect, useRef, useState} from "react";
import {Input} from "@mantine/core";
import ReactInputMask from "react-input-mask";
import {UseFormReturnType} from "@mantine/form";
import {useDebouncedValue} from "@mantine/hooks";

interface InputMaskedProps {
  label?: string;
  field: string;
  form: UseFormReturnType<any>;
  mask: string[] | string;
  onChange?: (value: any) => void;
}

const InputMask = (props:InputMaskedProps) => {
  const [mask, setMask] = useState(typeof props.mask === 'string' ? props.mask : props.mask[0]);

  const formValue = props.form && props.form.values[props.field];
  const externalChange = useRef<boolean>(false);
  const internalChange = useRef<boolean>(false);

  const getCleanValue = (formatValue:string) => formatValue && formatValue.replace(/[^A-Za-z0-9]/g, '').trim();

  useEffect(
      () => {
        adjustMask(formValue, true);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [formValue]
  );

  const adjustMask = (value: string, eq = false) => {
    const valueClean = getCleanValue(value);
    const maskClean = getCleanValue(mask);
    const propsMask: string[] = typeof props.mask === 'string' ? [] : props.mask;

    console.log(valueClean, "<");
    console.log(maskClean);
    let newMask = null;

    if (valueClean && valueClean.length === maskClean.length) {
      newMask = propsMask.find(it => getCleanValue(it).length > valueClean.length);
    } else if (valueClean && eq) {
      newMask = propsMask.find(it => getCleanValue(it).length === valueClean.length);
    }

    if (newMask) {
      setMask(newMask);
      console.log(value, "<<<<")
    }

    return valueClean && valueClean.length === maskClean.length || !!newMask;
  };

  const onChangeHandler = (event:any) => {
    internalChange.current = true;
    adjustMask(event.target.value);
    console.log(event.target.value, "onChangeHandler");
    props.onChange && props.onChange(event.target.value);
  };

  return <Input.Wrapper label={props.label} error={props.form.errors[props.field]} onChange={onChangeHandler}>
          <Input component={ReactInputMask} mask={mask} {...props.form.getInputProps(props.field)}/>
      </Input.Wrapper>;

};

export default InputMask;