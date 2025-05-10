import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface IPetFileProps {
  name: string;
  label?: string;
  sx?: object;
  required: boolean;
}

const PetFile: React.FC<IPetFileProps> = ({ name, label = "Upload File", sx, required }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setValue(name, file); // set in form state
      onChange(file);       // update controller state
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange } }) => (
        <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
          >
            {label}
            <input
            required={required}
              type="file"
              hidden
              onChange={(e) => handleChange(e, onChange)}
            />
          </Button>
          {fileName && (
            <Typography variant="caption" mt={1}>
              Selected: {fileName}
            </Typography>
          )}
          {errors[name] && (
            <Typography color="error" variant="caption">
              {errors[name]?.message as string}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default PetFile;
