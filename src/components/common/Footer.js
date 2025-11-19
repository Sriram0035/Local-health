import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg" className="footer-container">
        <Grid container spacing={4} className="footer-grid">
          <Grid item xs={12} md={4} className="footer-brand">
            <Typography variant="h6" className="footer-brand-title">
              Local Health
            </Typography>
            <Typography variant="body2" className="footer-brand-description">
              Your trusted partner in healthcare. We provide comprehensive 
              medical services to ensure your well-being.
            </Typography>
            <Box className="footer-social">
              <IconButton className="footer-social-icon">
                <Facebook />
              </IconButton>
              <IconButton className="footer-social-icon">
                <Twitter />
              </IconButton>
              <IconButton className="footer-social-icon">
                <Instagram />
              </IconButton>
              <IconButton className="footer-social-icon">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2} className="footer-links-section">
            <Typography variant="h6" className="footer-links-title">
              Services
            </Typography>
            <Link href="#" className="footer-link">
              Doctors
            </Link>
            <Link href="#" className="footer-link">
              Pharmacy
            </Link>
            <Link href="#" className="footer-link">
              Lab Tests
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2} className="footer-links-section">
            <Typography variant="h6" className="footer-links-title">
              Company
            </Typography>
            <Link href="#" className="footer-link">
              About Us
            </Link>
            <Link href="#" className="footer-link">
              Careers
            </Link>
            <Link href="#" className="footer-link">
              Contact
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2} className="footer-links-section">
            <Typography variant="h6" className="footer-links-title">
              Support
            </Typography>
            <Link href="#" className="footer-link">
              Help Center
            </Link>
            <Link href="#" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="#" className="footer-link">
              Terms of Service
            </Link>
          </Grid>
        </Grid>

        <Box className="footer-divider">
          <Typography variant="body2" className="footer-copyright">
            © 2024 Local Health. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;