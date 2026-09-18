'use client';

import dynamic from 'next/dynamic';

const SceneContainer = dynamic(
  () => import('@/src/components/canvas/SceneContainer'),
  { ssr: false }
);

export default function CanvasBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      <SceneContainer />
    </div>
  );
}