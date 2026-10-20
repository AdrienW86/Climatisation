import { ImageResponse } from 'next/og';
export const alt =
  'Location Climatisation — L’été dehors. Le confort dedans. Perpignan & Pyrénées-Orientales.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#f0f6fc',
        color: '#102a43',
        padding: '70px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 27, fontWeight: 700, color: '#2469e7' }}>
        ↗ location climatisation.
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 83,
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: '-5px',
        }}
      >
        <span>L’été dehors.</span>
        <span style={{ color: '#2469e7' }}>Le confort dedans.</span>
      </div>
      <div style={{ display: 'flex', fontSize: 20, letterSpacing: 3 }}>
        PERPIGNAN & PYRÉNÉES-ORIENTALES
      </div>
      <div
        style={{
          position: 'absolute',
          right: -100,
          top: -120,
          width: 450,
          height: 450,
          borderRadius: '50%',
          border: '70px solid #b9e8f3',
          display: 'flex',
        }}
      />
    </div>,
    size,
  );
}
