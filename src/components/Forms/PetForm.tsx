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

  const { handleSubmit, reset } = methods;

  const formSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(formSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PetForm;
