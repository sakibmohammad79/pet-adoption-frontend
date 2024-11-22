import { z } from "zod";

export const registerValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Enter valid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender is required!",
  }),
  role: z.enum(["PET_ADOPTER", "PET_PUBLISHER"], {
    message: "Role is required!",
  }),
  contactNumber: z
    .string()
    .min(11, { message: "Contact number must be at least 11 digits." })
    .max(11, { message: "Contact number can't exceed 11 digits." }),
  address: z.string().min(1, { message: "Address is required!" }),
});

export const loginValidationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address!" }),
});

export const createAdminValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Enter valid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender is required!",
  }),

  contactNumber: z
    .string()
    .min(11, { message: "Contact number must be at least 11 digits." })
    .max(11, { message: "Contact number can't exceed 11 digits." }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthDate: z.date({ message: "Date of birth is required!" }),
});
