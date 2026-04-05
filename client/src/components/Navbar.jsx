import { useLayoutEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Chip } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import gsap from 'gsap';

export default function Navbar({ username, onLogout }) {
  const barRef = useRef(null);
  const brandRef = useRef(null);

  useLayoutEffect(() => {
    const ctxScrollTrigger = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
      );
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.12, ease: 'power2.out' }
      );
    });
    return () => ctxScrollTrigger.revert();
  }, []);

  return (
    <AppBar
      ref={barRef}
      position="sticky"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar,
        background:
          'linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.55) 100%)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: '1px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.45), rgba(34, 211, 238, 0.4), transparent)',
          opacity: 0.9,
        },
      }}
    >
      <Toolbar sx={{ maxWidth: 560, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 }, py: 1.25 }}>
        <Box ref={brandRef} display="flex" alignItems="center" gap={1.25} flex={1}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #22d3ee 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 28px rgba(124, 58, 237, 0.45), 0 0 0 1px rgba(255,255,255,0.12) inset',
            }}
          >
            <BoltRoundedIcon sx={{ color: '#fff', fontSize: 26 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Outfit", "Syne", sans-serif',
                fontWeight: 800,
                letterSpacing: -0.6,
                lineHeight: 1.1,
                background: 'linear-gradient(90deg, #f5f3ff, #a5f3fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Pulse
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.2, opacity: 0.9 }}>
              Live feed
            </Typography>
          </Box>
        </Box>
        <Chip
          label={`@${username}`}
          size="small"
          sx={{
            mr: 1,
            fontWeight: 600,
            height: 28,
            border: '1px solid rgba(167, 139, 250, 0.4)',
            bgcolor: 'rgba(124, 58, 237, 0.18)',
            backdropFilter: 'blur(8px)',
            '& .MuiChip-label': { px: 1.25 },
          }}
        />
        <IconButton
          onClick={onLogout}
          aria-label="logout"
          sx={{
            color: 'text.secondary',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 2,
            '&:hover': {
              color: 'secondary.main',
              bgcolor: 'rgba(34, 211, 238, 0.1)',
              borderColor: 'rgba(34, 211, 238, 0.25)',
            },
          }}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
