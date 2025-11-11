// components/LabelBox.tsx

import React from 'react';

interface LabelBoxProps {
  text: string;
  bgColor?: string; // 'gradient' atau HEX color
  textColor?: string;
  width?: number;
  height?: number;
  glow?: boolean;
  rounded?: boolean;
}

const LabelBox: React.FC<LabelBoxProps> = ({
  text,
  bgColor = '#001f3f',
  textColor = '#ffffff',
  width = 75,
  height = 35,
  glow = false,
  rounded = true,
}) => {
  const isGradient = bgColor === 'gradient';

  // Konstruksi class Tailwind secara dinamis
  const className = [
    'flex items-center justify-center text-sm font-semibold',
    isGradient
      ? 'bg-gradient-to-r from-[#001f3f] via-[#00aaff] to-[#001f3f]'
      : '',
    rounded ? 'rounded-md' : '',
    glow ? 'shadow-[0_0_10px_rgba(0,31,63,0.6)]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    ...(isGradient ? {} : { backgroundColor: bgColor }),
    color: textColor,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className={className} style={style}>
      {text}
    </div>
  );
};

export default LabelBox;
