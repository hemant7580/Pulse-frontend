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
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

const MotionButton = motion(Button);

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const rootRef = useRef(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(el.querySelector('[data-panel]'), {
        opacity: 0,
        x: 60,
        rotateY: -12,
        duration: 0.9,
        transformPerspective: 1000,
      }).from(
        el.querySelectorAll('[data-stagger]'),
        { opacity: 0, y: 24, stagger: 0.08, duration: 0.5 },
        '-=0.45'
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(email.trim(), username.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim() && username.trim() && password.length >= 6;

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
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(236, 72, 153, 0.15), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(124, 58, 237, 0.2), transparent)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}
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
              background: 'linear-gradient(90deg, #db2777, #7c3aed, #22d3ee)',
              opacity: 0.95,
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
            Join Pulse
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your profile in seconds.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            data-stagger
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
            data-stagger
            fullWidth
            label="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            data-stagger
            fullWidth
            label="Password"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Minimum 6 characters"
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
            disabled={loading || !canSubmit}
            startIcon={<PersonAddAltRoundedIcon />}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              py: 1.25,
              background: 'linear-gradient(95deg, #db2777, #7c3aed, #22d3ee)',
              backgroundSize: '220% auto',
              boxShadow: '0 12px 40px rgba(219, 39, 119, 0.25)',
              '&:hover': { backgroundPosition: 'right center' },
              transition: 'background-position 0.5s ease',
            }}
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </MotionButton>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Already in?{' '}
            <Link component={RouterLink} to="/login" fontWeight={700} color="secondary.main">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
