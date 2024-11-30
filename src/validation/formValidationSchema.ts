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
  birthDate: z.string({ message: "Date of birth is required!" }),
  file: z.string({ message: "Photo is required!" }),
});

export const createPetValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  species: z.enum(["DOG", "CAT", "RABBIT", "BIRD"], {
    message: "Species must be one of Dog, Cat, Rabbit, or Bird!",
  }),
  image: z
    .string()
    .url({ message: "Image URL must be a valid URL!" })
    .optional(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const date = new Date(arg); // Validate if the string is a valid ISO date
      if (!isNaN(date.getTime()) && date.toISOString().startsWith(arg)) {
        return date;
      }
      throw new Error("Invalid date format");
    } // If not a string, return the value as-is (must be a Date object or undefined)
    return arg;
  }, z.date().optional()),
  description: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender is required!",
  }),
  age: z.string().min(0, { message: "Age must be a positive number!" }),
  breed: z.string().min(1, { message: "Breed is required!" }),
  weight: z.string().min(0, { message: "Weight must be a positive number!" }),
  height: z.string().min(0, { message: "Height must be a positive number!" }),
  color: z.string().min(1, { message: "Color is required!" }),
  size: z.enum(["LARGE", "SMALL", "MEDIUM"], {
    message: "Pet size is required!",
  }),
  healthStatus: z.enum(
    ["VACCINATED", "SPAYED_NEUTERED", "SPECIAL_NEEDS", "UNKNOWN"],
    {
      message: "Health status is required!",
    }
  ),
  specialNeeds: z.string().optional(),
  location: z.string().optional(),
  publisherId: z.string().min(1, { message: "Publisher ID is required!" }),
});
