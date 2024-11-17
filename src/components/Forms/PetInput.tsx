import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
interface IInputProps {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
}
const PetInput = ({
  name,
  fullWidth,
  size = "small",
  type = "text",
  label,
}: IInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth={fullWidth}
          size={size}
          type={type}
        />
      )}
    />
  );
};

export default PetInput;
