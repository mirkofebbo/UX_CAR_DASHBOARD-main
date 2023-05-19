/*
The AudioPlayer component creates a functional audio player with a playlist feature. 
It uses several hooks and other features from React to manage the state and behavior of the player. 
*/
// https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Slider, CardMedia, Card } from "@mui/material";
import AudioControls from './AudioControls';


const AudioPlayer = ({ size, tracks }) => {

    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    // Destructure for conciseness
    const { title, artist, color, image, audioSrc } = tracks[trackIndex];

    // Refs
    const audioRef = useRef(new Audio(audioSrc));


    const intervalRef = useRef();
    const isReady = useRef(false);

    // Track switching 
    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }
    // Timer when a track started
    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    // Clear aFny timers already running
    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    // If not already playing, start
    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }
    // Pause and clean up on unmount
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    // Play the track 
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handle setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
        setDuration(audioRef.current.duration);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
        // Update duration when the track is loaded
        audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration);
        });
        // Listener for when the track ends
        audioRef.current.addEventListener('ended', toNextTrack);
        // Remove event listener when the component unmounts
        return () => {
            audioRef.current.removeEventListener('ended', toNextTrack);
        };
    }, [trackIndex]);
    // Destructure for conciseness
    return (

        <Card sx={{
            position: 'relative',
            width: `${size}px`,     // IMG SIZE
            // height: `${size/2}px`,    // IMG SIZE
            left: `${-size / 2}px`,   // CENTERING 
            top: `${-size / 2}px`,    // CENTERING 
        }}>
            {/* <CardMedia
                component="img"
                className="artwork"
                image={image}
                height={size}
                title={`Track artwork for ${title} by ${artist}`}
                top={`${size * 0.68}px`}
            /> */}
            <Box
                sx={{
                    // display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: '0rem 1rem'
                }}
            >
                <Typography variant="h5" component="h2" className="title">
                    {title}
                </Typography>
                <Typography variant="subtitle1" component="h3" className="artist">
                    {artist}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: '1rem',
                    padding: '0',
                }}
            >
                <Slider
                    aria-label="Player"
                    value={trackProgress}
                    max={duration}
                    onChange={(e, newValue) => onScrub(newValue)}
                    onChangeCommitted={(e, newValue) => onScrubEnd()}
                />
            </Box>

        </Card >
    );
}

export default AudioPlayer;