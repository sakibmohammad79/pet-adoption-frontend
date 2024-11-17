import { SxProps, TextField } from "@mui/material";
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
}
const PetInput = ({
  name,
  fullWidth,
  size = "small",
  type = "text",
  label,
  sx,
  placeHolder,
  required,
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
          variant="outlined"
          fullWidth={fullWidth}
          size={size}
          type={type}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default PetInput;
