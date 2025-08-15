import { Box, Container, Grid, Stack, Typography, Button, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { 
  LocationOn, 
  Phone, 
  Email, 
  AccessTime,
  Pets,
  Favorite,
  VolunteerActivism 
} from "@mui/icons-material";
import facebookIcon from "@/assets/social-icon/facebook.png";
import linkedinIcon from "@/assets/social-icon/linkedin.png";
import instagramIcon from "@/assets/social-icon/instagram.png";
import twitterIcon from "@/assets/social-icon/twitter.png";

const Footer = () => {
  return (
    <Box 
      sx={{
        background: 'linear-gradient(135deg, rgb(17, 26, 34) 0%, rgb(25, 35, 45) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M30 30c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zm12-10.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Box py={6}>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h4"
                    component={Link}
                    href="/"
                    sx={{ 
                      textDecoration: 'none',
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      display: 'inline-block',
                    }}
                  >
                    PET ADOPTION
                  </Typography>
                </Box>
                <Typography variant="body2" color="rgba(255,255,255,0.8)" lineHeight={1.6}>
                  We&apos;re dedicated to connecting loving families with pets in need of forever homes. 
                  Every adoption story begins with compassion and ends with unconditional love.
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Favorite sx={{ color: '#FF6B6B', fontSize: 20 }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    Over 2,500+ successful adoptions since 2020
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" fontWeight={600} mb={2} color="white">
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: 'Available Pets', href: '/pets' },
                  { label: 'Adoption Process', href: '/adoption-process' },
                  { label: 'Success Stories', href: '/success-stories' },
                  { label: 'Pet Care Tips', href: '/care-tips' },
                  { label: 'Volunteer', href: '/volunteer' },
                ].map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#4ECDC4',
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Services */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" fontWeight={600} mb={2} color="white">
                Our Services
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: 'Pet Adoption', href: '/adoption', icon: <Pets sx={{ fontSize: 16 }} /> },
                  { label: 'Pet Fostering', href: '/fostering', icon: <VolunteerActivism sx={{ fontSize: 16 }} /> },
                  { label: 'Veterinary Care', href: '/vet-care', icon: <Favorite sx={{ fontSize: 16 }} /> },
                  { label: 'Training Programs', href: '/training', icon: null },
                  { label: 'Emergency Rescue', href: '/rescue', icon: null },
                ].map((service) => (
                  <Stack key={service.label} direction="row" alignItems="center" gap={1}>
                    {service.icon && (
                      <Box sx={{ color: '#4ECDC4' }}>
                        {service.icon}
                      </Box>
                    )}
                    <Typography
                      component={Link}
                      href={service.href}
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#4ECDC4',
                        }
                      }}
                    >
                      {service.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={600} mb={2} color="white">
                Get In Touch
              </Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" alignItems="flex-start" gap={2}>
                  <LocationOn sx={{ color: '#4ECDC4', fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.9)">
                      123 Pet Haven Street<br />
                      Adoption City, AC 12345<br />
                      United States
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" alignItems="center" gap={2}>
                  <Phone sx={{ color: '#4ECDC4', fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="rgba(255,255,255,0.9)"
                    component={Link}
                    href="tel:+1234567890"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { color: '#4ECDC4' }
                    }}
                  >
                    +1 (234) 567-8900
                  </Typography>
                </Stack>
                
                <Stack direction="row" alignItems="center" gap={2}>
                  <Email sx={{ color: '#4ECDC4', fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="rgba(255,255,255,0.9)"
                    component={Link}
                    href="mailto:info@petadoption.com"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { color: '#4ECDC4' }
                    }}
                  >
                    info@petadoption.com
                  </Typography>
                </Stack>
                
                <Stack direction="row" alignItems="flex-start" gap={2}>
                  <AccessTime sx={{ color: '#4ECDC4', fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.9)" fontWeight={500}>
                      Opening Hours:
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat-Sun: 10:00 AM - 4:00 PM
                    </Typography>
                  </Box>
                </Stack>

                {/* Newsletter Signup */}
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    p: 2,
                    mt: 2,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="subtitle2" color="white" mb={1}>
                    Stay Updated
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={2}>
                    Get the latest news about available pets and adoption events.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                      color: 'white',
                      fontWeight: 600,
                      py: 1,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF5252, #26C6DA)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Subscribe to Newsletter
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Social Media Section */}
        <Box py={3}>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h6" fontWeight={600} textAlign="center">
              Follow Our Journey
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              gap={3}
              sx={{ flexWrap: "wrap" }}
            >
              {[
                { icon: facebookIcon, href: "https://facebook.com/petadoption", alt: "Facebook", label: "Facebook" },
                { icon: instagramIcon, href: "https://instagram.com/petadoption", alt: "Instagram", label: "Instagram" },
                { icon: twitterIcon, href: "https://twitter.com/petadoption", alt: "Twitter", label: "Twitter" },
                { icon: linkedinIcon, href: "https://linkedin.com/company/petadoption", alt: "LinkedIn", label: "LinkedIn" },
              ].map((social) => (
                <Stack key={social.label} alignItems="center" spacing={1}>
                  <Link 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '8px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Image
                      alt={social.alt}
                      height={32}
                      width={32}
                      src={social.icon}
                      style={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Link>
                  <Typography variant="caption" color="rgba(255,255,255,0.7)">
                    {social.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 3 }} />

        {/* Bottom Section */}
        <Box py={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 3, md: 0 }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              &copy; {new Date().getFullYear()} Pet Adoption Center. All Rights Reserved. 
              Made with ❤️ for our furry friends.
            </Typography>
            
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              gap={{ xs: 1, sm: 3 }}
              alignItems="center"
            >
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-conditions' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
                { label: 'Sitemap', href: '/sitemap' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#4ECDC4',
                    }
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;