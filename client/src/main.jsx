import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import App from './App.jsx';
import AppBackground from './components/AppBackground.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBackground />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100dvh',
            isolation: 'isolate',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(100%, 520px)',
              height: '70vh',
              maxHeight: 720,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.08) 0%, rgba(34, 211, 238, 0.04) 40%, transparent 70%)',
              filter: 'blur(2px)',
              pointerEvents: 'none',
              zIndex: -1,
            },
          }}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
