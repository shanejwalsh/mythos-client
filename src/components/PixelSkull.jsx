import React from 'react';

const PIXEL = 6;
const BONE = '#e8d5b7';
const DARK = '#2d2d2d';
const COLORS = { 1: BONE, 2: DARK };

// 8x8 pixel skull: 0=transparent 1=bone 2=dark
const SKULL = [
  [0,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1],
  [1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1],
  [1,1,1,2,2,1,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,0,1,0,1,0,1],
  [0,1,0,1,0,1,0,0],
];

const PixelSkull = () => (
  <div style={{ display: 'inline-block', lineHeight: 0, imageRendering: 'pixelated' }}>
    {SKULL.map((row, r) => (
      <div key={r} style={{ display: 'flex' }}>
        {row.map((cell, c) => (
          <div
            key={c}
            style={{
              width: PIXEL,
              height: PIXEL,
              backgroundColor: COLORS[cell] || 'transparent',
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

export default PixelSkull;
