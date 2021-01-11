import * as actionType from '../actionTypes';

export const playSong = () => {
    return {
        type: actionType.PLAY_SONG
    };
};
export const pauseSong = () => {
    return {
        type: actionType.PAUSE_SONG
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
export const handleVolume = () => {
    return {
        type: actionType.HANDLE_VOLUME
    };
};
