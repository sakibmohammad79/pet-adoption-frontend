import { SxProps, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
interface IInputProps {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  sx?: SxProps;
  fullWidth?: boolean;
  placeHolder?: string;
  required?: boolean;
  rows?: number;
  multiline?: boolean;
  InputProps?: TextFieldProps["InputProps"]; // Allow InputProps
}
const PetInput = ({
  name,
  fullWidth,
  size = "small",
  type = "text",
  label,
  rows,
  multiline,
  sx,
  placeHolder,
  required,
  InputProps, // Accept InputProps
}: IInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          multiline={multiline}
          rows={rows}
          variant="outlined"
          fullWidth={fullWidth}
          size={size}
          type={type}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          InputProps={InputProps}
        />
      )}
    />
  );
};

export default PetInput;
