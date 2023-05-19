import React from 'react';
import backgroundBlur from '../images/speedometer1/Background Blur.png';
import miniGauge from '../images/speedometer1/Mini Gauge.png';
import speedBackGraphics from '../images/speedometer1/Speed Back Graphics.png';
import speedScale from '../images/speedometer1/Speed Scale.png';
import needle from '../images/speedometer1/Needle.png';
// STYLING
import { Box } from '@mui/material';

// mapping function to adjust the number being display + the angle of rotation
function mapValue(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Function to create a speedometer with PNG files 
const Speedometer = ({ size, position, speed }) => {
  // The value used for the animation
  const mySpeed = mapValue(speed, 0, 1023, 130, -130);
  const myText = Math.ceil(mapValue(speed, 0, 1023, 220, 0));

  // 
  return (
    <Box sx={{position: 'absolute', top: position.y, left: position.x, bgcolor: 'black',}}>
      <Box component="img" src={backgroundBlur}     sx={{ position: 'absolute', width: size, height: size }} />
      <Box component="img" src={miniGauge}          sx={{ position: 'absolute', width: size, height: size }} />
      <Box component="img" src={speedBackGraphics}  sx={{ position: 'absolute', width: size, height: size }} />
      <Box component="img" src={speedScale}         sx={{ position: 'absolute', width: size, height: size }} />
      <Box component="img" src={needle}
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          transform: `rotate(${mySpeed}deg)`,
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          color: 'white',
          width: size,
          lineHeight: `${size}px`,
          height: size,
          textAlign: 'center',
        }}
      >
        {myText}
      </Box>
    </Box>
  );
};

export default Speedometer;
