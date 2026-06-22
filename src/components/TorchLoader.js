import React, { Component } from 'react';

const PIXEL = 10;

// 0 = transparent
const COLORS = {
  1: '#ffe066',  // bright yellow  (flame core)
  2: '#ff9900',  // orange         (mid flame)
  3: '#ff4500',  // orange-red     (outer flame)
  4: '#8b2500',  // dark red       (flame base)
  5: '#1a0d00',  // near-black     (torch head)
  6: '#5c3317',  // medium brown   (binding band)
  7: '#6b3a1f',  // brown          (handle)
  8: '#a05a2c',  // light brown    (handle highlight)
};

// Frame A — flame leaning slightly left
const FLAME_A = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 2, 0, 0, 0],
  [0, 1, 1, 2, 2, 2, 0, 0],
  [0, 2, 1, 1, 2, 3, 0, 0],
  [2, 2, 2, 2, 3, 3, 0, 0],
  [2, 2, 3, 3, 3, 3, 2, 0],
  [3, 3, 4, 3, 4, 3, 3, 0],
];

// Frame B — flame leaning slightly right
const FLAME_B = [
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 0, 0],
  [0, 0, 1, 1, 2, 2, 2, 0],
  [0, 2, 1, 1, 2, 2, 3, 0],
  [0, 2, 2, 2, 2, 3, 3, 0],
  [2, 2, 2, 3, 3, 3, 3, 2],
  [3, 4, 3, 3, 4, 3, 4, 3],
];

// Static torch body (head + handle) — aligned to same 8-col grid
const BODY = [
  [5, 5, 5, 5, 5, 5, 5, 0],
  [5, 6, 6, 6, 6, 6, 5, 0],
  [5, 5, 5, 5, 5, 5, 5, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 8, 0, 0, 0],
  [0, 0, 0, 7, 7, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 0],
];

const MESSAGES = [
  'Rolling for initiative...',
  'Consulting the ancient scrolls...',
  'Summoning from the ether...',
  'The Dungeon Master is thinking...',
  'Polishing your +2 sword...',
  'Casting Prestidigitation...',
  'Bribing the tavern keeper...',
  'Reading the stars...',
  'Awakening the ancient spirits...',
];

const KEYFRAMES = `
  @keyframes torch-a {
    0%, 49.9% { opacity: 1; }
    50%, 100%  { opacity: 0; }
  }
  @keyframes torch-b {
    0%, 49.9% { opacity: 0; }
    50%, 100%  { opacity: 1; }
  }
  @keyframes torch-glow {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(255,153,0,0.75)); }
    50%       { filter: drop-shadow(0 0 20px rgba(255,100,0,0.95)); }
  }
`;

const Grid = ({ data }) => (
  <div style={{ lineHeight: 0 }}>
    {data.map((row, r) => (
      <div key={r} style={{ display: 'flex' }}>
        {row.map((c, i) => (
          <div
            key={i}
            style={{ width: PIXEL, height: PIXEL, background: COLORS[c] || 'transparent' }}
          />
        ))}
      </div>
    ))}
  </div>
);

class TorchLoader extends Component {
  state = { msgIdx: 0 };

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState(s => ({ msgIdx: (s.msgIdx + 1) % MESSAGES.length })),
      2200
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { msgIdx } = this.state;
    const flameH = FLAME_A.length * PIXEL;
    const torchW = FLAME_A[0].length * PIXEL;

    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <style>{KEYFRAMES}</style>

        <div style={{
          display: 'inline-block',
          imageRendering: 'pixelated',
          animation: 'torch-glow 0.9s ease-in-out infinite',
        }}>
          {/* Two flame frames overlaid — switch instantly (pixel art style) */}
          <div style={{ position: 'relative', width: torchW, height: flameH }}>
            <div style={{ position: 'absolute', top: 0, left: 0, animation: 'torch-a 0.25s infinite' }}>
              <Grid data={FLAME_A} />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, animation: 'torch-b 0.25s infinite' }}>
              <Grid data={FLAME_B} />
            </div>
          </div>

          {/* Static torch body */}
          <Grid data={BODY} />
        </div>

        <p
          key={msgIdx}
          style={{
            marginTop: 28,
            color: '#8B6914',
            fontStyle: 'italic',
            fontSize: '1.05em',
            fontFamily: 'monospace',
            letterSpacing: '0.03em',
          }}
        >
          {MESSAGES[msgIdx]}
        </p>
      </div>
    );
  }
}

export default TorchLoader;
