import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ISelectOption {
  value: string | number;
  label: string;
}

interface ISelectProps {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  options: ISelectOption[];
}

const PetSelect = ({
  name,
  label,
  size = "small",
  fullWidth = true,
  options,
}: ISelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth={fullWidth} size={size}>
          {label && <InputLabel>{label}</InputLabel>}
          <Select {...field} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default PetSelect;
