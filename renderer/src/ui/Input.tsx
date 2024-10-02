import React from 'react';
import { Center, Input as MantineInput } from '@mantine/core';

interface ButtonProps {
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: React.HTMLInputTypeAttribute
}

const Input = (props: ButtonProps) => {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
    }}
    >
      <MantineInput.Wrapper
        label={props.label}
      >
        <MantineInput
          placeholder=""
          value={props.value}
          onChange={(event) => props.onChange?.(event.target.value)}
          defaultValue={props.defaultValue}
        />
      </MantineInput.Wrapper>
    </div>
  )
}

export default Input