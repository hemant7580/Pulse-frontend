import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Alert, Fab } from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import CreatePostBox from '../components/CreatePostBox.jsx';
import PostCard from '../components/PostCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import * as api from '../services/api';

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
};

export default function Feed() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [pendingLikes, setPendingLikes] = useState({});
  const [pendingComments, setPendingComments] = useState({});

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const data = await api.fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load feed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const mergePost = (updated) => {
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
  };

  const handleCreate = async (formData) => {
    setCreateLoading(true);
    setError('');
    try {
      const created = await api.createPost(formData);
      setPosts((prev) => [created, ...prev.filter((p) => p._id !== created._id)]);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Could not create post');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (pendingLikes[postId]) return;
    setPendingLikes((s) => ({ ...s, [postId]: true }));
    try {
      const updated = await api.toggleLike(postId);
      mergePost(updated);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Like failed');
    } finally {
      setPendingLikes((s) => {
        const n = { ...s };
        delete n[postId];
        return n;
      });
    }
  };

  const handleComment = async (postId, text) => {
    if (pendingComments[postId]) return;
    setPendingComments((s) => ({ ...s, [postId]: true }));
    try {
      const updated = await api.addComment(postId, text);
      mergePost(updated);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Comment failed');
    } finally {
      setPendingComments((s) => {
        const n = { ...s };
        delete n[postId];
        return n;
      });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentUserId = user?.id != null ? String(user.id) : '';

  return (
    <Box minHeight="100dvh" pb={10}>
      <Navbar username={user?.username} onLogout={handleLogout} />
      <Container maxWidth="sm" sx={{ py: { xs: 2.5, sm: 3 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ position: 'relative', mb: 2.5 }}>
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: { xs: 280, sm: 340 },
              height: { xs: 280, sm: 340 },
              transform: 'translate(-50%, -55%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 65%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              sx={{
                mb: 0.75,
                fontFamily: '"Outfit", "Syne", sans-serif',
                letterSpacing: -1,
                background: 'linear-gradient(105deg, #f5f3ff 0%, #c4b5fd 35%, #67e8f9 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(124, 58, 237, 0.25)',
              }}
            >
              Your feed
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0,
                maxWidth: 360,
                lineHeight: 1.65,
                opacity: 0.92,
              }}
            >
              Share a moment — likes and comments update instantly.
            </Typography>
          </motion.div>
        </Box>

        {error && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{
              mb: 2,
              borderColor: 'rgba(248, 113, 113, 0.35)',
              bgcolor: 'rgba(127, 29, 29, 0.15)',
            }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        <CreatePostBox
          username={user?.username}
          onSubmit={handleCreate}
          submitting={createLoading}
          disabled={createLoading}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            key={posts.length === 0 ? 'empty' : 'has-posts'}
          >
            <AnimatePresence mode="popLayout">
              {posts.map((p) => (
                <motion.div
                  key={p._id}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.22 } }}
                  style={{ marginBottom: 0 }}
                >
                  <PostCard
                    post={p}
                    currentUserId={currentUserId}
                    onLike={handleLike}
                    onComment={handleComment}
                    likeLoading={Boolean(pendingLikes[p._id])}
                    commentLoading={Boolean(pendingComments[p._id])}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {posts.length === 0 && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                sx={{
                  textAlign: 'center',
                  py: 5,
                  px: 2,
                  borderRadius: 3,
                  border: '1px dashed rgba(148, 163, 184, 0.25)',
                  bgcolor: 'rgba(15, 23, 42, 0.35)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ fontFamily: '"Outfit", sans-serif', mb: 0.5 }}
                >
                  Quiet out here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drop your first pulse above — text, a photo, or both.
                </Typography>
              </Box>
            )}
          </motion.div>
        )}
      </Container>
      <Box
        component={motion.div}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        sx={{
          position: 'fixed',
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          zIndex: 20,
        }}
      >
        <Fab
          color="secondary"
          size="medium"
          aria-label="scroll to top"
          onClick={scrollTop}
          sx={{
            background: 'linear-gradient(135deg, #0891b2, #22d3ee)',
            boxShadow: '0 8px 28px rgba(34, 211, 238, 0.35), 0 0 0 1px rgba(255,255,255,0.12) inset',
          }}
        >
          <KeyboardArrowUpRoundedIcon />
        </Fab>
      </Box>
    </Box>
  );
}
