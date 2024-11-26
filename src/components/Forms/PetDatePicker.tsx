// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import dayjs from "dayjs";
// import { SxProps } from "@mui/material";
// import { Controller, useFormContext } from "react-hook-form";

// interface IDatePickerProps {
//   name: string;
//   size?: "small" | "medium";
//   label?: string;
//   required?: boolean;
//   fullWidth?: boolean;
//   sx?: SxProps;
// }

// const PetDatePicker = ({
//   name,
//   size = "medium",
//   label,
//   required,
//   fullWidth,
//   sx,
// }: IDatePickerProps) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={dayjs().toISOString()} // Set the default value in ISO format
//       render={({ field: { onChange, value, ...field } }) => {
//         return (
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DesktopDatePicker
//               timezone="system"
//               disableFuture
//               {...field}
//               onChange={(date) => {
//                 if (date) {
//                   // Convert the selected date to ISO format
//                   onChange(dayjs(date).toISOString());
//                 }
//               }}
//               value={value ? dayjs(value) : dayjs()} // Ensure compatibility with dayjs
//               slotProps={{
//                 textField: {
//                   required: required,
//                   fullWidth: fullWidth,
//                   size: size,
//                   sx: {
//                     ...sx,
//                   },
//                   variant: "outlined",
//                 },
//               }}
//             />
//           </LocalizationProvider>
//         );
//       }}
//     />
//   );
// };

// export default PetDatePicker;
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePickerProps {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const PetDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth,
  sx,
}: IDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              timezone="system"
              disableFuture
              {...field}
              onChange={(date) => {
                if (date) {
                  onChange(dayjs(date).toISOString()); // Convert to ISO format
                } else {
                  onChange(null); // Handle empty state
                }
              }}
              value={value ? dayjs(value) : null} // No default value
              slotProps={{
                textField: {
                  placeholder: label, // Use label as placeholder
                  required: required,
                  fullWidth: fullWidth,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default PetDatePicker;
