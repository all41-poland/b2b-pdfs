import React, { memo, useState } from 'react';
import styles from './Background.module.css';

const ORB_COUNT = 20;

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
const iterate = (count, mapper) => [...new Array(count)].map((_, i) => mapper(i));
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

const Gooey = ({ id }) => (
  <filter id={id}>
    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -5" result="goo" />
    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
  </filter>
);

const Blur = ({ id }) => (
  <filter id={id} x='-50%' y='-50%' width='200%' height='200%'>
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
  </filter>
);

const Gradient = ({ id, hue }) => {
  const h = hue + random(-40, 40);
  const f = [h, 80, 60];
  const t = [h + 20, 100, 30];
  return (
    <linearGradient id={id} x1='70%' x2="0%" y1="70%" y2="0%">
      <stop offset="0%" stop-color={`hsl(${t[0]},${t[1]}%,${t[2]}%)`} stop-opacity="1" />
      <stop offset="100%" stop-color={`hsl(${f[0]},${f[1]}%,${f[2]}%)`} stop-opacity="1" />
    </linearGradient>
  );
};

const Orb = ({ hue }: { hue: number }) => {
  const r = random(30, 100);
  const from = [
    random(0 - r, 1000 + r),
    random(0 - r, 1000 + r),
  ];
  const to = [
    random(0 - r, 1000 + r),
    random(0 - r, 1000 + r),
  ];
  const d = distance(from, to);
  const id = random(0, 1000);
  return (
    <>
      <circle
        className={styles.circle}
        cx={from[0]} cy={to[0]} r={r}
        fill={`url(#grad-${id})`}
        style={{
          '--duration': `${d / 15}s`,
          '--from-x': from[0],
          '--from-y': from[1],
          '--to-x': to[0],
          '--to-y': to[1],
        }} />
      <Gradient id={`grad-${id}`} hue={hue} />
    </>
  );
}

const Orbs = memo(({ hue }: { hue: number }) => {
  return (
    <svg
      className={styles.svg}
      viewBox='0 0 1000 1000'
      preserveAspectRatio='xMinYMin slice'
      style={{ background: `linear-gradient(hsl(${hue},${80}%,${90}%), hsl(${hue},${100}%,${80}%))` }}
    >
      <g filter='url(#blur)'>
        <g filter='url(#gooey)'>
          {iterate(ORB_COUNT, i => (
            <Orb key={i} hue={hue} />
          ))}
        </g>
      </g>
      <defs>
        <Gooey id='gooey' />
        <Blur id='blur' />
      </defs>
    </svg>
  );
});

const Background = () => {
  // const [hue, setHue] = useState(random(0, 360));
  const [hue, setHue] = useState(210);

  const randomizeColor = () => setHue(random(0, 360));

  return (
    <div className={styles.banner}>
      <Orbs hue={hue} />
    </div>
  );
};

export default Background;