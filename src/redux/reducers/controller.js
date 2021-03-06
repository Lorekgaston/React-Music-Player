/* eslint-disable no-case-declarations */
import * as actionType from '../actionTypes';

const intialState = {
    songPlaying: false,
    isMuted: false,
    volume: 50,
    index: 0,
    progress: 0,
    token: null,
    user: '',
    currentTrack: null,
    trackList: [],
    isSingle: false
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
                trackList: action.tracks.trackList,
                index: action.tracks.i,
                isSingle: false
            };
        case actionType.NEXT_SONG:
            if (state.index === state.trackList.length - 1) {
                return {
                    ...state,
                    index: 0
                };
            }
            return {
                ...state,
                index: state.index + 1
            };
        case actionType.PREVIOUS_SONG:
            if (state.index === 0) {
                return {
                    ...state,
                    index: state.trackList.length - 1
                };
            }
            return {
                ...state,
                index: state.index - 1
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
        default:
            return state;
    }
};

export default reducer;
