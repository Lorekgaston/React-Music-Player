import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Loader.scss';

const Loader = () => {
    return (
        <div className="Loader">
            <div className="Loader__SpinnerContainer">
                <CircularProgress
                    className="Loader__UpperSpinner"
                    variant="determinate"
                    value={100}
                    thickness={5}
                />
                <CircularProgress
                    className="Loader__BottomSpinner"
                    variant="indeterminate"
                    disableShrink
                    thickness={5}
                />
            </div>
            <br />
            <h3>Loading</h3>
        </div>
    );
};

export default Loader;
