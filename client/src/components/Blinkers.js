/*
This is a Blinker React component that simulates a car blinker. 
It blinks a light on and off depending on the state of the button prop and the light points 
to a certain direction depending on the side prop.
*/
import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

// IMAGES
import blinkerOff from '../images/blinker/blinkerOff.png';
import blinkerOn from '../images/blinker/blinkerOn.png';

var prevButtonB = false;
var lightState = false;

const Blinker = ({ size, button, side  }) => {
    const [prevButtonB, setPrevButtonB] = useState(false);
    const [lightState, setLightState] = useState(false);
    const [blinking, setBlinking] = useState(false);
  
    useEffect(() => {
      if (prevButtonB !== button) {
        if (button) {
          setBlinking((prevState) => !prevState);
        }
      }
  
      setPrevButtonB(button);
    }, [button, prevButtonB]);
  
    useEffect(() => {
      if (blinking) {
        const interval = setInterval(() => {
          setLightState((prevState) => !prevState);
        }, 500);
  
        return () => {
          clearInterval(interval);
        };
      } else {
        setLightState(false);
      }
    }, [blinking]);
  
    const blinker = lightState ? blinkerOn : blinkerOff;
    const rotation = side === 'left' ? 0 : 180;

    return (
        <Box
            sx={{
                position: 'relative',
                width: `${size}px`,     // IMG SIZE
                height: `${size}px`,    // IMG SIZE
                backgroundColor: 'none',
                left: `${-size/2}px`,   // CENTERING 
                top: `${-size/2}px`,    // CENTERING 
            }}
        >
            <Box component="img" src={blinker} sx={{ position: 'absolute', width: '100%', height: '100%', transform: `rotate(${rotation}deg)`,}} />
        </Box>
    );
};

export default Blinker;
