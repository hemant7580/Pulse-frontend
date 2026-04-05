import { IconButton, Typography, Box } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function LikeButton({ liked, count, disabled, onToggle }) {
  const heart = useAnimation();

  useEffect(() => {
    if (liked) {
      heart.start({
        scale: [1, 1.35, 1],
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
      });
    }
  }, [liked, heart]);

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <motion.div whileTap={{ scale: 0.88 }}>
        <IconButton
          onClick={onToggle}
          disabled={disabled}
          size="small"
          sx={{
            color: liked ? '#f472b6' : 'text.secondary',
            '&:hover': { color: liked ? '#f9a8d4' : 'primary.light' },
          }}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <motion.div animate={heart} initial={false}>
            {liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          </motion.div>
        </IconButton>
      </motion.div>
      <Typography
        component={motion.span}
        key={count}
        initial={{ opacity: 0.4, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        variant="body2"
        color="text.secondary"
        fontWeight={600}
      >
        {count}
      </Typography>
    </Box>
  );
}
