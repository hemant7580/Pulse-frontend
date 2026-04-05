import { useState, useLayoutEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

const MotionButton = motion(Button);

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const rootRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('[data-panel]'),
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
        }
      );
      gsap.fromTo(
        el.querySelectorAll('[data-float]'),
        { opacity: 0, y: 20 },
        {
          opacity: 0.55,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      ref={rootRef}
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={4}
      position="relative"
      overflow="hidden"
    >
      <Box
        data-float
        sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)',
          top: '6%',
          left: '-8%',
          filter: 'blur(4px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        data-float
        sx={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)',
          bottom: '4%',
          right: '-10%',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Paper
          data-panel
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
              opacity: 0.9,
            },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={800}
            gutterBottom
            sx={{
              letterSpacing: -0.75,
              fontFamily: '"Outfit", "Syne", sans-serif',
              pt: 0.5,
            }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to pulse the feed.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow((s) => !s)} edge="end" aria-label="toggle password">
                    {show ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <MotionButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !email.trim() || !password}
            startIcon={<LoginRoundedIcon />}
            whileTap={{ scale: 0.98 }}
            sx={{
              py: 1.25,
              background: 'linear-gradient(95deg, #7c3aed, #6366f1, #22d3ee)',
              backgroundSize: '200% auto',
              boxShadow: '0 12px 40px rgba(99, 102, 241, 0.35)',
              '&:hover': { backgroundPosition: 'right center' },
              transition: 'background-position 0.45s ease',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </MotionButton>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            No account?{' '}
            <Link component={RouterLink} to="/signup" fontWeight={700} color="secondary.main">
              Create one
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
