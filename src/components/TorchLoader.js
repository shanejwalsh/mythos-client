import React, { Component } from 'react';

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
  @keyframes torch-outer {
    0%   { transform: translateX(-50%) scaleX(1)    scaleY(1)    rotate(-1deg);  }
    25%  { transform: translateX(-50%) scaleX(0.88) scaleY(1.07) rotate(2deg);   }
    50%  { transform: translateX(-50%) scaleX(1.1)  scaleY(0.93) rotate(-2deg);  }
    75%  { transform: translateX(-50%) scaleX(0.96) scaleY(1.06) rotate(1.5deg); }
    100% { transform: translateX(-50%) scaleX(1.03) scaleY(0.99) rotate(-0.5deg);}
  }
  @keyframes torch-inner {
    0%   { transform: translateX(-50%) scaleX(1)    scaleY(1)    rotate(1deg);   }
    33%  { transform: translateX(-50%) scaleX(0.84) scaleY(1.1)  rotate(-2.5deg);}
    66%  { transform: translateX(-50%) scaleX(1.12) scaleY(0.88) rotate(2deg);   }
    100% { transform: translateX(-50%) scaleX(0.94) scaleY(1.05) rotate(-1deg);  }
  }
  @keyframes torch-hot {
    0%   { transform: translateX(-50%) scaleX(1)    scaleY(1);    }
    50%  { transform: translateX(-50%) scaleX(0.88) scaleY(1.1);  }
    100% { transform: translateX(-50%) scaleX(1.1)  scaleY(0.92); }
  }
  @keyframes torch-ember-1 {
    0%   { transform: translate(0px,  0px);   opacity: 1; }
    100% { transform: translate(9px, -40px);  opacity: 0; }
  }
  @keyframes torch-ember-2 {
    0%   { transform: translate(0px,  0px);   opacity: 1; }
    100% { transform: translate(-8px, -34px); opacity: 0; }
  }
  @keyframes torch-ember-3 {
    0%   { transform: translate(0px,  0px);   opacity: 1; }
    100% { transform: translate(5px, -44px);  opacity: 0; }
  }
  @keyframes torch-glow {
    0%, 100% { box-shadow: 0 -3px 16px 7px  rgba(255, 140, 0, 0.4); }
    50%       { box-shadow: 0 -3px 28px 14px rgba(255,  69, 0, 0.65);}
  }
`;

const flameShape = '50% 50% 50% 50% / 40% 40% 60% 60%';

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

    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <style>{KEYFRAMES}</style>

        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Flame */}
          <div style={{ position: 'relative', width: 44, height: 60, marginBottom: -2 }}>
            {/* Outer flame */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: 30, height: 54,
              borderRadius: flameShape,
              background: 'linear-gradient(to top, #c0392b 0%, #e67e22 45%, #f39c12 75%, #f9ca24 100%)',
              animation: 'torch-outer 0.42s ease-in-out infinite alternate',
              transformOrigin: 'bottom center',
            }} />
            {/* Middle flame */}
            <div style={{
              position: 'absolute', bottom: 4, left: '50%',
              width: 20, height: 42,
              borderRadius: flameShape,
              background: 'linear-gradient(to top, #e67e22 0%, #f39c12 50%, #ffeaa7 100%)',
              animation: 'torch-inner 0.35s ease-in-out infinite alternate',
              transformOrigin: 'bottom center',
            }} />
            {/* Inner core */}
            <div style={{
              position: 'absolute', bottom: 8, left: '50%',
              width: 11, height: 28,
              borderRadius: flameShape,
              background: 'linear-gradient(to top, #f9ca24 0%, #fffde7 100%)',
              animation: 'torch-hot 0.28s ease-in-out infinite alternate-reverse',
              transformOrigin: 'bottom center',
            }} />
            {/* Embers */}
            <div style={{
              position: 'absolute', width: 4, height: 4, borderRadius: '50%',
              background: '#e74c3c', bottom: 32, left: 33,
              animation: 'torch-ember-1 1.1s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute', width: 3, height: 3, borderRadius: '50%',
              background: '#f39c12', bottom: 25, left: 5,
              animation: 'torch-ember-2 0.9s ease-out infinite 0.45s',
            }} />
            <div style={{
              position: 'absolute', width: 3, height: 3, borderRadius: '50%',
              background: '#f9ca24', bottom: 38, left: 18,
              animation: 'torch-ember-3 1.3s ease-out infinite 0.8s',
            }} />
          </div>

          {/* Torch head */}
          <div style={{
            width: 32, height: 26,
            background: 'linear-gradient(to bottom, #3d2b1f 0%, #6b4423 50%, #3d2b1f 100%)',
            borderRadius: '3px 3px 2px 2px',
            position: 'relative',
            animation: 'torch-glow 1.5s ease-in-out infinite',
          }}>
            <div style={{ position: 'absolute', top: 5,  left: 0, right: 0, height: 2, background: 'rgba(0,0,0,0.4)' }} />
            <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 2, background: 'rgba(0,0,0,0.4)' }} />
            <div style={{ position: 'absolute', top: 17, left: 0, right: 0, height: 2, background: 'rgba(0,0,0,0.4)' }} />
          </div>

          {/* Handle */}
          <div style={{
            width: 11, height: 90,
            background: 'linear-gradient(to right, #7d5a3c 0%, #a07850 40%, #6b4423 100%)',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 14, left: 2, right: 2, height: 1, background: 'rgba(0,0,0,0.2)'  }} />
            <div style={{ position: 'absolute', top: 30, left: 2, right: 2, height: 1, background: 'rgba(0,0,0,0.25)' }} />
            <div style={{ position: 'absolute', top: 50, left: 2, right: 2, height: 1, background: 'rgba(0,0,0,0.2)'  }} />
            <div style={{ position: 'absolute', top: 68, left: 2, right: 2, height: 1, background: 'rgba(0,0,0,0.25)' }} />
          </div>

          {/* Handle tip */}
          <div style={{
            width: 9, height: 9,
            background: '#5a3e28',
            borderRadius: '0 0 50% 50%',
          }} />
        </div>

        <p key={msgIdx} style={{ marginTop: 28, color: '#8B6914', fontStyle: 'italic', fontSize: '1.1em' }}>
          {MESSAGES[msgIdx]}
        </p>
      </div>
    );
  }
}

export default TorchLoader;
