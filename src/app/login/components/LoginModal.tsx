import PetModal from "@/components/Shared/PetModal/PetModal";
import { Box, Typography } from "@mui/material";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ open, setOpen }: TModalProps) => {
  return (
    <PetModal open={open} setOpen={setOpen} title="Demo Credentials">
      <Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            Admin:
          </Typography>
          <Typography>Email: mohammadsakib7679@gmail.com</Typography>
          <Typography>Password: sakib7679</Typography>
        </Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            adopter:
          </Typography>
          <Typography>Email: sakibmohammad7679@gmail.com</Typography>
          <Typography>Password: sakib7679</Typography>
        </Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            publisher:
          </Typography>
          <Typography>Email: kalponic779@gmail.com</Typography>
          <Typography>Password: sakib7679</Typography>
        </Box>
      </Box>
    </PetModal>
  );
};

export default LoginModal;
