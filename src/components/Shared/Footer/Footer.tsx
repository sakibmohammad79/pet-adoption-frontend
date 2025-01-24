import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/social-icon/facebook.png";
import linkedinIcon from "@/assets/social-icon/linkedin.png";
import instagramIcon from "@/assets/social-icon/instagram.png";
import twitterIcon from "@/assets/social-icon/twitter.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        {/* Navigation Links */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: 2, sm: 4 }}
          justifyContent={{ xs: "center", sm: "center" }}
          alignItems="center"
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography color="white" component={Link} href="/consultation">
            Home
          </Typography>
          <Typography color="white" component={Link} href="/medicine">
            About
          </Typography>
          <Typography color="white" component={Link} href="/diagonistics">
            Profile
          </Typography>
        </Stack>

        {/* Social Icons */}
        <Stack
          direction="row"
          justifyContent="center"
          gap={2}
          py={3}
          sx={{
            flexWrap: "wrap",
          }}
        >
          <Link href="/facebook">
            <Image
              alt="facebook"
              height={30}
              width={30}
              src={facebookIcon}
            ></Image>
          </Link>
          <Link href="/linkedin">
            <Image
              alt="linkedin"
              height={30}
              width={30}
              src={linkedinIcon}
            ></Image>
          </Link>
          <Link href="/instagram">
            <Image
              alt="instagram"
              height={30}
              width={30}
              src={instagramIcon}
            ></Image>
          </Link>
          <Link href="/twitter">
            <Image
              alt="twitter"
              height={30}
              width={30}
              src={twitterIcon}
            ></Image>
          </Link>
        </Stack>

        {/* Divider */}
        <Box
          sx={{ border: "1px dashed lightgray", width: "100%", my: 2 }}
        ></Box>

        {/* Footer Bottom Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ xs: 2, sm: 0 }}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography component="p" color="white">
            &copy;2024 Pet Adoption. All Rights Reserved.
          </Typography>
          <Typography
            color="primary.main"
            variant="h5"
            component={Link}
            href="/"
            fontWeight={600}
          >
            PET{" "}
            <Box component="span" color="white">
              ADOPTION
            </Box>
          </Typography>
          <Typography component="p" color="white">
            Pet Adoption. Terms & Conditions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
