/* eslint-disable no-case-declarations */
import * as actionType from '../actionTypes';

const intialState = {
    songPlaying: false,
    isMuted: false,
    volume: 40,
    index: 0,
    activeIndex: 0,
    progress: 0,
    currentTrack: null,
    trackList: [],
    isSingle: false,
    isPlaylistOpen: false,
    playlistId: null,
    dataType: null
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.PLAY_SONG:
            return {
                ...state,
                songPlaying: action.isPlaying
            };
        case actionType.SET_AUDIO:
            console.log(action);
            return {
                ...state,
                currentTrack: action.track,
                isSingle: true
            };
        case actionType.SET_TRACKLIST:
            console.log(action);
            return {
                ...state,
                trackList: action.tracks.data.tracks,
                index: action.tracks.i,
                isSingle: false
            };
        case actionType.NEXT_SONG:
            if (state.index === state.trackList.length - 1) {
                return {
                    ...state,
                    index: 0,
                    activeIndex: 0
                };
            }
            return {
                ...state,
                index: state.index + 1,
                activeIndex: state.index + 1
            };
        case actionType.PREVIOUS_SONG:
            if (state.index === 0) {
                return {
                    ...state,
                    index: state.trackList.length - 1,
                    activeIndex: state.trackList.length - 1
                };
            }
            return {
                ...state,
                index: state.index - 1,
                activeIndex: state.index - 1
            };
        case actionType.HANDLE_VOLUME:
            return {
                ...state,
                volume: action.newValue
            };
        case actionType.SET_PROGRESS:
            return {
                ...state,
                progress: action.value
            };
        case actionType.SET_MUTE:
            return {
                ...state,
                isMuted: !state.isMuted
            };
        case actionType.TOOGLE_PLAYLIST:
            return {
                ...state,
                isPlaylistOpen: !state.isPlaylistOpen
            };
        case actionType.HANDLE_PLAYLIST:
            return {
                ...state,
                playlistId: action.id,
                dataType: action.dataType
            };
        case actionType.HANDLE_ACTIVE_INDEX:
            return {
                ...state,
                activeIndex: action.activeIndex
            };
        default:
            return state;
    }
};

export default reducer;
