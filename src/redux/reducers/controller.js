import * as actionType from '../actionTypes';

const intialState = {
    songPlaying: false,
    isMuted: false,
    volume: 50,
    index: 0,
    progress: 0,
    token: null,
    user: '',
    tracksUrl: [],
    songs: [],
    currentTrack: null
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.PLAY_SONG:
            return {
                state
            };
    }
};

export default reducer;
