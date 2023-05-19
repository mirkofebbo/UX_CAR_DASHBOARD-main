/*
The FuelGauge component is designed to display a fuel gauge UI 
with a needle that moves based on the fuel level, 
and a light that starts blinking when the fuel level is low.
*/

import React, { useState, useEffect } from 'react';
import background from '../images/fuelGauge/background.png';
import needle from '../images/fuelGauge/needle.png';
import lightOn from '../images/fuelGauge/lightOn.png';
import lightOff from '../images/fuelGauge/lightOff.png';

// STYLING
import { Box } from '@mui/material';

// mapping function to adjust the number being display + the angle of rotation
function mapValue(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const FuelGauge = ({ size }) => {

    const [value, setValue] = useState(1023);
    const [lightState, setLightState] = useState(false);

    // Change the needle position over time
    useEffect(() => {
        const decreaseValue = () => {
            setValue((prevValue) => Math.max(prevValue - 2, 0));
        };

        const interval = setInterval(decreaseValue, 100); // Decrease value by 1 every 100 ms

        return () => {
            clearInterval(interval);
        };
    }, []);
    // Activate the image blinkling 
    useEffect(() => {
        if (value < 500) {
            const toggleLightState = () => {
                setLightState((prevLightState) => !prevLightState);
            };

            const interval = setInterval(toggleLightState, 1000); // Toggle light state every 1 second

            return () => {
                clearInterval(interval);
            };
        }
    }, [value]);

    const angle = mapValue(value, 0, 1023, -90, 90);
    const lightImage = lightState ? lightOn : lightOff;

    return (
        <Box sx={{position:'relative', width:`${size}px`,height:`${size}px`,backgroundColor: 'none',left: `${-size / 2}px`,top: `${-size / 2}px`}}>
            <Box component="img" src={background} sx={{ position: 'absolute', width: '100%', height: '100%' }} />
            <Box component="img" src={lightImage} sx={{ position: 'absolute', width: '100%', height: '100%' }} />
            <Box component="img" src={needle} sx={{ position: 'absolute', width: '100%', height: '100%', transform: `rotate(${angle}deg)` }} />
        </Box>
    );
};

export default FuelGauge;
