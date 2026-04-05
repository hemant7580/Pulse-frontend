import { useRef, useState, useLayoutEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function CreatePostBox({ username, onSubmit, submitting, disabled }) {
  const rootRef = useRef(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, rotateX: -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: 'power3.out',
          transformPerspective: 900,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview('');
  };

  const canSubmit = Boolean(text.trim() || file) && !submitting;

  const handlePost = async () => {
    if (!canSubmit) return;
    const fd = new FormData();
    if (text.trim()) fd.append('text', text.trim());
    if (file) fd.append('image', file);
    await onSubmit(fd);
    setText('');
    clearImage();
  };

  return (
    <Paper
      ref={rootRef}
      component={motion.div}
      layout
      sx={{
        p: 2.25,
        mb: 2.75,
        borderRadius: 2.5,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(124, 58, 237, 0.15) inset',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(125deg, rgba(124,58,237,0.18) 0%, transparent 42%, rgba(34,211,238,0.12) 65%, transparent 100%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '12%',
          right: '12%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          opacity: 0.5,
          pointerEvents: 'none',
        },
      }}
    >
      <Box display="flex" gap={1.5} alignItems="flex-start" position="relative" zIndex={1}>
        <Avatar
          sx={{
            width: 46,
            height: 46,
            mt: 0.5,
            fontWeight: 800,
            background: 'linear-gradient(145deg, #7c3aed, #6366f1, #22d3ee)',
            boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)',
          }}
        >
          {username?.[0]?.toUpperCase() || '?'}
        </Avatar>
        <Box flex={1}>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            gutterBottom
            sx={{
              fontFamily: '"Outfit", "Syne", sans-serif',
              letterSpacing: -0.3,
              background: 'linear-gradient(90deg, #e9d5ff, #a5f3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            New pulse
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={6}
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
            sx={{ mb: 1.5 }}
          />
          {preview && (
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 1.5,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
              />
              <IconButton
                size="small"
                onClick={clearImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Box>
              <input
                hidden
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleFile}
              />
              <label htmlFor="post-image">
                <Button
                  component="span"
                  variant="outlined"
                  size="small"
                  startIcon={<ImageOutlinedIcon />}
                  disabled={disabled}
                >
                  Photo
                </Button>
              </label>
            </Box>
            <Button
              variant="contained"
              color="primary"
              disabled={!canSubmit || disabled}
              onClick={handlePost}
              startIcon={<PostAddRoundedIcon />}
              sx={{
                px: 2.5,
                background: 'linear-gradient(100deg, #7c3aed, #6366f1, #22d3ee)',
                backgroundSize: '200% auto',
                boxShadow: '0 8px 28px rgba(124, 58, 237, 0.4)',
                '&:hover': {
                  backgroundPosition: 'right center',
                  boxShadow: '0 10px 32px rgba(34, 211, 238, 0.25)',
                },
                transition: 'box-shadow 0.35s ease, background-position 0.5s ease',
              }}
            >
              {submitting ? 'Posting…' : 'Post'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
