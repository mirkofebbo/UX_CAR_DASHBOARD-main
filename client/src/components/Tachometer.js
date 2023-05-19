import React from 'react';
import background from '../images/tachometer/background.png';
import needle from '../images/tachometer/needle.png';
// STYLING
import { Box, Typography } from '@mui/material';

// mapping function to adjust the number being display + the angle of rotation
function mapValue(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
function calculateSpeed(gear, rawPedalInput, _speed) {

  const velocity = mapValue(rawPedalInput, 1023, 0, 0, 1)
  const gearSpeeds = [0, 146, 292, 438, 584, 730, 876, 1023];

  var index;
  if (gear === 'IDLE') index = 0;
  else if (gear === 'GEAR-r') index = 0;
  else if (gear === 'GEAR-1') index = 1;
  else if (gear === 'GEAR-2') index = 2;
  else if (gear === 'GEAR-3') index = 3;
  else if (gear === 'GEAR-4') index = 4;
  else if (gear === 'GEAR-5') index = 5;
  else if (gear === 'GEAR-6') index = 6;
  else if (gear === 'GEAR-7') index = 7;

  if (index === 0 || index > gearSpeeds.length - 1) {
    return 0;
  }
  _speed += velocity;
  const minSpeed = gearSpeeds[index - 1];
  const maxSpeed = gearSpeeds[index];

  return mapValue(rawPedalInput, 1023, 0, minSpeed, maxSpeed);
}

// Function to create a speedometer with PNG files 
const Tachometer = ({ size, pedal, gear, speed }) => {
  // The value used for the animation
  const calculatedSpeed = calculateSpeed(gear, pedal, speed);
  // console.log(calculatedSpeed)
  const angle = mapValue(calculatedSpeed, 0, 1023, -120, 120);
  const myText = String(Math.ceil(mapValue(calculatedSpeed, 0, 1023, 0, 8000))).padStart(4, '0');
  return (
    <Box
      sx={{
        position: 'relative',
        width: `${size}px`,     // IMG SIZE
        height: `${size}px`,    // IMG SIZE
        backgroundColor: 'none',
        left: `${-size / 2}px`,   // CENTERING 
        top: `${-size / 2}px`,    // CENTERING 
      }}
    >
      <Box component="img" src={background} sx={{ position: 'absolute', width: '100%', height: '100%' }} />
      <Box
        component="img"
        src={needle}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `rotate(${angle}deg)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          color: 'white',
          width: '100%',
          lineHeight: `${size}px`,
          height: '100%',
          textAlign: 'center',
          top: `${size * 0.68}px`,
        }}
      >
        <Typography variant='h4'>
          {myText}
        </Typography>
      </Box>
    </Box>
  );
};

export default Tachometer;
