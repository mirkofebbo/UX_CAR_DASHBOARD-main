import React from 'react';
import { Box } from '@mui/material';

// IMAGES
import background from '../images/gear/background.png';
import gear1 from '../images/gear/gear-1.png';
import gear2 from '../images/gear/gear-2.png';
import gear3 from '../images/gear/gear-3.png';
import gear4 from '../images/gear/gear-4.png';
import gear5 from '../images/gear/gear-5.png';
import gear6 from '../images/gear/gear-6.png';
import gear7 from '../images/gear/gear-7.png';
import gearR from '../images/gear/gear-R.png';

const Gear = ({ size, gear }) => {

  const getGearImage = () => {
    switch (gear) {
      case 'GEAR-1':
        return gear1;
      case 'GEAR-2':
        return gear2;
      case 'GEAR-3':
        return gear3;
      case 'GEAR-4':
        return gear4;
      case 'GEAR-5':
        return gear5;
      case 'GEAR-6':
        return gear6;
      case 'GEAR-7':
        return gear7;
      case 'GEAR-R':
        return gearR;
      default:
        return null;
    }
  };

  const gearImage = getGearImage();

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
      {gearImage && <Box component="img" src={gearImage} sx={{ position: 'absolute', width: '100%', height: '100%' }} />}
    </Box>
  );
};

export default Gear;
