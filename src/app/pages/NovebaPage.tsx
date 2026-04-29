import { NovebaContent } from '../components/noveba-content';
import { BackButton } from '../components/back-button';

export default function NovebaPage() {
  return (
    <div className="bg-black w-full overflow-x-clip relative min-h-screen">
      <BackButton />
      {/* ── Mobile spacer: pushes content below the fixed header on small screens ── */}
      <div className="h-[88px] sm:h-0 shrink-0" aria-hidden="true" />
      <NovebaContent />
    </div>
  );
}