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
export const handleMuted = () => {
    return {
        type: actionType.SET_MUTE
    };
};
export const setAudio = track => {
    return {
        type: actionType.SET_AUDIO,
        track
    };
};
export const setProgress = value => {
    return {
        type: actionType.SET_PROGRESS,
        value
    };
};
export const setTrackList = tracks => {
    return {
        type: actionType.SET_TRACKLIST,
        tracks
    };
};
export const tooglePlaylist = () => {
    return {
        type: actionType.TOOGLE_PLAYLIST
    };
};
export const handlePLaylist = id => {
    return {
        type: actionType.HANDLE_PLAYLIST,
        id
    };
};
