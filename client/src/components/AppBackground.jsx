import { Box } from '@mui/material';

/**
 * Full-viewport atmosphere: layered gradients, mesh, orbs, grid, noise, vignette.
 */
export default function AppBackground() {
  return (
    <Box
      aria-hidden
      className="app-background-root"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(165deg, #0c1022 0%, #060912 28%, #030712 55%, #0a0618 100%)',
      }}
    >
      {/* Slow rotating color wash (outer centers, inner spins) */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '165vmax',
          height: '165vmax',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          className="app-bg-conic"
          sx={{
            width: '100%',
            height: '100%',
            opacity: 0.55,
            background: `conic-gradient(
            from 210deg at 50% 50%,
            transparent 0deg,
            rgba(124, 58, 237, 0.12) 55deg,
            transparent 110deg,
            rgba(34, 211, 238, 0.09) 200deg,
            transparent 260deg,
            rgba(236, 72, 153, 0.08) 310deg,
            transparent 360deg
          )`,
          }}
        />
      </Box>

      {/* Soft mesh blobs */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.9,
          background: `
            radial-gradient(ellipse 55% 40% at 20% 30%, rgba(99, 102, 241, 0.16), transparent 50%),
            radial-gradient(ellipse 45% 35% at 85% 20%, rgba(34, 211, 238, 0.1), transparent 50%),
            radial-gradient(ellipse 50% 45% at 70% 85%, rgba(168, 85, 247, 0.12), transparent 55%)
          `,
        }}
      />

      <Box
        className="app-bg-orb app-bg-orb--a"
        sx={{
          position: 'absolute',
          width: { xs: 'min(105vw, 460px)', sm: 'min(92vw, 600px)' },
          height: { xs: 'min(105vw, 460px)', sm: 'min(92vw, 600px)' },
          borderRadius: '50%',
          top: { xs: '-20%', sm: '-14%' },
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.62) 0%, rgba(99, 102, 241, 0.28) 42%, transparent 72%)',
          filter: 'blur(78px)',
          opacity: 0.92,
        }}
      />
      <Box
        className="app-bg-orb app-bg-orb--b"
        sx={{
          position: 'absolute',
          width: { xs: 'min(100vw, 400px)', sm: 'min(85vw, 520px)' },
          height: { xs: 'min(100vw, 400px)', sm: 'min(85vw, 520px)' },
          borderRadius: '50%',
          bottom: { xs: '-12%', sm: '-8%' },
          right: { xs: '-28%', sm: '-14%' },
          background:
            'radial-gradient(circle, rgba(34, 211, 238, 0.48) 0%, rgba(56, 189, 248, 0.15) 48%, transparent 70%)',
          filter: 'blur(70px)',
          opacity: 0.82,
        }}
      />
      <Box
        className="app-bg-orb app-bg-orb--c"
        sx={{
          position: 'absolute',
          width: { xs: 'min(85vw, 340px)', sm: 'min(72vw, 440px)' },
          height: { xs: 'min(85vw, 340px)', sm: 'min(72vw, 440px)' },
          borderRadius: '50%',
          top: '38%',
          left: { xs: '-22%', sm: '-10%' },
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.42) 0%, rgba(244, 114, 182, 0.12) 46%, transparent 68%)',
          filter: 'blur(60px)',
          opacity: 0.68,
        }}
      />

      {/* Horizon line glow */}
      <Box
        sx={{
          position: 'absolute',
          left: '5%',
          right: '5%',
          top: '48%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          opacity: 0.6,
        }}
      />

      <Box
        className="app-bg-aurora"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(118deg, transparent 0%, rgba(124, 58, 237, 0.1) 24%, transparent 50%, rgba(34, 211, 238, 0.08) 76%, transparent 100%)',
          backgroundSize: '240% 240%',
        }}
      />

      {/* Dot constellation */}
      <Box
        className="app-bg-stars"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage: `radial-gradient(1.2px 1.2px at 12% 18%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 28% 42%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1.2px 1.2px at 55% 12%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1px 1px at 72% 35%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.2px 1.2px at 88% 22%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 18% 78%, rgba(255,255,255,0.28), transparent),
            radial-gradient(1.2px 1.2px at 45% 88%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 65% 72%, rgba(255,255,255,0.32), transparent),
            radial-gradient(1.2px 1.2px at 92% 82%, rgba(255,255,255,0.38), transparent)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.42,
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.065) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.065) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 88% 78% at 50% 32%, black 0%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(ellipse 88% 78% at 50% 32%, black 0%, transparent 74%)',
        }}
      />

      <Box
        className="app-bg-noise"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.32,
          mixBlendMode: 'overlay',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 50% 22%, rgba(124, 58, 237, 0.07) 0%, transparent 62%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 125% 92% at 50% 100%, rgba(3, 7, 18, 0.55) 0%, transparent 58%), radial-gradient(ellipse 105% 58% at 50% 0%, rgba(3, 7, 18, 0.38) 0%, transparent 52%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '38%',
          background: 'linear-gradient(to top, rgba(3, 7, 18, 0.88), transparent)',
        }}
      />
    </Box>
  );
}
