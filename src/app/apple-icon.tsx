import { ImageResponse } from 'next/og';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f0f6fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 38,
      }}
    >
      <svg width="140" height="140" viewBox="0 0 64 64" fill="none">
        <path d="M14 32c0-10 8-18 18-18h18c0 10-8 18-18 18H14Z" fill="#2878f0" />
        <path d="M50 37c0 10-8 18-18 18H14c0-10 8-18 18-18h18Z" fill="#43b9d5" />
        <path d="M9 24C9 13 18 4 29 4" stroke="#2878f0" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>,
    size,
  );
}
