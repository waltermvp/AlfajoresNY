import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import { Circle, Ellipse, Path, Svg } from 'react-native-svg';

export const Alfajor = (props: SvgProps) => (
  <Svg viewBox="0 0 300 150" {...props}>
    {/* Bottom Cookie */}
    <Ellipse
      cx="150"
      cy="110"
      rx="120"
      ry="30"
      fill="#f4e2b8"
      stroke="#cfa473"
      strokeWidth="5"
    />

    {/* Maximum Taller Filling (Dulce de Leche) almost touching the bottom border */}
    <Path
      d="
        M30,105 
        C50,125 100,130 150,130 
        S250,125 270,105 
        L270,80 
        C250,90 100,90 30,80 
        Z
      "
      fill="#d69f66"
    />

    {/* Top Cookie */}
    <Ellipse
      cx="150"
      cy="75"
      rx="120"
      ry="30"
      fill="#f4e2b8"
      stroke="#cfa473"
      strokeWidth="5"
    />

    {/* Dense Powdered Sugar on Top Cookie */}
    {/* Simulating a thick, even layer of powdered sugar */}
    <Path
      d="M150,75
         m-120,0
         a120,30 0 1,0 240,0
         a120,30 0 1,0 -240,0"
      fill="#ffffff"
      opacity="0.9"
    />

    {/* Extra sugar details for texture (denser look) */}
    <Circle cx="130" cy="65" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="170" cy="70" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="100" cy="75" r="3" fill="#ffffff" opacity="0.9" />
    <Circle cx="200" cy="60" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="160" cy="55" r="1.5" fill="#ffffff" opacity="0.9" />
    <Circle cx="140" cy="60" r="1.5" fill="#ffffff" opacity="0.9" />
    <Circle cx="180" cy="65" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="110" cy="68" r="1.8" fill="#ffffff" opacity="0.9" />
    <Circle cx="150" cy="67" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="190" cy="63" r="2.2" fill="#ffffff" opacity="0.9" />
    <Circle cx="120" cy="62" r="2" fill="#ffffff" opacity="0.9" />
    <Circle cx="160" cy="70" r="1.7" fill="#ffffff" opacity="0.9" />
    <Circle cx="145" cy="63" r="1.5" fill="#ffffff" opacity="0.9" />
  </Svg>
);
