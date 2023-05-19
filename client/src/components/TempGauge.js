import React, { useState, useEffect } from 'react';
import background from '../images/tempGauge/background.png';
import needle from '../images/tempGauge/needle.png';
import lightOn from '../images/tempGauge/lightOn.png';
import lightOff from '../images/tempGauge/lightOff.png';

// STYLING
import { Box } from '@mui/material';

// mapping function to adjust the number being display + the angle of rotation
function mapValue(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const TempGauge = ({ size }) => {

    const [value, setValue] = useState(0); // Set the initial value to 0
    const [lightState, setLightState] = useState(false);

    // Change the needle position over time
    useEffect(() => {
        const increaseValue = () => { // Rename the function to increaseValue
            setValue((prevValue) => Math.min(prevValue + 2, 1023)); // Increase value by 2 every 100 ms
        };

        const interval = setInterval(increaseValue, 100); // Change the function name to increaseValue

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Activate the image blinking
    useEffect(() => {
        if (value > 723) { // Change the condition to greater than 723
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
            <Box component="img" src={lightImage} sx={{ position: 'absolute', width: '100%', height: '100%' }} />
            <Box component="img" src={needle} sx={{ position: 'absolute', width: '100%', height: '100%', transform: `rotate(${angle}deg)` }} />
        </Box>
    );
};

export default TempGauge;
