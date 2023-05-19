import React from 'react';

import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { SkipPrevious as Prev, PlayArrow as Play, Pause, SkipNext as Next } from '@mui/icons-material';
import Box from "@mui/material/Box";

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
}) => (

    <Box sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    }}>
        <IconButton
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={onPrevClick}
        >
            <SvgIcon component={Prev} />
        </IconButton>
        {isPlaying ? (
            <IconButton
                type="button"
                className="pause"
                onClick={() => onPlayPauseClick(false)}
                aria-label="Pause"
            >
                <SvgIcon component={Pause} />
            </IconButton>
        ) : (
            <IconButton
                type="button"
                className="play"
                onClick={() => onPlayPauseClick(true)}
                aria-label="Play"
            >
                <SvgIcon component={Play} />
            </IconButton>
        )}
        <IconButton
            type="button"
            className="next"
            aria-label="Next"
            onClick={onNextClick}
        >
            <SvgIcon component={Next} />
        </IconButton>
    </Box>
);

export default AudioControls;
