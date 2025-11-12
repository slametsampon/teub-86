// components/CircleLabelSvg.tsx

import React from 'react';

interface CircleLabelSvgProps {
  topText: string;
  bottomText: string;
  diameter?: number;
  textColor?: string;
  fontSize?: number;
}

const CircleLabelSvg: React.FC<CircleLabelSvgProps> = ({
  topText,
  bottomText,
  diameter = 32,
  textColor = '#ffffff',
  fontSize = 6,
}) => {
  const radius = diameter / 2;

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
    >
      <defs>
        <radialGradient id="radialElectricGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aaff" />
          <stop offset="100%" stopColor="#001f3f" />
        </radialGradient>
      </defs>

      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="url(#radialElectricGradient)"
        stroke="rgba(0,170,255,0.5)"
        strokeWidth="0.5"
      />

      {/* Jarak antar baris diperluas */}
      <text
        x="50%"
        y="40%" // posisi teks atas
        fill={textColor}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
      >
        {topText}
      </text>
      <text
        x="50%"
        y="75%" // posisi teks bawah
        fill={textColor}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
      >
        {bottomText}
      </text>
    </svg>
  );
};

export default CircleLabelSvg;
