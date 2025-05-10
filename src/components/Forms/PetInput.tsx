import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TPhInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  sx?: SxProps;
  multiline?: boolean;
  rules?: any;
  rows?: number;
  [key: string]: any; 
};

const PHInput = ({
  name,
  label,
  size = "small",
  type = "text",
  fullWidth,
  sx,
  required,
  multiline,
  rules,
  rows,
  ...rest // 👈 Capture additional props like InputProps here
}: TPhInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        // Special handling for file input
        if (type === "file") {
          return (
            <TextField
              sx={{ ...sx }}
              type="file"
              fullWidth={fullWidth}
              size={size}
              required={required}
              label={label}
              inputProps={{ accept: "image/*" }}
              error={!!error?.message}
              helperText={error?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const fileList = e.target.files;
                field.onChange(fileList); // React Hook Form gets the FileList
              }}
              {...rest}
            />
          );
        }

        // Default text input
        return (
          <TextField
            sx={{ ...sx }}
            {...field}
            label={label}
            variant="outlined"
            size={size}
            type={type}
            fullWidth={fullWidth}
            placeholder={label}
            required={required}
            error={!!error?.message}
            helperText={error?.message}
            multiline={multiline}
            rows={rows}
            {...rest} 
          />
        );
      }}
    />
  );
};

export default PHInput;
