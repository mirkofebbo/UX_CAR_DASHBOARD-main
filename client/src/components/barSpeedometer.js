import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BarSpeedometer = ({ size, position, speed, text = '', numBars = 20 }) => {
  const MARGIN = { LEFT: 0, RIGHT: 0, TOP: 0, BOTTOM: 0 };
  const WIDTH = size.width - MARGIN.LEFT - MARGIN.RIGHT;
  const HEIGHT = size.height - MARGIN.TOP - MARGIN.BOTTOM;
  const col1 = 'lime';
  const col2 = 'darkgreen';

  const value = Math.round((1 - (speed / 1023)) * numBars);

  const barHeight = size.height / numBars;
  const barMargin = 2; // Adjust this value to control the separation between bars

  const bars = Array.from({ length: numBars }, (_, index) => {
    const color = index < value ? col1 : col2;
    return (
      <Box
        key={index}
        sx={{
          backgroundColor: color,
          width: '50%',
          height: barHeight - barMargin,
          marginBottom: barMargin,
          borderRadius: '5px',
        }}
      />
    );
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: position.top - 25,
          left: position.left,
          color: col1,
        }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
          display: 'flex',
          flexDirection: 'column-reverse',
          border: `2px solid ${col1}`,
          borderRadius: '5px',
          padding: 1,
        }}
      >
        {bars}
      </Box>
    </Box>
  );
};

export default BarSpeedometer;
