import * as actionType from '../actionTypes';

export const playSong = isPlaying => {
    return {
        type: actionType.PLAY_SONG,
        isPlaying
    };
};
export const nextSong = () => {
    return {
        type: actionType.NEXT_SONG
    };
};
export const previousSong = () => {
    return {
        type: actionType.PREVIOUS_SONG
    };
};
export const handleVolume = newValue => {
    return {
        type: actionType.HANDLE_VOLUME,
        newValue
    };
};
export const setAudio = tracks => {
    return {
        type: actionType.SET_AUDIO,
        tracks
    };
};
export const setProgress = () => {
    return {
        type: actionType.SET_PROGRESS
    };
};
