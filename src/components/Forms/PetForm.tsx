import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IFormProps {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}

const PetForm = ({ children, onSubmit }: IFormProps) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const formSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    console.log(data);
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(formSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PetForm;
