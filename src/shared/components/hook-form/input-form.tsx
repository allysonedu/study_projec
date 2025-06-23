import { Controller } from "react-hook-form";

import type { InputProps } from "./input-props";
import { TextField, type TextFieldProps } from "@mui/material";

type VTextFieldProps = TextFieldProps & InputProps;

export const InputForm = ({
  name,
  control,
  label,
  variant = "filled",
  ...rest
}: VTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant={variant}
        />
      )}
    />
  );
};
