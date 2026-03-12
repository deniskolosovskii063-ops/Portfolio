import { GIDContent } from '../components/gid-content';
// hero background image (Frame2147222999, 2821×1840)
import imgHeroBg from 'figma:asset/4641e3ef4e3c5e3d0ba5b1a37e8c6bcc9e28825f.png';

export default function GIDPage() {
  return (
    <div className="geist-force bg-black w-full overflow-x-clip relative">

      {/* ── Hero background — full viewport width, no clipping ──────────────
          Figma: img 2821×1840px, left-1/2 -translate-x-1/2, top-0.
          Here we live ABOVE the 1444px content box so overflow-x-hidden
          on GIDContent never clips the sides.
          Container height = 65.1vw  (≈ 940px at 1444px viewport).
      ──────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInline: 0,          /* left:0, right:0 → full viewport width */
          top: 0,
          height: 'clamp(320px, 65.1vw, 940px)',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Image: 195.4vw wide (= 2821px at 1444vw), centered */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: 'max(2821px, 195.4vw)',
          aspectRatio: '2821 / 1840',
        }}>
          <img
            alt=""
            src={imgHeroBg}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <GIDContent />
    </div>
  );
}
