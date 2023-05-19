import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReactDOM from "react-dom/client";
import socket from '../socket';

import AudioPlayer from '../components/audio/AudioPlayer';
import tracks from '../components/audio/tracks';

// var WIDTH = 895;
// var HEIGHT = 1600;
var WIDTH = 1600;
var HEIGHT = 895;
const ViewSonic = () => {

    return (
        <div>
            <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT / 2 }px` }}>
                <AudioPlayer size={500} tracks={tracks} />
            </Box>
        </div>
    );
};

export default ViewSonic;