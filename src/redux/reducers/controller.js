import * as actionType from '../actionTypes';

const intialState = {
    songPlaying: false,
    isMuted: false,
    volume: 50,
    index: 0,
    progress: 0,
    token: null,
    user: '',
    currentTrack: [],
    songInfo: []
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.PLAY_SONG:
            return {
                ...state,
                songPlaying: action.isPlaying
            };
        case actionType.SET_AUDIO: {
            console.log(action);
            return {
                ...state,
                currentTrack: action.tracks.urlList,
                index: action.tracks.idx
            };
        }
        case actionType.NEXT_SONG:
            if (state.index === state.currentTrack.length - 1) {
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
                    index: state.currentTrack.length - 1
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
        default:
            return state;
    }
};

export default reducer;
