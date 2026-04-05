import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { motion, AnimatePresence } from 'framer-motion';

function formatTime(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function CommentSection({
  comments = [],
  onSubmit,
  submitting,
  disabled,
}) {
  const [text, setText] = useState('');

  const handleSend = async () => {
    const t = text.trim();
    if (!t || submitting) return;
    await onSubmit(t);
    setText('');
  };

  return (
    <Box sx={{ mt: 1.5 }}>
      <Box display="flex" alignItems="center" gap={0.75} mb={1}>
        <ChatBubbleOutlineRoundedIcon fontSize="small" color="secondary" />
        <Typography variant="subtitle2" fontWeight={700}>
          Comments ({comments.length})
        </Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="flex-start" mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          multiline
          maxRows={3}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={disabled || !text.trim() || submitting}
          onClick={handleSend}
          sx={{ minWidth: 48, px: 1.5, alignSelf: 'stretch' }}
        >
          {submitting ? <CircularProgress size={22} color="inherit" /> : <SendRoundedIcon />}
        </Button>
      </Box>
      <List dense disablePadding sx={{ maxHeight: 220, overflow: 'auto' }}>
        <AnimatePresence initial={false}>
          {comments.map((c, i) => (
            <motion.div
              key={c._id || `${c.userId}-${i}-${c.text?.slice(0, 8)}`}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              {i > 0 && <Divider sx={{ my: 0.5, opacity: 0.5 }} component="div" />}
              <ListItem alignItems="flex-start" sx={{ px: 0, py: 0.75 }}>
                <ListItemText
                  primary={
                    <Typography component="span" fontWeight={700} color="primary.light">
                      @{c.username}
                    </Typography>
                  }
                  secondary={
                    <Box component="span" display="block">
                      <Typography variant="body2" component="span" sx={{ display: 'block', mt: 0.25 }}>
                        {c.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" component="span">
                        {formatTime(c.createdAt)}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', py: 1 }}>
            No comments yet — start the thread.
          </Typography>
        )}
      </List>
    </Box>
  );
}
