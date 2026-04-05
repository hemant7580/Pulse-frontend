import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LikeButton from './LikeButton.jsx';
import CommentSection from './CommentSection.jsx';
import { mediaUrl } from '../services/api';

function formatPostTime(d) {
  if (!d) return '';
  return new Date(d).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function likesArray(post) {
  const raw = post.likes || [];
  return raw.map((id) => (typeof id === 'string' ? id : id?._id || id?.toString?.() || String(id)));
}

export default function PostCard({
  post,
  currentUserId,
  onLike,
  onComment,
  likeLoading,
  commentLoading,
}) {
  const liked = likesArray(post).some((id) => id === currentUserId);
  const likeCount = (post.likes || []).length;
  const img = post.image ? mediaUrl(post.image) : null;

  return (
    <Paper
      sx={{
        p: 2.25,
        mb: 2.25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2.5,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          boxShadow:
            '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(167, 139, 250, 0.15) inset, 0 0 56px rgba(124, 58, 237, 0.1)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #7c3aed, #6366f1, #22d3ee, #ec4899)',
          opacity: 0.95,
          borderRadius: '16px 16px 0 0',
        },
      }}
    >
      <Box display="flex" gap={1.5} alignItems="flex-start" position="relative" zIndex={1}>
        <motion.div whileHover={{ scale: 1.06, rotate: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              fontWeight: 800,
              fontSize: '1.15rem',
              background: 'linear-gradient(145deg, #6366f1 0%, #a855f7 50%, #22d3ee 100%)',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35), 0 0 0 2px rgba(255,255,255,0.08) inset',
            }}
          >
            {post.username?.[0]?.toUpperCase() || '?'}
          </Avatar>
        </motion.div>
        <Box flex={1} minWidth={0}>
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} mb={0.5}>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography fontWeight={800} variant="subtitle1" sx={{ letterSpacing: -0.3 }}>
                @{post.username}
              </Typography>
              <Chip
                label="Pulse"
                size="small"
                variant="outlined"
                sx={{
                  height: 24,
                  fontSize: '0.7rem',
                  borderColor: 'rgba(34, 211, 238, 0.35)',
                  color: 'secondary.light',
                  bgcolor: 'rgba(34, 211, 238, 0.06)',
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatPostTime(post.createdAt)}
            </Typography>
          </Box>
          {post.text ? (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', mb: img ? 1.5 : 0 }}>
              {post.text}
            </Typography>
          ) : null}
          {img && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box
                component="img"
                src={img}
                alt=""
                sx={{
                  width: '100%',
                  maxHeight: 320,
                  objectFit: 'cover',
                  borderRadius: 2.5,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'block',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                }}
              />
            </motion.div>
          )}
          <Box display="flex" alignItems="center" mt={1.5} gap={2}>
            <LikeButton
              liked={liked}
              count={likeCount}
              disabled={likeLoading}
              onToggle={() => onLike(post._id)}
            />
          </Box>
          <CommentSection
            comments={post.comments || []}
            onSubmit={(t) => onComment(post._id, t)}
            submitting={commentLoading}
            disabled={!currentUserId}
          />
        </Box>
      </Box>
    </Paper>
  );
}
