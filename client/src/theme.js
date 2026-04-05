import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa', light: '#c4b5fd', dark: '#7c3aed' },
    secondary: { main: '#22d3ee', light: '#67e8f9', dark: '#0891b2' },
    background: {
      default: 'transparent',
      paper: 'rgba(15, 23, 42, 0.62)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(148, 163, 184, 0.12)',
  },
  typography: {
    fontFamily: '"DM Sans", "Outfit", system-ui, sans-serif',
    h1: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Outfit", "Syne", "DM Sans", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0.02 },
  },
  shape: { borderRadius: 18 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 14 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(24px) saturate(1.35)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.35)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 1px 0 rgba(255, 255, 255, 0.08) inset',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(167, 139, 250, 0.35)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(34, 211, 238, 0.55)',
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.12)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
});

export default theme;
